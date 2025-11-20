<?php

namespace App\Controller\API\Touriste;

use App\Entity\GroupeCommunaute;
use App\Repository\DestinationRepository;
use App\Repository\UtilisateurRepository;
use App\Repository\GroupeCommunauteRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/groupe')]
class GroupeCommunauteController
{
    #[Route('/', methods: ['GET'])]
    public function index(GroupeCommunauteRepository $repo): JsonResponse
    {
        $groups = $repo->findAll();

        $data = array_map(function ($g) {
            return [
                'id' => $g->getId(),
                'nom' => $g->getNom(),
                'description' => $g->getDescription(),
                'typeInteret' => $g->getTypeInteret(),
                'urlWhatsapp' => $g->getUrlWhatsapp(),
                'urlTelegram' => $g->getUrlTelegram(),
                'estActif' => $g->isEstActif(),
                'membreMax' => $g->getMembreMax(),
                'idDestination' => $g->getIsDestination()?->getId(),
                'idCreateur' => $g->getIdCreateur()?->getId(),
            ];
        }, $groups);

        return new JsonResponse($data);
    }

    #[Route('/{id}', methods: ['GET'])]
    public function show(GroupeCommunaute $group): JsonResponse
    {
        return new JsonResponse([
            'id' => $group->getId(),
            'nom' => $group->getNom(),
            'description' => $group->getDescription(),
            'typeInteret' => $group->getTypeInteret(),
            'urlWhatsapp' => $group->getUrlWhatsapp(),
            'urlTelegram' => $group->getUrlTelegram(),
            'estActif' => $group->isEstActif(),
            'membreMax' => $group->getMembreMax(),
            'idDestination' => $group->getIsDestination()?->getId(),
            'idCreateur' => $group->getIdCreateur()?->getId(),
        ]);
    }

    #[Route('/', methods: ['POST'])]
    public function create(
        Request $request,
        EntityManagerInterface $em,
        DestinationRepository $destRepo,
        UtilisateurRepository $userRepo
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        $group = new GroupeCommunaute();
        $group->setNom($data['nom']);
        $group->setDescription($data['description']);
        $group->setTypeInteret($data['typeInteret']);
        $group->setUrlWhatsapp($data['urlWhatsapp'] ?? null);
        $group->setUrlTelegram($data['urlTelegram'] ?? null);
        $group->setEstActif($data['estActif']);
        $group->setMembreMax($data['membreMax'] ?? null);

        if (isset($data['idDestination'])) {
            $dest = $destRepo->find($data['idDestination']);
            $group->setIsDestination($dest);
        }

        if (isset($data['idCreateur'])) {
            $user = $userRepo->find($data['idCreateur']);
            $group->setIdCreateur($user);
        }

        $em->persist($group);
        $em->flush();

        return new JsonResponse(['message' => 'Groupe créé', 'id' => $group->getId()], 201);
    }

    #[Route('/{id}', methods: ['PUT'])]
    public function update(
        Request $request,
        GroupeCommunaute $group,
        EntityManagerInterface $em,
        DestinationRepository $destRepo,
        UtilisateurRepository $userRepo
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        $group->setNom($data['nom']);
        $group->setDescription($data['description']);
        $group->setTypeInteret($data['typeInteret']);
        $group->setUrlWhatsapp($data['urlWhatsapp'] ?? null);
        $group->setUrlTelegram($data['urlTelegram'] ?? null);
        $group->setEstActif($data['estActif']);
        $group->setMembreMax($data['membreMax'] ?? null);

        if (isset($data['idDestination'])) {
            $group->setIsDestination($destRepo->find($data['idDestination']));
        }

        if (isset($data['idCreateur'])) {
            $group->setIdCreateur($userRepo->find($data['idCreateur']));
        }

        $em->flush();

        return new JsonResponse(['message' => 'Groupe mis à jour']);
    }

    #[Route('/{id}', methods: ['DELETE'])]
    public function delete(
        GroupeCommunaute $group,
        EntityManagerInterface $em
    ): JsonResponse {
        $em->remove($group);
        $em->flush();

        return new JsonResponse(['message' => 'Groupe supprimé']);
    }
}
