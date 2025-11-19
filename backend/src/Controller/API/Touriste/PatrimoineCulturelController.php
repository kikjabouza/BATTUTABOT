<?php

namespace App\Controller\API\Touriste;

use App\Entity\PatrimoineCulturel;
use App\Entity\Destination;
use App\Repository\PatrimoineCulturelRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/patrimoines-culturels')]
class PatrimoineCulturelController extends AbstractController
{
    #[Route('', methods: ['GET'])]
    public function index(PatrimoineCulturelRepository $repo): JsonResponse
    {
        $patrimoines = $repo->findAll();
        $data = [];

        foreach ($patrimoines as $p) {
            $data[] = $this->serializePatrimoine($p);
        }

        return $this->json($data);
    }

    #[Route('/{id}', methods: ['GET'])]
    public function show(PatrimoineCulturel $patrimoine): JsonResponse
    {
        return $this->json($this->serializePatrimoine($patrimoine));
    }

    #[Route('', methods: ['POST'])]
    public function store(Request $req, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($req->getContent(), true);

        $patrimoine = new PatrimoineCulturel();
        $patrimoine->setTitre($data['titre']);
        $patrimoine->setCategorie($data['categorie']);
        $patrimoine->setDescription($data['description']);
        $patrimoine->setContexteHistorique($data['contexteHistorique']);
        $patrimoine->setUrlMedia($data['urlMedia'] ?? null);
        $patrimoine->setTypeMedia($data['typeMedia'] ?? null);
        $patrimoine->setQuizInteractif($data['quizInteractif'] ?? null);

        if (isset($data['idDestination'])) {
            $dest = $em->getRepository(Destination::class)->find($data['idDestination']);
            $patrimoine->setIdDestination($dest);
        }

        $em->persist($patrimoine);
        $em->flush();

        return $this->json(['message' => 'Patrimoine créé', 'data' => $this->serializePatrimoine($patrimoine)], 201);
    }

    #[Route('/{id}', methods: ['PUT'])]
    public function update(Request $req, PatrimoineCulturel $patrimoine, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($req->getContent(), true);

        $patrimoine->setTitre($data['titre'] ?? $patrimoine->getTitre());
        $patrimoine->setCategorie($data['categorie'] ?? $patrimoine->getCategorie());
        $patrimoine->setDescription($data['description'] ?? $patrimoine->getDescription());
        $patrimoine->setContexteHistorique($data['contexteHistorique'] ?? $patrimoine->getContexteHistorique());
        $patrimoine->setUrlMedia($data['urlMedia'] ?? $patrimoine->getUrlMedia());
        $patrimoine->setTypeMedia($data['typeMedia'] ?? $patrimoine->getTypeMedia());
        $patrimoine->setQuizInteractif($data['quizInteractif'] ?? $patrimoine->getQuizInteractif());

        if (isset($data['idDestination'])) {
            $dest = $em->getRepository(Destination::class)->find($data['idDestination']);
            $patrimoine->setIdDestination($dest);
        }

        $em->flush();

        return $this->json(['message' => 'Patrimoine modifié', 'data' => $this->serializePatrimoine($patrimoine)]);
    }

    #[Route('/{id}', methods: ['DELETE'])]
    public function delete(PatrimoineCulturel $patrimoine, EntityManagerInterface $em): JsonResponse
    {
        $em->remove($patrimoine);
        $em->flush();

        return $this->json(['message' => 'Patrimoine supprimé']);
    }

    private function serializePatrimoine(PatrimoineCulturel $p): array
    {
        return [
            'id' => $p->getId(),
            'titre' => $p->getTitre(),
            'categorie' => $p->getCategorie(),
            'description' => $p->getDescription(),
            'contexteHistorique' => $p->getContexteHistorique(),
            'urlMedia' => $p->getUrlMedia(),
            'typeMedia' => $p->getTypeMedia(),
            'quizInteractif' => $p->getQuizInteractif(),
            'idDestination' => $p->getIdDestination()?->getId(),
        ];
    }
}
