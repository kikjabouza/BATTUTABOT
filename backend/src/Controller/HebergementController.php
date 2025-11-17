<?php

namespace App\Controller;

use App\Entity\Hebergement;
use App\Entity\Utilisateur;
use App\Entity\Destination;
use App\Repository\HebergementRepository;
use App\Repository\UtilisateurRepository;
use App\Repository\DestinationRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class HebergementController extends AbstractController
{
    private $hebergementRepository;
    private $utilisateurRepository;
    private $destinationRepository;

    public function __construct(
        HebergementRepository $hebergementRepository,
        UtilisateurRepository $utilisateurRepository, 
        DestinationRepository $destinationRepository
    ) {
        $this->hebergementRepository = $hebergementRepository;
        $this->utilisateurRepository = $utilisateurRepository;
        $this->destinationRepository = $destinationRepository;
    }

    #[Route('/api/hebergements', name: 'api_hebergements_list', methods: ['GET'])]
    public function listHebergements(): JsonResponse
    {
        // Récupère TOUS les hébergements de la base
        $hebergements = $this->hebergementRepository->findAll();
        
        $result = [];
        foreach ($hebergements as $hebergement) {
            $result[] = $this->formatHebergementData($hebergement);
        }

        return $this->json([
            'success' => true,
            'total' => count($result),
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
            'hebergement' => $this->formatHebergementData($hebergement, true) // true pour details complets
        ]);
    }

    #[Route('/api/hebergements/types', name: 'api_hebergements_types', methods: ['GET'])]
    public function getTypesHebergement(): JsonResponse
    {
        // Récupère les types DISTINCTS depuis la base
        $types = $this->hebergementRepository->findDistinctTypes();
        
        // Si la méthode n'existe pas, on la crée manuellement
        if (empty($types)) {
            $hebergements = $this->hebergementRepository->findAll();
            $types = [];
            foreach ($hebergements as $hebergement) {
                $type = $hebergement->getType();
                if ($type && !in_array($type, $types)) {
                    $types[] = $type;
                }
            }
        }

        return $this->json([
            'success' => true,
            'types' => $types
        ]);
    }

    #[Route('/api/hebergements/filtrer', name: 'api_hebergements_filter', methods: ['GET'])]
    public function filterHebergements(Request $request): JsonResponse
    {
        $filtres = [
            'type' => $request->query->get('type'),
            'destination' => $request->query->get('destination'),
            'prix_min' => $request->query->get('prix_min'),
            'prix_max' => $request->query->get('prix_max'),
            'eco_certifie' => $request->query->get('eco_certifie')
        ];

        // Applique les filtres
        $hebergements = $this->hebergementRepository->findByFilters($filtres);
        
        $result = [];
        foreach ($hebergements as $hebergement) {
            $result[] = $this->formatHebergementData($hebergement);
        }

        return $this->json([
            'success' => true,
            'filtres_appliques' => array_filter($filtres),
            'total' => count($result),
            'hebergements' => $result
        ]);
    }

    #[Route('/api/hebergements', name: 'api_hebergements_create', methods: ['POST'])]
    public function createHebergement(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        // Créer un nouvel hébergement
        $hebergement = new Hebergement();
        $hebergement->setNom($data['nom'] ?? '');
        $hebergement->setDescription($data['description'] ?? '');
        $hebergement->setType($data['type'] ?? '');
        $hebergement->setAdresse($data['adresse'] ?? '');
        $hebergement->setPrixNuit($data['prix_nuit'] ?? 0);
        $hebergement->setCapacite($data['capacite'] ?? 1);
        $hebergement->setEcoCertifie($data['eco_certifie'] ?? false);
        $hebergement->setCaracteristiquesEco($data['caracteristiques_eco'] ?? []);
        $hebergement->setEquipements($data['equipements'] ?? []);

        // Associer le propriétaire
        if (isset($data['id_proprietaire'])) {
            $proprietaire = $this->utilisateurRepository->find($data['id_proprietaire']);
            if ($proprietaire) {
                $hebergement->setIdProprietaire($proprietaire);
            }
        }

        // Associer la destination
        if (isset($data['id_destination'])) {
            $destination = $this->destinationRepository->find($data['id_destination']);
            if ($destination) {
                $hebergement->setIdDestination($destination);
            }
        }

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
        if (isset($data['prix_nuit'])) $hebergement->setPrixNuit($data['prix_nuit']);
        if (isset($data['eco_certifie'])) $hebergement->setEcoCertifie($data['eco_certifie']);

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
     * Formate les données d'un hébergement pour l'API
     */
    private function formatHebergementData(Hebergement $hebergement, bool $detailsComplets = false): array
    {
        $proprietaire = $hebergement->getIdProprietaire();
        $destination = $hebergement->getIdDestination();

        $data = [
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
            'proprietaire' => $proprietaire ? $this->formatProprietaireData($proprietaire) : null,
            'destination' => $destination ? $this->formatDestinationData($destination) : null
        ];

        if ($detailsComplets) {
            $data['horaires'] = $hebergement->getHoraires();
            $data['photos'] = $hebergement->getPhotos() ?? [];
            $data['regles'] = $hebergement->getRegles() ?? [];
            $data['services'] = $hebergement->getServices() ?? [];
        }

        return $data;
    }

    /**
     * Formate les données du propriétaire
     */
    private function formatProprietaireData(Utilisateur $proprietaire): array
    {
        return [
            'id' => $proprietaire->getId(),
            'email' => $proprietaire->getEmail(),
            'prenom' => $proprietaire->getPrenom(),
            'nom' => $proprietaire->getNom(),
            'telephone' => $proprietaire->getTelephone(),
            'avatar' => $proprietaire->getAvatar(),
            'date_naissance' => $proprietaire->getDateNaissance() ? $proprietaire->getDateNaissance()->format('Y-m-d') : null,
            'langue_preferee' => $proprietaire->getLanguePreferee(),
            'date_creation' => $proprietaire->getDateCreation() ? $proprietaire->getDateCreation()->format('Y-m-d') : null,
            'est_actif' => $proprietaire->isEstActif()
        ];
    }

    /**
     * Formate les données de la destination
     */
    private function formatDestinationData(Destination $destination): array
    {
        return [
            'id' => $destination->getId(),
            'nom' => $destination->getNom(),
            'description' => $destination->getDescription(),
            'region' => $destination->getRegion(),
            'latitude' => $destination->getLatitude(),
            'longitude' => $destination->getLongitude(),
            'climat' => $destination->getClimat(),
            'meilleure_saison' => $destination->getMeilleureSaison(),
            'score_eco' => $destination->getScoreEco()
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