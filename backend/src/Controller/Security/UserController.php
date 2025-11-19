<?php

namespace App\Controller\Security;

use App\Entity\Utilisateur;
use App\Entity\ProfilTouriste;
use App\Entity\Artisan;
use App\Entity\Guide;
use App\Entity\Hebergement;
use App\Repository\UtilisateurRepository;
use App\Repository\ProfilTouristeRepository;
use App\Repository\ArtisanRepository;
use App\Repository\GuideRepository;
use App\Repository\HebergementRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class UserController extends AbstractController
{
    private $utilisateurRepository;
    private $profilTouristeRepository;
    private $artisanRepository;
    private $guideRepository;
    private $hebergementRepository;

    public function __construct(
        UtilisateurRepository $utilisateurRepository,
        ProfilTouristeRepository $profilTouristeRepository,
        ArtisanRepository $artisanRepository,
        GuideRepository $guideRepository,
        HebergementRepository $hebergementRepository
    ) {
        $this->utilisateurRepository = $utilisateurRepository;
        $this->profilTouristeRepository = $profilTouristeRepository;
        $this->artisanRepository = $artisanRepository;
        $this->guideRepository = $guideRepository;
        $this->hebergementRepository = $hebergementRepository;
    }

    #[Route('/api/profils/stats', name: 'api_profils_stats', methods: ['GET'])]
    public function getStatsProfils(): JsonResponse
    {
        // Récupérer les vraies statistiques depuis la base
        $stats = [
            'touriste' => [
                'count' => $this->profilTouristeRepository->count([]),
                'description' => 'Découvrez le Maroc avec votre guide IA personnalisé'
            ],
            'artisan' => [
                'count' => $this->artisanRepository->count([]),
                'description' => 'Partagez votre savoir-faire avec le monde'
            ],
            'guide' => [
                'count' => $this->guideRepository->count([]),
                'description' => 'Accompagnez les voyageurs dans leurs aventures'
            ],
            'proprietaire' => [
                'count' => $this->compterProprietaires(),
                'description' => 'Proposez votre hébergement éco-responsable'
            ]
        ];

        return $this->json([
            'success' => true,
            'stats' => $stats
        ]);
    }

    #[Route('/api/choisir-profil', name: 'api_choisir_profil', methods: ['POST'])]
    public function choisirProfil(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $profilType = $data['profilType'] ?? null;
        $userId = $data['userId'] ?? null;

        if (!$profilType || !$userId) {
            return $this->json([
                'success' => false,
                'error' => 'Profil type ou userId manquant'
            ], 400);
        }

        $user = $this->utilisateurRepository->find($userId);
        if (!$user) {
            return $this->json([
                'success' => false,
                'error' => 'Utilisateur non trouvé'
            ], 404);
        }

        // Vérifier si l'utilisateur a déjà ce profil
        if ($this->utilisateurADejaProfil($user, $profilType)) {
            return $this->json([
                'success' => false,
                'error' => 'Utilisateur a déjà ce profil'
            ], 400);
        }

        // Créer le profil correspondant
        try {
            switch($profilType) {
                case 'touriste':
                    $profil = new ProfilTouriste();
                    $profil->setIdUtilisateur($user);
                    $em->persist($profil);
                    break;

                case 'artisan':
                    $profil = new Artisan();
                    $profil->setIdUtilisateur($user);
                    $profil->setTypeArtisanat($data['typeArtisanat'] ?? 'Artisanat général');
                    $profil->setAdresseAtelier($data['adresseAtelier'] ?? '');
                    $profil->setDescription($data['description'] ?? '');
                    $profil->setProduits($data['produits'] ?? '');
                    $profil->setPrixVisite($data['prixVisite'] ?? 0);
                    $em->persist($profil);
                    break;

                case 'guide':
                    $profil = new Guide();
                    $profil->setIdUtilisateur($user);
                    $profil->setSpecialisations($data['specialisations'] ?? '');
                    $profil->setLanguesParlees($data['languesParlees'] ?? '');
                    $profil->setExperienceAnnees($data['experienceAnnees'] ?? 0);
                    $profil->setTarifHoraire($data['tarifHoraire'] ?? 0);
                    $profil->setDisponibilities($data['disponibilities'] ?? '');
                    $em->persist($profil);
                    break;

                default:
                    return $this->json([
                        'success' => false,
                        'error' => 'Type de profil invalide'
                    ], 400);
            }

            $em->flush();

            return $this->json([
                'success' => true,
                'message' => 'Profil '.$profilType.' créé avec succès',
                'profil_id' => $profil->getId(),
                'profil_type' => $profilType
            ]);

        } catch (\Exception $e) {
            return $this->json([
                'success' => false,
                'error' => 'Erreur lors de la création du profil: '.$e->getMessage()
            ], 500);
        }
    }

    #[Route('/api/utilisateurs/{id}', name: 'api_utilisateurs_show', methods: ['GET'])]
    public function showUtilisateur(int $id): JsonResponse
    {
        $user = $this->utilisateurRepository->find($id);
        
        if (!$user) {
            return $this->json([
                'success' => false,
                'error' => 'Utilisateur non trouvé'
            ], 404);
        }

        return $this->json([
            'success' => true,
            'utilisateur' => $this->formatUtilisateurData($user)
        ]);
    }

    #[Route('/api/utilisateurs/{id}/profils', name: 'api_utilisateurs_profils', methods: ['GET'])]
    public function getProfilsUtilisateur(int $id): JsonResponse
    {
        $user = $this->utilisateurRepository->find($id);
        
        if (!$user) {
            return $this->json([
                'success' => false,
                'error' => 'Utilisateur non trouvé'
            ], 404);
        }

        $profils = [];

        // Vérifier chaque type de profil
        $profilTouriste = $this->profilTouristeRepository->findOneBy(['idUtilisateur' => $user]);
        if ($profilTouriste) {
            $profils[] = ['type' => 'touriste', 'id' => $profilTouriste->getId()];
        }

        $artisan = $this->artisanRepository->findOneBy(['idUtilisateur' => $user]);
        if ($artisan) {
            $profils[] = ['type' => 'artisan', 'id' => $artisan->getId()];
        }

        $guide = $this->guideRepository->findOneBy(['idUtilisateur' => $user]);
        if ($guide) {
            $profils[] = ['type' => 'guide', 'id' => $guide->getId()];
        }

        // Vérifier si propriétaire d'hébergement
        $hebergements = $this->hebergementRepository->findBy(['idProprietaire' => $user]);
        if (count($hebergements) > 0) {
            $profils[] = ['type' => 'proprietaire', 'count_hebergements' => count($hebergements)];
        }

        return $this->json([
            'success' => true,
            'profils' => $profils
        ]);
    }

    #[Route('/api/utilisateurs/{id}', name: 'api_utilisateurs_update', methods: ['PUT'])]
    public function updateUtilisateur(int $id, Request $request, EntityManagerInterface $em): JsonResponse
    {
        $user = $this->utilisateurRepository->find($id);
        
        if (!$user) {
            return $this->json([
                'success' => false,
                'error' => 'Utilisateur non trouvé'
            ], 404);
        }

        $data = json_decode($request->getContent(), true);

        // Mettre à jour les champs
        if (isset($data['prenom'])) $user->setPrenom($data['prenom']);
        if (isset($data['nom'])) $user->setNom($data['nom']);
        if (isset($data['telephone'])) $user->setTelephone($data['telephone']);
        if (isset($data['languePreferee'])) $user->setLanguePreferee($data['languePreferee']);
        if (isset($data['besoinsAccessibilite'])) $user->setBesoinsAccessibilite($data['besoinsAccessibilite']);

        $em->flush();

        return $this->json([
            'success' => true,
            'message' => 'Utilisateur mis à jour avec succès',
            'utilisateur' => $this->formatUtilisateurData($user)
        ]);
    }

    /**
     * Formate les données utilisateur pour l'API
     */
    private function formatUtilisateurData(Utilisateur $user): array
    {
        return [
            'id' => $user->getId(),
            'email' => $user->getEmail(),
            'prenom' => $user->getPrenom(),
            'nom' => $user->getNom(),
            'telephone' => $user->getTelephone(),
            'avatar' => $user->getAvatar(),
            'date_naissance' => $user->getDateNaissance() ? $user->getDateNaissance()->format('Y-m-d') : null,
            'langue_preferee' => $user->getLanguePreferee(),
            'besoins_accessibilite' => $user->getBesoinsAccessibilite(),
            'date_creation' => $user->getDateCreation() ? $user->getDateCreation()->format('Y-m-d') : null,
            'est_actif' => $user->isEstActif()
        ];
    }

    /**
     * Vérifie si l'utilisateur a déjà un profil de ce type
     */
    private function utilisateurADejaProfil(Utilisateur $user, string $profilType): bool
    {
        switch($profilType) {
            case 'touriste':
                return $this->profilTouristeRepository->findOneBy(['idUtilisateur' => $user]) !== null;
            case 'artisan':
                return $this->artisanRepository->findOneBy(['idUtilisateur' => $user]) !== null;
            case 'guide':
                return $this->guideRepository->findOneBy(['idUtilisateur' => $user]) !== null;
            default:
                return false;
        }
    }

    /**
     * Compte les propriétaires uniques d'hébergements
     */
    private function compterProprietaires(): int
    {
        $hebergements = $this->hebergementRepository->findAll();
        $proprietairesUniques = [];

        foreach ($hebergements as $hebergement) {
            $proprietaire = $hebergement->getIdProprietaire();
            if ($proprietaire && !in_array($proprietaire->getId(), $proprietairesUniques)) {
                $proprietairesUniques[] = $proprietaire->getId();
            }
        }

        return count($proprietairesUniques);
    }

    // Garde la route originale pour le frontend si besoin
    #[Route('/user', name: 'app_user')]
    public function index(): Response
    {
        return $this->render('user/index.html.twig', [
            'controller_name' => 'UserController',
        ]);
    }
}