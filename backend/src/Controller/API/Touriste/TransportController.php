<?php
// src/Controller/API/TransportController.php
namespace App\Controller\API;

use App\Entity\Transport;
use App\Repository\TransportRepository;
use App\Repository\DestinationRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/transports')]
class TransportController extends AbstractController
{
    #[Route('', name: 'transport_list', methods: ['GET'])]
    public function list(TransportRepository $repo, Request $request): JsonResponse
    {
        $page = max(1, (int)$request->query->get('page', 1));
        $limit = max(1, (int)$request->query->get('limit', 20));
        $items = $repo->paginate($page, $limit);

        $data = array_map(function(Transport $t){
            return [
                'id' => $t->getId(),
                'type' => $t->getType(),
                'operateur' => $t->getOperateur(),
                'prix' => $t->getPrix(),
                'duree' => $t->getDuree(),
                'scoreEco' => $t->getScoreEco(),
                'emissionCo2' => $t->getEmissionCo2(),
                'endpointApi' => $t->getEndpointApi(),
                'estActif' => $t->isEstActif(),
                'destinationDepart' => $t->getDestinationDepart()?->getId(),
                'destinationArrivee' => $t->getDestinationArrivee()?->getId(),
            ];
        }, $items);

        return $this->json(['data' => $data, 'meta' => ['page' => $page, 'limit' => $limit]]);
    }

    #[Route('/{id}', name: 'transport_show', methods: ['GET'])]
    public function show(int $id, TransportRepository $repo): JsonResponse
    {
        $t = $repo->find($id);
        if (!$t) return $this->json(['error' => 'Transport not found'], 404);

        return $this->json(['data' => [
            'id' => $t->getId(),
            'type' => $t->getType(),
            'operateur' => $t->getOperateur(),
            'prix' => $t->getPrix(),
            'duree' => $t->getDuree(),
            'scoreEco' => $t->getScoreEco(),
            'emissionCo2' => $t->getEmissionCo2(),
            'endpointApi' => $t->getEndpointApi(),
            'estActif' => $t->isEstActif(),
            'destinationDepart' => $t->getDestinationDepart()?->getId(),
            'destinationArrivee' => $t->getDestinationArrivee()?->getId(),
        ]]);
    }

    #[Route('', name: 'transport_create', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em, DestinationRepository $destRepo): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        if (!$data) return $this->json(['error' => 'Invalid JSON'], 400);

        $required = ['type','operateur','prix','duree','scoreEco','emissionCo2','destinationDepart','destinationArrivee'];
        foreach ($required as $f) if (!isset($data[$f])) return $this->json(['error' => "Missing field: $f"], 400);

        $dep = $destRepo->find($data['destinationDepart']);
        $arr = $destRepo->find($data['destinationArrivee']);
        if (!$dep || !$arr) return $this->json(['error' => 'Destination depart/arrivee not found'], 404);

        $t = new Transport();
        $t->setType($data['type']);
        $t->setOperateur($data['operateur']);
        $t->setPrix((string)$data['prix']);
        $t->setDuree($data['duree']);
        $t->setScoreEco((float)$data['scoreEco']);
        $t->setEmissionCo2((float)$data['emissionCo2']);
        $t->setEndpointApi($data['endpointApi'] ?? null);
        $t->setEstActif($data['estActif'] ?? true);
        $t->setDestinationDepart($dep);
        $t->setDestinationArrivee($arr);

        $em->persist($t);
        $em->flush();

        return $this->json(['message' => 'Transport created', 'data' => ['id' => $t->getId()]], 201);
    }

    #[Route('/{id}', name: 'transport_update', methods: ['PUT'])]
    public function update(int $id, Request $request, TransportRepository $repo, EntityManagerInterface $em, DestinationRepository $destRepo): JsonResponse
    {
        $t = $repo->find($id);
        if (!$t) return $this->json(['error' => 'Transport not found'], 404);

        $data = json_decode($request->getContent(), true);
        if (!$data) return $this->json(['error' => 'Invalid JSON'], 400);

        if (isset($data['type'])) $t->setType($data['type']);
        if (isset($data['operateur'])) $t->setOperateur($data['operateur']);
        if (isset($data['prix'])) $t->setPrix((string)$data['prix']);
        if (isset($data['duree'])) $t->setDuree($data['duree']);
        if (isset($data['scoreEco'])) $t->setScoreEco((float)$data['scoreEco']);
        if (isset($data['emissionCo2'])) $t->setEmissionCo2((float)$data['emissionCo2']);
        if (array_key_exists('endpointApi', $data)) $t->setEndpointApi($data['endpointApi']);
        if (array_key_exists('estActif', $data)) $t->setEstActif((bool)$data['estActif']);

        if (isset($data['destinationDepart'])) {
            $dep = $destRepo->find($data['destinationDepart']);
            if (!$dep) return $this->json(['error' => 'destinationDepart not found'], 404);
            $t->setDestinationDepart($dep);
        }
        if (isset($data['destinationArrivee'])) {
            $arr = $destRepo->find($data['destinationArrivee']);
            if (!$arr) return $this->json(['error' => 'destinationArrivee not found'], 404);
            $t->setDestinationArrivee($arr);
        }

        $em->flush();
        return $this->json(['message' => 'Transport updated', 'data' => ['id' => $t->getId()]]);
    }

    #[Route('/{id}', name: 'transport_delete', methods: ['DELETE'])]
    public function delete(int $id, TransportRepository $repo, EntityManagerInterface $em): JsonResponse
    {
        $t = $repo->find($id);
        if (!$t) return $this->json(['error' => 'Transport not found'], 404);

        $em->remove($t);
        $em->flush();

        return $this->json(['message' => 'Transport deleted']);
    }
}
