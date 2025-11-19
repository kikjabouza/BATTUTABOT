<?php

namespace App\Controller\API\Touriste;

use App\Entity\Evenement;
use App\Entity\Destination;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/evenements')]
class EvenementController extends AbstractController
{
    #[Route('', methods: ['GET'])]
    public function index(EntityManagerInterface $em): JsonResponse
    {
        $evts = $em->getRepository(Evenement::class)->findAll();

        $data = [];
        foreach ($evts as $e) {
            $data[] = [
                'id' => $e->getId(),
                'nom' => $e->getNom(),
                'description' => $e->getDescription(),
                'type' => $e->getType(),
                'dateDebut' => $e->getDateDebut()?->format('Y-m-d'),
                'dateFin' => $e->getDateFin()?->format('Y-m-d'),
                'localisation' => $e->getLocalisation(),
                'prix' => $e->getPrix(),
                'urlInfo' => $e->getUrlInfo(),
                'idDestination' => $e->getIdDestination()?->getId()
            ];
        }

        return $this->json($data);
    }

    #[Route('/{id}', methods: ['GET'])]
    public function show(int $id, EntityManagerInterface $em): JsonResponse
    {
        $e = $em->getRepository(Evenement::class)->find($id);
        if (!$e) return $this->json(['error' => 'Événement non trouvé'], 404);

        return $this->json([
            'id' => $e->getId(),
            'nom' => $e->getNom(),
            'description' => $e->getDescription(),
            'type' => $e->getType(),
            'dateDebut' => $e->getDateDebut()?->format('Y-m-d'),
            'dateFin' => $e->getDateFin()?->format('Y-m-d'),
            'localisation' => $e->getLocalisation(),
            'prix' => $e->getPrix(),
            'urlInfo' => $e->getUrlInfo(),
            'idDestination' => $e->getIdDestination()?->getId()
        ]);
    }

    #[Route('', methods: ['POST'])]
    public function store(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $d = json_decode($request->getContent(), true);

        $evt = new Evenement();
        $evt->setNom($d['nom']);
        $evt->setDescription($d['description']);
        $evt->setType($d['type']);
        $evt->setDateDebut(new \DateTime($d['dateDebut']));
        $evt->setDateFin(new \DateTime($d['dateFin']));
        $evt->setLocalisation($d['localisation']);
        $evt->setPrix($d['prix'] ?? null);
        $evt->setUrlInfo($d['urlInfo'] ?? null);

        if (!empty($d['idDestination'])) {
            $dest = $em->getRepository(Destination::class)->find($d['idDestination']);
            if (!$dest) return $this->json(['error' => 'Destination invalide'], 400);
            $evt->setIdDestination($dest);
        }

        $em->persist($evt);
        $em->flush();

        return $this->json(['message' => 'Événement créé', 'id' => $evt->getId()], 201);
    }

    #[Route('/{id}', methods: ['PUT'])]
    public function update(int $id, Request $request, EntityManagerInterface $em): JsonResponse
    {
        $evt = $em->getRepository(Evenement::class)->find($id);
        if (!$evt) return $this->json(['error' => 'Événement non trouvé'], 404);

        $d = json_decode($request->getContent(), true);

        $evt->setNom($d['nom'] ?? $evt->getNom());
        $evt->setDescription($d['description'] ?? $evt->getDescription());
        $evt->setType($d['type'] ?? $evt->getType());

        if (!empty($d['dateDebut'])) $evt->setDateDebut(new \DateTime($d['dateDebut']));
        if (!empty($d['dateFin'])) $evt->setDateFin(new \DateTime($d['dateFin']));

        $evt->setLocalisation($d['localisation'] ?? $evt->getLocalisation());
        $evt->setPrix($d['prix'] ?? $evt->getPrix());
        $evt->setUrlInfo($d['urlInfo'] ?? $evt->getUrlInfo());

        if (!empty($d['idDestination'])) {
            $dest = $em->getRepository(Destination::class)->find($d['idDestination']);
            if (!$dest) return $this->json(['error' => 'Destination invalide'], 400);
            $evt->setIdDestination($dest);
        }

        $em->flush();

        return $this->json(['message' => 'Événement modifié']);
    }

    #[Route('/{id}', methods: ['DELETE'])]
    public function delete(int $id, EntityManagerInterface $em): JsonResponse
    {
        $evt = $em->getRepository(Evenement::class)->find($id);
        if (!$evt) return $this->json(['error' => 'Événement non trouvé'], 404);

        $em->remove($evt);
        $em->flush();

        return $this->json(['message' => 'Événement supprimé']);
    }
}
