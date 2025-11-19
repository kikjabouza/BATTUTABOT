<?php

namespace App\Controller\API\Touriste;

use App\Entity\Activite;
use App\Entity\Destination;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/activites')]
class ActiviteController extends AbstractController
{
    #[Route('', methods: ['GET'])]
    public function index(EntityManagerInterface $em): JsonResponse
    {
        $activites = $em->getRepository(Activite::class)->findAll();

        $data = array_map(function($a) {
            return [
                'id' => $a->getId(),
                'nom' => $a->getNom(),
                'description' => $a->getDescription(),
                'type' => $a->getType(),
                'adresse' => $a->getAdresse(),
                'latitude' => $a->getLatitude(),
                'longitude' => $a->getLongitude(),
                'gammePrix' => $a->getGammePrix(),
                'duree' => $a->getDuree(),
                'ecoFriendly' => $a->isEcoFriendly(),
                'accessibilite' => $a->getAccessibilite(),
                'horaires' => $a->getHoraires(),
                'destination' => $a->getIdDestination()?->getId(),
            ];
        }, $activites);

        return $this->json($data);
    }

    #[Route('/{id}', methods: ['GET'])]
    public function show($id, EntityManagerInterface $em): JsonResponse
    {
        $a = $em->getRepository(Activite::class)->find($id);
        if (!$a) return $this->json(['error' => 'Activité non trouvée'], 404);

        return $this->json([
            'id' => $a->getId(),
            'nom' => $a->getNom(),
            'description' => $a->getDescription(),
            'type' => $a->getType(),
            'adresse' => $a->getAdresse(),
            'latitude' => $a->getLatitude(),
            'longitude' => $a->getLongitude(),
            'gammePrix' => $a->getGammePrix(),
            'duree' => $a->getDuree(),
            'ecoFriendly' => $a->isEcoFriendly(),
            'accessibilite' => $a->getAccessibilite(),
            'horaires' => $a->getHoraires(),
            'destination' => $a->getIdDestination()?->getId(),
        ]);
    }

    #[Route('', methods: ['POST'])]
    public function create(Request $req, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($req->getContent(), true);

        $a = new Activite();
        $a->setNom($data['nom']);
        $a->setDescription($data['description'] ?? null);
        $a->setType($data['type'] ?? null);
        $a->setAdresse($data['adresse'] ?? null);
        $a->setLatitude($data['latitude'] ?? null);
        $a->setLongitude($data['longitude'] ?? null);
        $a->setGammePrix($data['gammePrix'] ?? null);
        $a->setDuree($data['duree'] ?? null);
        $a->setEcoFriendly($data['ecoFriendly'] ?? false);
        $a->setAccessibilite($data['accessibilite'] ?? null);
        $a->setHoraires($data['horaires'] ?? null);

        if (isset($data['idDestination'])) {
            $dest = $em->getRepository(Destination::class)->find($data['idDestination']);
            if (!$dest) return $this->json(['error' => 'Destination invalide'], 400);
            $a->setIdDestination($dest);
        }

        $em->persist($a);
        $em->flush();

        return $this->json(['message' => 'Activité créée', 'id' => $a->getId()], 201);
    }

    #[Route('/{id}', methods: ['PUT'])]
    public function update($id, Request $req, EntityManagerInterface $em): JsonResponse
    {
        $a = $em->getRepository(Activite::class)->find($id);
        if (!$a) return $this->json(['error' => 'Activité non trouvée'], 404);

        $data = json_decode($req->getContent(), true);

        $a->setNom($data['nom'] ?? $a->getNom());
        $a->setDescription($data['description'] ?? $a->getDescription());
        $a->setType($data['type'] ?? $a->getType());
        $a->setAdresse($data['adresse'] ?? $a->getAdresse());
        $a->setLatitude($data['latitude'] ?? $a->getLatitude());
        $a->setLongitude($data['longitude'] ?? $a->getLongitude());
        $a->setGammePrix($data['gammePrix'] ?? $a->getGammePrix());
        $a->setDuree($data['duree'] ?? $a->getDuree());
        $a->setEcoFriendly($data['ecoFriendly'] ?? $a->isEcoFriendly());
        $a->setAccessibilite($data['accessibilite'] ?? $a->getAccessibilite());
        $a->setHoraires($data['horaires'] ?? $a->getHoraires());

        if (isset($data['idDestination'])) {
            $dest = $em->getRepository(Destination::class)->find($data['idDestination']);
            if (!$dest) return $this->json(['error' => 'Destination invalide'], 400);
            $a->setIdDestination($dest);
        }

        $em->flush();

        return $this->json(['message' => 'Activité mise à jour']);
    }

    #[Route('/{id}', methods: ['DELETE'])]
    public function delete($id, EntityManagerInterface $em): JsonResponse
    {
        $a = $em->getRepository(Activite::class)->find($id);
        if (!$a) return $this->json(['error' => 'Activité non trouvée'], 404);

        $em->remove($a);
        $em->flush();

        return $this->json(['message' => 'Activité supprimée']);
    }
}
