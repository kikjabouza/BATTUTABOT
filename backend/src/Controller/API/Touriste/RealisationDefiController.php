<?php

namespace App\Controller\API\Touriste;

use App\Entity\RealisationDefi;
use App\Entity\Utilisateur;
use App\Entity\DefiEco;
use App\Repository\RealisationDefiRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/realisations-defis')]
class RealisationDefiController extends AbstractController
{
    #[Route('', methods: ['GET'])]
    public function index(RealisationDefiRepository $repo): JsonResponse
    {
        $realisations = $repo->findAll();
        $data = [];

        foreach ($realisations as $r) {
            $data[] = $this->serializeRealisation($r);
        }

        return $this->json($data);
    }

    #[Route('/{id}', methods: ['GET'])]
    public function show(RealisationDefi $realisation): JsonResponse
    {
        return $this->json($this->serializeRealisation($realisation));
    }

    #[Route('', methods: ['POST'])]
    public function store(Request $req, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($req->getContent(), true);

        $realisation = new RealisationDefi();
        $realisation->setProgresValeur($data['progresValeur']);
        $realisation->setEstTermine($data['estTermine'] ?? false);
        $realisation->setPointsGagnes($data['pointsGagnes']);

        if (isset($data['dateTerminaison'])) {
            $realisation->setDateTerminaison(new \DateTime($data['dateTerminaison']));
        }

        if (isset($data['idUtilisateur'])) {
            $user = $em->getRepository(Utilisateur::class)->find($data['idUtilisateur']);
            $realisation->setIdUtilisateur($user);
        }

        if (isset($data['idDefi'])) {
            $defi = $em->getRepository(DefiEco::class)->find($data['idDefi']);
            $realisation->setIdDefi($defi);
        }

        $em->persist($realisation);
        $em->flush();

        return $this->json(['message' => 'Réalisation de défi créée', 'data' => $this->serializeRealisation($realisation)], 201);
    }

    #[Route('/{id}', methods: ['PUT'])]
    public function update(Request $req, RealisationDefi $realisation, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($req->getContent(), true);

        $realisation->setProgresValeur($data['progresValeur'] ?? $realisation->getProgresValeur());
        $realisation->setEstTermine($data['estTermine'] ?? $realisation->isEstTermine());
        $realisation->setPointsGagnes($data['pointsGagnes'] ?? $realisation->getPointsGagnes());

        if (isset($data['dateTerminaison'])) {
            $realisation->setDateTerminaison(new \DateTime($data['dateTerminaison']));
        }

        if (isset($data['idUtilisateur'])) {
            $user = $em->getRepository(Utilisateur::class)->find($data['idUtilisateur']);
            $realisation->setIdUtilisateur($user);
        }

        if (isset($data['idDefi'])) {
            $defi = $em->getRepository(DefiEco::class)->find($data['idDefi']);
            $realisation->setIdDefi($defi);
        }

        $em->flush();

        return $this->json(['message' => 'Réalisation de défi modifiée', 'data' => $this->serializeRealisation($realisation)]);
    }

    #[Route('/{id}', methods: ['DELETE'])]
    public function delete(RealisationDefi $realisation, EntityManagerInterface $em): JsonResponse
    {
        $em->remove($realisation);
        $em->flush();

        return $this->json(['message' => 'Réalisation de défi supprimée']);
    }

    private function serializeRealisation(RealisationDefi $r): array
    {
        return [
            'id' => $r->getId(),
            'progresValeur' => $r->getProgresValeur(),
            'estTermine' => $r->isEstTermine(),
            'dateTerminaison' => $r->getDateTerminaison()?->format('Y-m-d H:i:s'),
            'pointsGagnes' => $r->getPointsGagnes(),
            'idUtilisateur' => $r->getIdUtilisateur()?->getId(),
            'idDefi' => $r->getIdDefi()?->getId(),
        ];
    }
}
