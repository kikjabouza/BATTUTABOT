<?php
// src/Controller/API/Touriste/DestinationController.php
namespace App\Controller\API\Touriste;

use App\Entity\Destination;
use App\Repository\DestinationRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/destinations')]
class DestinationController extends AbstractController
{
    #[Route('', name: 'destination_list', methods: ['GET'])]
    public function list(DestinationRepository $repo, Request $request): JsonResponse
    {
        $page = max(1, (int)$request->query->get('page', 1));
        $limit = max(1, (int)$request->query->get('limit', 20));
        $items = $repo->paginate($page, $limit);

        $data = array_map(function(Destination $d){
            return [
                'id' => $d->getId(),
                'nom' => $d->getNom(),
                'description' => $d->getDescription(),
                'region' => $d->getRegion(),
                'latitude' => $d->getLatitude(),
                'longitude' => $d->getLongitude(),
                'climat' => $d->getClimat(),
                'meilleureSaison' => $d->getMeilleureSaison(),
                'scoreEco' => $d->getScoreEco(),
            ];
        }, $items);

        return $this->json(['data' => $data, 'meta' => ['page' => $page, 'limit' => $limit]]);
    }

    #[Route('/{id}', name: 'destination_show', methods: ['GET'])]
    public function show(int $id, DestinationRepository $repo): JsonResponse
    {
        $d = $repo->find($id);
        if (!$d) return $this->json(['error' => 'Destination not found'], 404);

        // includes hebergements count (optionnel)
        $hebergementsCount = $d->getHebergements()->count();

        return $this->json(['data' => [
            'id' => $d->getId(),
            'nom' => $d->getNom(),
            'description' => $d->getDescription(),
            'region' => $d->getRegion(),
            'latitude' => $d->getLatitude(),
            'longitude' => $d->getLongitude(),
            'climat' => $d->getClimat(),
            'meilleureSaison' => $d->getMeilleureSaison(),
            'scoreEco' => $d->getScoreEco(),
            'hebergementsCount' => $hebergementsCount
        ]]);
    }

    #[Route('', name: 'destination_create', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        if (!$data) return $this->json(['error' => 'Invalid JSON'], 400);

        $required = ['nom','region'];
        foreach ($required as $f) if (!isset($data[$f])) return $this->json(['error' => "Missing field: $f"], 400);

        $d = new Destination();
        $d->setNom($data['nom']);
        $d->setDescription($data['description'] ?? null);
        $d->setRegion($data['region']);
        $d->setLatitude($data['latitude'] ?? null);
        $d->setLongitude($data['longitude'] ?? null);
        $d->setClimat($data['climat'] ?? null);
        $d->setMeilleureSaison($data['meilleureSaison'] ?? null);
        $d->setScoreEco($data['scoreEco'] ?? null);

        $em->persist($d);
        $em->flush();

        return $this->json(['message' => 'Destination created', 'data' => ['id' => $d->getId()]], 201);
    }

    #[Route('/{id}', name: 'destination_update', methods: ['PUT'])]
    public function update(int $id, Request $request, DestinationRepository $repo, EntityManagerInterface $em): JsonResponse
    {
        $d = $repo->find($id);
        if (!$d) return $this->json(['error' => 'Destination not found'], 404);

        $data = json_decode($request->getContent(), true);
        if (!$data) return $this->json(['error' => 'Invalid JSON'], 400);

        if (isset($data['nom'])) $d->setNom($data['nom']);
        if (array_key_exists('description', $data)) $d->setDescription($data['description']);
        if (isset($data['region'])) $d->setRegion($data['region']);
        if (array_key_exists('latitude', $data)) $d->setLatitude($data['latitude']);
        if (array_key_exists('longitude', $data)) $d->setLongitude($data['longitude']);
        if (array_key_exists('climat', $data)) $d->setClimat($data['climat']);
        if (array_key_exists('meilleureSaison', $data)) $d->setMeilleureSaison($data['meilleureSaison']);
        if (array_key_exists('scoreEco', $data)) $d->setScoreEco($data['scoreEco']);

        $em->flush();
        return $this->json(['message' => 'Destination updated', 'data' => ['id' => $d->getId()]]);
    }

    #[Route('/{id}', name: 'destination_delete', methods: ['DELETE'])]
    public function delete(int $id, DestinationRepository $repo, EntityManagerInterface $em): JsonResponse
    {
        $d = $repo->find($id);
        if (!$d) return $this->json(['error' => 'Destination not found'], 404);

        $em->remove($d);
        $em->flush();

        return $this->json(['message' => 'Destination deleted']);
    }
}
