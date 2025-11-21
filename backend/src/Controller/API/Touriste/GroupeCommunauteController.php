<?php

namespace App\Controller\API\Touriste;

use App\Entity\GroupeCommunaute;
use App\Repository\DestinationRepository;
use App\Repository\UtilisateurRepository;
use App\Repository\GroupeCommunauteRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/groupe')]
class GroupeCommunauteController extends AbstractController
{
    private GroupeCommunauteRepository $groupeRepo;
    private DestinationRepository $destinationRepo;
    private UtilisateurRepository $userRepo;
    private EntityManagerInterface $em;

    public function __construct(
        GroupeCommunauteRepository $groupeRepo,
        DestinationRepository $destinationRepo,
        UtilisateurRepository $userRepo,
        EntityManagerInterface $em
    ) {
        $this->groupeRepo = $groupeRepo;
        $this->destinationRepo = $destinationRepo;
        $this->userRepo = $userRepo;
        $this->em = $em;
    }

    #[Route('', name: 'api_groupe_index', methods: ['GET'])]
    public function index(): JsonResponse
    {
        $groups = $this->groupeRepo->findAll();

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

    #[Route('/{id}', name: 'api_groupe_show', methods: ['GET'])]
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

    #[Route('', name: 'api_groupe_create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        // Validation des données requises
        if (!isset($data['nom']) || !isset($data['description']) || !isset($data['typeInteret'])) {
            return new JsonResponse(['error' => 'Les champs nom, description et typeInteret sont obligatoires'], 400);
        }

        $group = new GroupeCommunaute();
        $group->setNom($data['nom']);
        $group->setDescription($data['description']);
        $group->setTypeInteret($data['typeInteret']);
        $group->setUrlWhatsapp($data['urlWhatsapp'] ?? null);
        $group->setUrlTelegram($data['urlTelegram'] ?? null);
        $group->setEstActif($data['estActif'] ?? true);
        $group->setMembreMax($data['membreMax'] ?? null);

        if (isset($data['idDestination'])) {
            $dest = $this->destinationRepo->find($data['idDestination']);
            if ($dest) {
                $group->setIsDestination($dest);
            }
        }

        if (isset($data['idCreateur'])) {
            $user = $this->userRepo->find($data['idCreateur']);
            if ($user) {
                $group->setIdCreateur($user);
            }
        }

        $this->em->persist($group);
        $this->em->flush();

        return new JsonResponse([
            'message' => 'Groupe créé avec succès',
            'id' => $group->getId(),
            'data' => [
                'id' => $group->getId(),
                'nom' => $group->getNom(),
                'description' => $group->getDescription(),
                'typeInteret' => $group->getTypeInteret(),
            ]
        ], 201);
    }

    #[Route('/{id}', name: 'api_groupe_update', methods: ['PUT'])]
    public function update(Request $request, GroupeCommunaute $group): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $group->setNom($data['nom'] ?? $group->getNom());
        $group->setDescription($data['description'] ?? $group->getDescription());
        $group->setTypeInteret($data['typeInteret'] ?? $group->getTypeInteret());
        $group->setUrlWhatsapp($data['urlWhatsapp'] ?? $group->getUrlWhatsapp());
        $group->setUrlTelegram($data['urlTelegram'] ?? $group->getUrlTelegram());
        $group->setEstActif($data['estActif'] ?? $group->isEstActif());
        $group->setMembreMax($data['membreMax'] ?? $group->getMembreMax());

        if (isset($data['idDestination'])) {
            $dest = $this->destinationRepo->find($data['idDestination']);
            if ($dest) {
                $group->setIsDestination($dest);
            }
        }

        if (isset($data['idCreateur'])) {
            $user = $this->userRepo->find($data['idCreateur']);
            if ($user) {
                $group->setIdCreateur($user);
            }
        }

        $this->em->flush();

        return new JsonResponse(['message' => 'Groupe mis à jour avec succès']);
    }

    #[Route('/{id}', name: 'api_groupe_delete', methods: ['DELETE'])]
    public function delete(GroupeCommunaute $group): JsonResponse
    {
        $this->em->remove($group);
        $this->em->flush();

        return new JsonResponse(['message' => 'Groupe supprimé avec succès']);
    }
}
