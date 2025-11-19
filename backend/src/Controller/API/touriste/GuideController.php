<?php

namespace App\Controller\API\Touriste;

use App\Entity\Guide;
use App\Entity\Utilisateur;
use App\Repository\GuideRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

class GuideController extends AbstractController
{
    #[Route('/api/guides', name: 'api_guides_list', methods: ['GET'])]
    public function listGuides(GuideRepository $guideRepo, Request $request): JsonResponse
    {
        // Filtres possibles
        $specialisation = $request->query->get('specialisation');
        $langue = $request->query->get('langue');
        $destination = $request->query->get('destination');

        $guides = $guideRepo->findByFilters($specialisation, $langue, $destination);

        $data = [];
        foreach ($guides as $guide) {
            $data[] = $this->serializeGuide($guide);
        }

        return $this->json([
            'success' => true,
            'guides' => $data
        ]);
    }

    #[Route('/api/guides/{id}', name: 'api_guides_show', methods: ['GET'])]
    public function showGuide(int $id, GuideRepository $guideRepo): JsonResponse
    {
        $guide = $guideRepo->find($id);

        if (!$guide) {
            return $this->json([
                'success' => false,
                'error' => 'Guide non trouvé'
            ], 404);
        }

        return $this->json([
            'success' => true,
            'guide' => $this->serializeGuide($guide, true) // Détails complets
        ]);
    }

    #[Route('/api/guides/register', name: 'api_guides_register', methods: ['POST'])]
    public function registerGuide(
        Request $request,
        #[CurrentUser] $user,
        EntityManagerInterface $em
    ): JsonResponse {
        // Vérifier si l'utilisateur est déjà guide
        $existingGuide = $em->getRepository(Guide::class)->findOneBy(['utilisateur' => $user]);
        
        if ($existingGuide) {
            return $this->json([
                'success' => false,
                'error' => 'Vous êtes déjà enregistré comme guide'
            ], 400);
        }

        $data = json_decode($request->getContent(), true);

        // Validation des champs requis
        $requiredFields = ['specialisations', 'languesParlees', 'experienceAnnees', 'tarifHoraire'];
        foreach ($requiredFields as $field) {
            if (!isset($data[$field])) {
                return $this->json([
                    'success' => false,
                    'error' => "Le champ '$field' est requis"
                ], 400);
            }
        }

        // Créer le guide
        $guide = new Guide();
        $guide->setUtilisateur($user);
        $guide->setSpecialisations($data['specialisations']);
        $guide->setLanguesParlees($data['languesParlees']);
        $guide->setExperienceAnnees($data['experienceAnnees']);
        $guide->setTarifHoraire($data['tarifHoraire']);
        $guide->setCertification($data['certification'] ?? null);
        $guide->setAccessibiliteHandicap($data['accessibiliteHandicap'] ?? false);
        $guide->setDisponibilities($data['disponibilities'] ?? '{}');
        $guide->setEstCertifie($data['estCertifie'] ?? false);

        $em->persist($guide);
        $em->flush();

        return $this->json([
            'success' => true,
            'message' => 'Guide enregistré avec succès',
            'guide' => $this->serializeGuide($guide)
        ], 201);
    }

    #[Route('/api/guides/my-profile', name: 'api_guides_my_profile', methods: ['GET'])]
    public function getMyProfile(#[CurrentUser] $user, GuideRepository $guideRepo): JsonResponse
    {
        $guide = $guideRepo->findOneBy(['utilisateur' => $user]);

        if (!$guide) {
            return $this->json([
                'success' => false,
                'error' => 'Vous n\'êtes pas enregistré comme guide'
            ], 404);
        }

        return $this->json([
            'success' => true,
            'guide' => $this->serializeGuide($guide, true)
        ]);
    }

    #[Route('/api/guides/my-profile', name: 'api_guides_update_profile', methods: ['PUT'])]
    public function updateMyProfile(
        Request $request,
        #[CurrentUser] $user,
        EntityManagerInterface $em
    ): JsonResponse {
        $guide = $em->getRepository(Guide::class)->findOneBy(['utilisateur' => $user]);

        if (!$guide) {
            return $this->json([
                'success' => false,
                'error' => 'Vous n\'êtes pas enregistré comme guide'
            ], 404);
        }

        $data = json_decode($request->getContent(), true);

        // Mettre à jour les champs
        if (isset($data['specialisations'])) {
            $guide->setSpecialisations($data['specialisations']);
        }
        if (isset($data['languesParlees'])) {
            $guide->setLanguesParlees($data['languesParlees']);
        }
        if (isset($data['experienceAnnees'])) {
            $guide->setExperienceAnnees($data['experienceAnnees']);
        }
        if (isset($data['tarifHoraire'])) {
            $guide->setTarifHoraire($data['tarifHoraire']);
        }
        if (isset($data['certification'])) {
            $guide->setCertification($data['certification']);
        }
        if (isset($data['accessibiliteHandicap'])) {
            $guide->setAccessibiliteHandicap($data['accessibiliteHandicap']);
        }
        if (isset($data['disponibilities'])) {
            $guide->setDisponibilities($data['disponibilities']);
        }
        if (isset($data['estCertifie'])) {
            $guide->setEstCertifie($data['estCertifie']);
        }

        $em->flush();

        return $this->json([
            'success' => true,
            'message' => 'Profil guide mis à jour avec succès',
            'guide' => $this->serializeGuide($guide)
        ]);
    }

    #[Route('/api/guides/specialisations', name: 'api_guides_specialisations', methods: ['GET'])]
    public function getSpecialisations(): JsonResponse
    {
        $specialisations = [
            'Culture et Histoire',
            'Randonnée et Nature', 
            'Gastronomie',
            'Artisanat Local',
            'Éco-tourisme',
            'Aventure',
            'Spiritualité',
            'Photographie'
        ];

        return $this->json([
            'success' => true,
            'specialisations' => $specialisations
        ]);
    }

    /**
     * Sérialise un guide pour la réponse JSON
     */
    private function serializeGuide(Guide $guide, bool $detailsComplets = false): array
    {
        $data = [
            'id' => $guide->getId(),
            'utilisateur' => [
                'id' => $guide->getUtilisateur()->getId(),
                'prenom' => $guide->getUtilisateur()->getPrenom(),
                'nom' => $guide->getUtilisateur()->getNom(),
                'email' => $guide->getUtilisateur()->getEmail(),
                'telephone' => $guide->getUtilisateur()->getTelephone(),
                'avatar' => $guide->getUtilisateur()->getAvatar()
            ],
            'specialisations' => $guide->getSpecialisations(),
            'languesParlees' => $guide->getLanguesParlees(),
            'experienceAnnees' => $guide->getExperienceAnnees(),
            'tarifHoraire' => $guide->getTarifHoraire(),
            'noteMoyenne' => $guide->getNoteMoyenne(),
            'totalAvis' => $guide->getTotalAvis(),
            'estCertifie' => $guide->isEstCertifie()
        ];

        if ($detailsComplets) {
            $data['certification'] = $guide->getCertification();
            $data['accessibiliteHandicap'] = $guide->isAccessibiliteHandicap();
            $data['disponibilities'] = $guide->getDisponibilities();
        }

        return $data;
    }
}