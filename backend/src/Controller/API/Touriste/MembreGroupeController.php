<?php

namespace App\Controller\API\Touriste;

use App\Entity\MembreGroupe;
use App\Entity\Utilisateur;
use App\Entity\GroupeCommunaute;
use App\Repository\MembreGroupeRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/membres-groupe')]
class MembreGroupeController extends AbstractController
{
    #[Route('', methods: ['GET'])]
    public function index(MembreGroupeRepository $repo): JsonResponse
    {
        $membres = $repo->findAll();
        $data = [];

        foreach ($membres as $m) {
            $data[] = $this->serializeMembre($m);
        }

        return $this->json($data);
    }

    #[Route('/{id}', methods: ['GET'])]
    public function show(MembreGroupe $membre): JsonResponse
    {
        return $this->json($this->serializeMembre($membre));
    }

    #[Route('', methods: ['POST'])]
    public function store(Request $req, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($req->getContent(), true);

        $membre = new MembreGroupe();
        $membre->setRole($data['role']);

        if (isset($data['idGroupe'])) {
            $groupe = $em->getRepository(GroupeCommunaute::class)->find($data['idGroupe']);
            $membre->setIdGroupe($groupe);
        }

        if (isset($data['idUtilisateur'])) {
            $user = $em->getRepository(Utilisateur::class)->find($data['idUtilisateur']);
            $membre->setIdUtilisateur($user);
        }

        $em->persist($membre);
        $em->flush();

        return $this->json(['message' => 'Membre créé', 'data' => $this->serializeMembre($membre)], 201);
    }

    #[Route('/{id}', methods: ['PUT'])]
    public function update(Request $req, MembreGroupe $membre, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($req->getContent(), true);

        $membre->setRole($data['role'] ?? $membre->getRole());

        if (isset($data['idGroupe'])) {
            $groupe = $em->getRepository(GroupeCommunaute::class)->find($data['idGroupe']);
            $membre->setIdGroupe($groupe);
        }

        if (isset($data['idUtilisateur'])) {
            $user = $em->getRepository(Utilisateur::class)->find($data['idUtilisateur']);
            $membre->setIdUtilisateur($user);
        }

        $em->flush();

        return $this->json(['message' => 'Membre modifié', 'data' => $this->serializeMembre($membre)]);
    }

    #[Route('/{id}', methods: ['DELETE'])]
    public function delete(MembreGroupe $membre, EntityManagerInterface $em): JsonResponse
    {
        $em->remove($membre);
        $em->flush();

        return $this->json(['message' => 'Membre supprimé']);
    }

    private function serializeMembre(MembreGroupe $membre): array
    {
        return [
            'id' => $membre->getId(),
            'dateAdhesion' => $membre->getDateAdhesion()?->format('Y-m-d H:i:s'),
            'role' => $membre->getRole(),
            'idGroupe' => $membre->getIdGroupe()?->getId(),
            'idUtilisateur' => $membre->getIdUtilisateur()?->getId(),
        ];
    }
}
