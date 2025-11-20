<?php

namespace App\Controller\Security;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

class QuestionnaireController extends AbstractController
{
    #[Route('/api/questionnaire/questions/{typeUtilisateur}', name: 'api_questionnaire_questions', methods: ['GET'])]
    public function getQuestions(string $typeUtilisateur, EntityManagerInterface $em): JsonResponse
    {
        $connection = $em->getConnection();

        // ⭐ CORRECTION : Utilisez options_json au lieu de options_question
        $sql = "SELECT id, texte_question, type_question, options_json as options_question, ordre_affichage, type_utilisateur 
                FROM question 
                WHERE type_utilisateur = ? 
                ORDER BY ordre_affichage ASC";

        $questions = $connection->executeQuery($sql, [$typeUtilisateur])->fetchAllAssociative();

        return $this->json([
            'success' => true,
            'questions' => $questions
        ]);
    }

    #[Route('/api/questionnaire/reponses', name: 'api_questionnaire_reponses', methods: ['POST'])]
    public function saveReponses(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $connection = $em->getConnection();

        // ⭐ UTILISER L'UTILISATEUR CONNECTÉ ou accepter un utilisateur temporaire fourni
        $user = $this->getUser();
        $userId = null;

        if ($user) {
            // Utilisez getUserIdentifier() pour obtenir l'identifiant utilisateur
            $userId = method_exists($user, 'getUserIdentifier') ? $user->getUserIdentifier() : $user->id;
            error_log("👤 Utilisateur connecté: " . $userId);
        } else {
            // Si non authentifié, accepter un utilisateur temporaire envoyé dans le payload
            if (isset($data['utilisateur_id'])) {
                $userId = (int) $data['utilisateur_id'];
                error_log("👤 Utilisateur temporaire fourni dans le payload: " . $userId);
            } else {
                return $this->json([
                    'success' => false,
                    'message' => 'Utilisateur non authentifié'
                ], 401);
            }
        }

        // Validation des données
        if (!isset($data['reponses']) || !is_array($data['reponses'])) {
            return $this->json([
                'success' => false,
                'message' => 'Format de données invalide. Le champ "reponses" est requis.'
            ], 400);
        }

        try {
            $savedCount = 0;

            foreach ($data['reponses'] as $reponseData) {
                if (!isset($reponseData['questionId']) || !isset($reponseData['reponse'])) {
                    continue;
                }

                $questionId = (int) $reponseData['questionId'];
                $reponse = $reponseData['reponse'];

                try {
                    $sql = "INSERT INTO reponse_utilisateur (utilisateur_id, question_id, reponse, date_reponse) 
                        VALUES (?, ?, ?, NOW())";

                    $connection->executeStatement($sql, [$userId, $questionId, $reponse]);
                    $savedCount++;
                } catch (\Exception $e) {
                    // Si échec (doublon), mettre à jour
                    try {
                        $sql = "UPDATE reponse_utilisateur 
                            SET reponse = ?, date_reponse = NOW() 
                            WHERE utilisateur_id = ? AND question_id = ?";

                        $connection->executeStatement($sql, [$reponse, $userId, $questionId]);
                        $savedCount++;
                    } catch (\Exception $e2) {
                        error_log("❌ Erreur sur question $questionId: " . $e2->getMessage());
                    }
                }
            }

            return $this->json([
                'success' => true,
                'message' => "$savedCount réponse(s) sauvegardée(s) avec succès pour l'utilisateur $userId",
                'userId' => $userId,
                'savedCount' => $savedCount
            ]);
        } catch (\Exception $e) {
            error_log("❌ Erreur globale: " . $e->getMessage());
            return $this->json([
                'success' => false,
                'message' => 'Erreur lors de la sauvegarde des réponses'
            ], 500);
        }
    }

    #[Route('/api/questionnaire/mes-reponses', name: 'api_questionnaire_mes_reponses', methods: ['GET'])]
    public function getMesReponses(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $userId = $request->getSession()->get('current_user_id');

        if (!$userId) {
            return $this->json([
                'success' => false,
                'message' => 'Utilisateur non identifié'
            ], 401);
        }

        $connection = $em->getConnection();

        try {
            $sql = "SELECT q.texte_question, r.reponse, r.date_reponse 
                    FROM reponse_utilisateur r 
                    JOIN question q ON r.question_id = q.id 
                    WHERE r.utilisateur_id = ?";
            $reponses = $connection->executeQuery($sql, [$userId])->fetchAllAssociative();

            return $this->json([
                'success' => true,
                'reponses' => $reponses
            ]);
        } catch (\Exception $e) {
            return $this->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des réponses: ' . $e->getMessage()
            ], 500);
        }
    }
}
