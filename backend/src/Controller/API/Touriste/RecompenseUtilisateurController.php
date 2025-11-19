<?php

namespace App\Controller\API\Touriste;

use App\Entity\RecompenseUtilisateur;
use App\Entity\Utilisateur;
use App\Entity\Recompense;
use App\Repository\RecompenseUtilisateurRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/recompenses-utilisateurs')]
class RecompenseUtilisateurController extends AbstractController
{
    #[Route('', methods: ['GET'])]
    public function index(RecompenseUtilisateurRepository $repo): JsonResponse
    {
        $list = $repo->findAll();
        $data = [];

        foreach ($list as $r) {
            $data[] = $this->serialize($r);
        }

        return $this->json($data);
    }

    #[Route('/{id}', methods: ['GET'])]
    public function show(RecompenseUtilisateur $r): JsonResponse
    {
        return $this->json($this->serialize($r));
    }

    #[Route('', methods: ['POST'])]
    public function store(Request $req, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($req->getContent(), true);

        $r = new RecompenseUtilisateur();
        $r->setEstUtilise($data['estUtilise'] ?? false);

        if (isset($data['dateObtention'])) {
            $r->setDateObtention(new \DateTime($data['dateObtention']));
        }

        if (isset($data['idUtilisateur'])) {
            $user = $em->getRepository(Utilisateur::class)->find($data['idUtilisateur']);
            $r->setIdUtilisateur($user);
        }

        if (isset($data['idRecompense'])) {
            $recompense = $em->getRepository(Recompense::class)->find($data['idRecompense']);
            $r->setIdRecompense($recompense);
        }

        $em->persist($r);
        $em->flush();

        return $this->json(['message' => 'Récompense utilisateur créée', 'data' => $this->serialize($r)], 201);
    }

    #[Route('/{id}', methods: ['PUT'])]
    public function update(Request $req, RecompenseUtilisateur $r, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($req->getContent(), true);

        $r->setEstUtilise($data['estUtilise'] ?? $r->isEstUtilise());

        if (isset($data['dateObtention'])) {
            $r->setDateObtention(new \DateTime($data['dateObtention']));
        }

        if (isset($data['idUtilisateur'])) {
            $user = $em->getRepository(Utilisateur::class)->find($data['idUtilisateur']);
            $r->setIdUtilisateur($user);
        }

        if (isset($data['idRecompense'])) {
            $recompense = $em->getRepository(Recompense::class)->find($data['idRecompense']);
            $r->setIdRecompense($recompense);
        }

        $em->flush();

        return $this->json(['message' => 'Récompense utilisateur modifiée', 'data' => $this->serialize($r)]);
    }

    #[Route('/{id}', methods: ['DELETE'])]
    public function delete(RecompenseUtilisateur $r, EntityManagerInterface $em): JsonResponse
    {
        $em->remove($r);
        $em->flush();

        return $this->json(['message' => 'Récompense utilisateur supprimée']);
    }

    private function serialize(RecompenseUtilisateur $r): array
    {
        return [
            'id' => $r->getId(),
            'dateObtention' => $r->getDateObtention()?->format('Y-m-d H:i:s'),
            'estUtilise' => $r->isEstUtilise(),
            'idUtilisateur' => $r->getIdUtilisateur()?->getId(),
            'idRecompense' => $r->getIdRecompense()?->getId(),
        ];
    }
}
