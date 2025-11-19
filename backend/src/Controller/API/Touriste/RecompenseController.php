<?php

namespace App\Controller\API\Touriste;

use App\Entity\Recompense;
use App\Repository\RecompenseRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/recompenses')]
class RecompenseController extends AbstractController
{
    #[Route('', methods: ['GET'])]
    public function index(RecompenseRepository $repo): JsonResponse
    {
        $recompenses = $repo->findAll();
        $data = [];

        foreach ($recompenses as $r) {
            $data[] = $this->serializeRecompense($r);
        }

        return $this->json($data);
    }

    #[Route('/{id}', methods: ['GET'])]
    public function show(Recompense $recompense): JsonResponse
    {
        return $this->json($this->serializeRecompense($recompense));
    }

    #[Route('', methods: ['POST'])]
    public function store(Request $req, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($req->getContent(), true);

        $r = new Recompense();
        $r->setNom($data['nom']);
        $r->setDescription($data['description']);
        $r->setType($data['type']);
        $r->setValeurPoints($data['valeurPoints']);
        $r->setEstActif($data['estActif'] ?? false);

        $em->persist($r);
        $em->flush();

        return $this->json(['message' => 'Récompense créée', 'data' => $this->serializeRecompense($r)], 201);
    }

    #[Route('/{id}', methods: ['PUT'])]
    public function update(Request $req, Recompense $recompense, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($req->getContent(), true);

        $recompense->setNom($data['nom'] ?? $recompense->getNom());
        $recompense->setDescription($data['description'] ?? $recompense->getDescription());
        $recompense->setType($data['type'] ?? $recompense->getType());
        $recompense->setValeurPoints($data['valeurPoints'] ?? $recompense->getValeurPoints());
        $recompense->setEstActif($data['estActif'] ?? $recompense->isEstActif());

        $em->flush();

        return $this->json(['message' => 'Récompense modifiée', 'data' => $this->serializeRecompense($recompense)]);
    }

    #[Route('/{id}', methods: ['DELETE'])]
    public function delete(Recompense $recompense, EntityManagerInterface $em): JsonResponse
    {
        $em->remove($recompense);
        $em->flush();

        return $this->json(['message' => 'Récompense supprimée']);
    }

    private function serializeRecompense(Recompense $r): array
    {
        return [
            'id' => $r->getId(),
            'nom' => $r->getNom(),
            'description' => $r->getDescription(),
            'type' => $r->getType(),
            'valeurPoints' => $r->getValeurPoints(),
            'estActif' => $r->isEstActif(),
        ];
    }
}
