<?php

namespace App\Controller\API\Touriste;

use App\Entity\Hebergement;
use App\Entity\Utilisateur;
use App\Entity\Destination;
use App\Entity\ProfilTouriste;
use App\Repository\HebergementRepository;
use App\Repository\UtilisateurRepository;
use App\Repository\DestinationRepository;
use App\Repository\ProfilTouristeRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

final class HebergementController extends AbstractController
{
    private $hebergementRepository;
    private $utilisateurRepository;
    private $destinationRepository;
    private $profilTouristeRepository;

    public function __construct(
        HebergementRepository $hebergementRepository,
        UtilisateurRepository $utilisateurRepository,
        DestinationRepository $destinationRepository,
        ProfilTouristeRepository $profilTouristeRepository
    ) {
        $this->hebergementRepository = $hebergementRepository;
        $this->utilisateurRepository = $utilisateurRepository;
        $this->destinationRepository = $destinationRepository;
        $this->profilTouristeRepository = $profilTouristeRepository;
    }

    #[Route('/api/hebergements', name: 'api_hebergements_list', methods: ['GET'])]
    public function listHebergements(#[CurrentUser] $user = null): JsonResponse
    {
        // Récupère le niveau économique de l'utilisateur
        $niveauEconomique = $this->getNiveauEconomique($user);

        // Récupère tous les hébergements (à adapter si tu as une méthode spécifique)
        $hebergements = $this->hebergementRepository->findAll();

        $result = [];
        foreach ($hebergements as $hebergement) {
            $hebergementData = $this->formatHebergementData($hebergement);
            $hebergementData['niveau_recommande'] = $this->getNiveauRecommandation($hebergement, $niveauEconomique);
            $result[] = $hebergementData;
        }

        return $this->json([
            'success' => true,
            'total' => count($result),
            'niveau_economique_utilisateur' => $niveauEconomique,
            'hebergements' => $result
        ]);
    }

    #[Route('/api/hebergements/{id}', name: 'api_hebergements_show', methods: ['GET'])]
    public function showHebergement(int $id): JsonResponse
    {
        $hebergement = $this->hebergementRepository->find($id);

        if (!$hebergement) {
            return $this->json([
                'success' => false,
                'error' => 'Hébergement non trouvé'
            ], 404);
        }

        return $this->json([
            'success' => true,
            'hebergement' => $this->formatHebergementData($hebergement)
        ]);
    }

    #[Route('/api/hebergements/types', name: 'api_hebergements_types', methods: ['GET'])]
    public function getTypesHebergement(): JsonResponse
    {
        $hebergements = $this->hebergementRepository->findAll();
        $types = [];

        foreach ($hebergements as $hebergement) {
            $type = $hebergement->getType();
            if ($type && !in_array($type, $types)) {
                $types[] = $type;
            }
        }

        return $this->json([
            'success' => true,
            'types' => $types
        ]);
    }

    #[Route('/api/hebergements/filtrer', name: 'api_hebergements_filter', methods: ['GET'])]
    public function filterHebergements(Request $request, #[CurrentUser] $user = null): JsonResponse
    {
        $filtres = [
            'type' => $request->query->get('type'),
            'destination' => $request->query->get('destination'),
            'prix_min' => $request->query->get('prix_min'),
            'prix_max' => $request->query->get('prix_max'),
            'eco_certifie' => $request->query->get('eco_certifie')
        ];

        // Récupère le niveau économique de l'utilisateur
        $niveauEconomique = $this->getNiveauEconomique($user);

        // Applique les filtres de base
        $hebergements = $this->hebergementRepository->findAll();
        $hebergementsFiltres = [];

        foreach ($hebergements as $hebergement) {
            if ($this->passeLesFiltres($hebergement, $filtres, $niveauEconomique)) {
                $hebergementsFiltres[] = $hebergement;
            }
        }

        $result = [];
        foreach ($hebergementsFiltres as $hebergement) {
            $result[] = $this->formatHebergementData($hebergement);
        }

        return $this->json([
            'success' => true,
            'filtres_appliques' => array_filter($filtres),
            'niveau_economique_utilisateur' => $niveauEconomique,
            'total' => count($result),
            'hebergements' => $result
        ]);
    }

    #[Route('/api/hebergements', name: 'api_hebergements_create', methods: ['POST'])]
    public function createHebergement(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        // Validation des données requises
        if (!isset($data['nom']) || !isset($data['prix_nuit']) || !isset($data['id_destination'])) {
            return $this->json([
                'success' => false,
                'error' => 'Nom, prix_nuit et id_destination sont obligatoires'
            ], 400);
        }

        // Créer un nouvel hébergement
        $hebergement = new Hebergement();
        $hebergement->setNom($data['nom']);
        $hebergement->setDescription($data['description'] ?? '');
        $hebergement->setType($data['type'] ?? null);
        $hebergement->setAdresse($data['adresse'] ?? null);
        $hebergement->setPrixNuit((string)($data['prix_nuit'] ?? 0));
        $hebergement->setCapacite($data['capacite'] ?? 1);
        $hebergement->setEcoCertifie($data['eco_certifie'] ?? false);
        $hebergement->setCaracteristiquesEco($data['caracteristiques_eco'] ?? null);
        $hebergement->setEquipements($data['equipements'] ?? null);
        $hebergement->setEstVerifie(false); // Par défaut non vérifié

        // Coordonnées GPS si fournies
        if (isset($data['latitude'])) {
            $hebergement->setLatitude((float)$data['latitude']);
        }
        if (isset($data['longitude'])) {
            $hebergement->setLongitude((float)$data['longitude']);
        }

        // Associer le propriétaire
        if (isset($data['id_proprietaire'])) {
            $proprietaire = $this->utilisateurRepository->find($data['id_proprietaire']);
            if ($proprietaire) {
                $hebergement->setIdProprietaire($proprietaire);
            }
        }

        // Associer la destination (obligatoire)
        $destination = $this->destinationRepository->find($data['id_destination']);
        if (!$destination) {
            return $this->json([
                'success' => false,
                'error' => 'Destination non trouvée'
            ], 400);
        }
        $hebergement->setIdDestination($destination);

        $em->persist($hebergement);
        $em->flush();

        return $this->json([
            'success' => true,
            'message' => 'Hébergement créé avec succès',
            'hebergement_id' => $hebergement->getId()
        ], 201);
    }

    #[Route('/api/hebergements/{id}', name: 'api_hebergements_update', methods: ['PUT'])]
    public function updateHebergement(int $id, Request $request, EntityManagerInterface $em): JsonResponse
    {
        $hebergement = $this->hebergementRepository->find($id);

        if (!$hebergement) {
            return $this->json([
                'success' => false,
                'error' => 'Hébergement non trouvé'
            ], 404);
        }

        $data = json_decode($request->getContent(), true);

        // Met à jour les champs
        if (isset($data['nom'])) $hebergement->setNom($data['nom']);
        if (isset($data['description'])) $hebergement->setDescription($data['description']);
        if (isset($data['type'])) $hebergement->setType($data['type']);
        if (isset($data['adresse'])) $hebergement->setAdresse($data['adresse']);
        if (isset($data['prix_nuit'])) $hebergement->setPrixNuit((string)$data['prix_nuit']);
        if (isset($data['capacite'])) $hebergement->setCapacite($data['capacite']);
        if (isset($data['eco_certifie'])) $hebergement->setEcoCertifie($data['eco_certifie']);
        if (isset($data['caracteristiques_eco'])) $hebergement->setCaracteristiquesEco($data['caracteristiques_eco']);
        if (isset($data['equipements'])) $hebergement->setEquipements($data['equipements']);
        if (isset($data['latitude'])) $hebergement->setLatitude((float)$data['latitude']);
        if (isset($data['longitude'])) $hebergement->setLongitude((float)$data['longitude']);

        $em->flush();

        return $this->json([
            'success' => true,
            'message' => 'Hébergement mis à jour avec succès',
            'hebergement' => $this->formatHebergementData($hebergement)
        ]);
    }

    #[Route('/api/hebergements/{id}', name: 'api_hebergements_delete', methods: ['DELETE'])]
    public function deleteHebergement(int $id, EntityManagerInterface $em): JsonResponse
    {
        $hebergement = $this->hebergementRepository->find($id);

        if (!$hebergement) {
            return $this->json([
                'success' => false,
                'error' => 'Hébergement non trouvé'
            ], 404);
        }

        $em->remove($hebergement);
        $em->flush();

        return $this->json([
            'success' => true,
            'message' => 'Hébergement supprimé avec succès'
        ]);
    }

    /**
     * Récupère le niveau économique de l'utilisateur
     */
    private function getNiveauEconomique(?Utilisateur $user): string
    {
        if (!$user) {
            return 'moyen'; // Par défaut si visiteur
        }

        $profilTouriste = $this->profilTouristeRepository->findOneBy(['idUtilisateur' => $user]);

        if ($profilTouriste && $profilTouriste->getNiveauEconomique()) {
            return $profilTouriste->getNiveauEconomique();
        }

        return 'moyen'; // Par défaut
    }

    /**
     * Détermine si l'hébergement est recommandé pour le niveau économique
     */
    private function getNiveauRecommandation(Hebergement $hebergement, string $niveauEconomique): string
    {
        $prix = (float) $hebergement->getPrixNuit();

        $plagesPrix = [
            'eco' => ['min' => 10, 'max' => 30],
            'moyen' => ['min' => 25, 'max' => 60],
            'confort' => ['min' => 50, 'max' => 120],
            'luxe' => ['min' => 100, 'max' => 500]
        ];

        $plage = $plagesPrix[$niveauEconomique] ?? $plagesPrix['moyen'];

        if ($prix < $plage['min']) return 'tres_abordable';
        if ($prix <= $plage['max']) return 'recommandé';
        return 'au_dessus';
    }

    /**
     * Vérifie si un hébergement passe les filtres
     */
    private function passeLesFiltres(Hebergement $hebergement, array $filtres, string $niveauEconomique): bool
    {
        // Filtre par type
        if (!empty($filtres['type']) && $hebergement->getType() !== $filtres['type']) {
            return false;
        }

        // Filtre par destination
        if (!empty($filtres['destination'])) {
            $destination = $hebergement->getIdDestination();
            if (!$destination || $destination->getNom() !== $filtres['destination']) {
                return false;
            }
        }

        // Filtre par prix
        $prix = (float)$hebergement->getPrixNuit();
        if (!empty($filtres['prix_min']) && $prix < (float)$filtres['prix_min']) {
            return false;
        }
        if (!empty($filtres['prix_max']) && $prix > (float)$filtres['prix_max']) {
            return false;
        }

        // Filtre éco-certifié
        if (!empty($filtres['eco_certifie']) && !$hebergement->isEcoCertifie()) {
            return false;
        }

        return true;
    }

    /**
     * Formate les données d'un hébergement pour l'API
     */
    private function formatHebergementData(Hebergement $hebergement): array
    {
        $proprietaire = $hebergement->getIdProprietaire();
        $destination = $hebergement->getIdDestination();

        return [
            'id' => $hebergement->getId(),
            'nom' => $hebergement->getNom(),
            'description' => $hebergement->getDescription(),
            'type' => $hebergement->getType(),
            'adresse' => $hebergement->getAdresse(),
            'latitude' => $hebergement->getLatitude(),
            'longitude' => $hebergement->getLongitude(),
            'prix_nuit' => $hebergement->getPrixNuit(),
            'capacite' => $hebergement->getCapacite(),
            'eco_certifie' => $hebergement->isEcoCertifie(),
            'caracteristiques_eco' => $hebergement->getCaracteristiquesEco(),
            'equipements' => $hebergement->getEquipements(),
            'est_verifie' => $hebergement->isEstVerifie(),
            'proprietaire' => $proprietaire ? [
                'id' => $proprietaire->getId(),
                'prenom' => $proprietaire->getPrenom(),
                'nom' => $proprietaire->getNom(),
                'telephone' => $proprietaire->getTelephone()
            ] : null,
            'destination' => $destination ? [
                'id' => $destination->getId(),
                'nom' => $destination->getNom(),
                'region' => $destination->getRegion()
            ] : null
        ];
    }

    #[Route('/hebergement', name: 'app_hebergement')]
    public function index(): Response
    {
        return $this->render('hebergement/index.html.twig', [
            'controller_name' => 'HebergementController',
        ]);
    }
}
