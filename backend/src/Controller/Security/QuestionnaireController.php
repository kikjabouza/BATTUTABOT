<?php

namespace App\Controller\Security;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

class QuestionnaireController extends AbstractController
{
    #[Route('/api/questionnaire/questions/{typeUtilisateur}', name: 'api_questionnaire_questions', methods: ['GET'])]
    public function getQuestions(string $typeUtilisateur, EntityManagerInterface $em): JsonResponse
    {
       

        // Requête SQL directe
        $connection = $em->getConnection();
        
        $sql = "SELECT * FROM question WHERE type_utilisateur = ? ORDER BY ordre_affichage ASC";
        $questions = $connection->executeQuery($sql, [$typeUtilisateur])->fetchAllAssociative();

        return $this->json([
            'success' => true,
            'questions' => $questions
        ]);
    }

    #[Route('/api/questionnaire/reponses', name: 'api_questionnaire_reponses', methods: ['POST'])]
    public function saveReponses(Request $request, #[CurrentUser] $user, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $connection = $em->getConnection();

        foreach ($data['reponses'] as $reponseData) {
            $sql = "INSERT INTO reponse_utilisateur (utilisateur_id, question_id, reponse) VALUES (?, ?, ?) 
                    ON DUPLICATE KEY UPDATE reponse = VALUES(reponse)";
            
            $connection->executeStatement($sql, [
                $user->getId(),
                $reponseData['questionId'], 
                $reponseData['reponse']
            ]);
        }

        return $this->json([
            'success' => true,
            'message' => 'Réponses sauvegardées avec succès'
        ]);
    }

    #[Route('/api/questionnaire/mes-reponses', name: 'api_questionnaire_mes_reponses', methods: ['GET'])]
    public function getMesReponses(#[CurrentUser] $user, EntityManagerInterface $em): JsonResponse
    {
        $connection = $em->getConnection();
        
        $sql = "SELECT q.texte_question, r.reponse, r.date_reponse 
                FROM reponse_utilisateur r 
                JOIN question q ON r.question_id = q.id 
                WHERE r.utilisateur_id = ?";
        $reponses = $connection->executeQuery($sql, [$user->getId()])->fetchAllAssociative();

        return $this->json([
            'success' => true,
            'reponses' => $reponses
        ]);
    }
}