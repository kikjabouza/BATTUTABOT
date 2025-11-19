<?php

namespace App\Controller\API\Touriste;

use App\Entity\ProfilTouriste;
use App\Entity\Utilisateur;
use App\Repository\ProfilTouristeRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/profils-touristes')]
class ProfilTouristeController extends AbstractController
{
    #[Route('', methods: ['GET'])]
    public function index(ProfilTouristeRepository $repo): JsonResponse
    {
        $profils = $repo->findAll();
        $data = [];

        foreach ($profils as $p) {
            $data[] = $this->serializeProfil($p);
        }

        return $this->json($data);
    }

    #[Route('/{id}', methods: ['GET'])]
    public function show(ProfilTouriste $profil): JsonResponse
    {
        return $this->json($this->serializeProfil($profil));
    }

    #[Route('', methods: ['POST'])]
    public function store(Request $req, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($req->getContent(), true);

        $profil = new ProfilTouriste();
        $profil->setBudget($data['budget'] ?? null);
        $profil->setStyleVoyage($data['StyleVoyage'] ?? null);
        $profil->setPreferencesCulturelles($data['preferencesCulturelles'] ?? null);
        $profil->setLocalisationGPS($data['localisationGPS'] ?? null);
        $profil->setHistoriqueRecherches($data['historiqueRecherches'] ?? null);
        $profil->setScoreEco($data['scoreEco'] ?? null);
        $profil->setEmpreinteCarbone($data['empreinteCarbone'] ?? null);

        if (isset($data['idUtilisateur'])) {
            $user = $em->getRepository(Utilisateur::class)->find($data['idUtilisateur']);
            $profil->setIdUtilisateur($user);
        }

        $em->persist($profil);
        $em->flush();

        return $this->json(['message' => 'Profil touriste créé', 'data' => $this->serializeProfil($profil)], 201);
    }

    #[Route('/{id}', methods: ['PUT'])]
    public function update(Request $req, ProfilTouriste $profil, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($req->getContent(), true);

        $profil->setBudget($data['budget'] ?? $profil->getBudget());
        $profil->setStyleVoyage($data['StyleVoyage'] ?? $profil->getStyleVoyage());
        $profil->setPreferencesCulturelles($data['preferencesCulturelles'] ?? $profil->getPreferencesCulturelles());
        $profil->setLocalisationGPS($data['localisationGPS'] ?? $profil->getLocalisationGPS());
        $profil->setHistoriqueRecherches($data['historiqueRecherches'] ?? $profil->getHistoriqueRecherches());
        $profil->setScoreEco($data['scoreEco'] ?? $profil->getScoreEco());
        $profil->setEmpreinteCarbone($data['empreinteCarbone'] ?? $profil->getEmpreinteCarbone());

        if (isset($data['idUtilisateur'])) {
            $user = $em->getRepository(Utilisateur::class)->find($data['idUtilisateur']);
            $profil->setIdUtilisateur($user);
        }

        $em->flush();

        return $this->json(['message' => 'Profil touriste modifié', 'data' => $this->serializeProfil($profil)]);
    }

    #[Route('/{id}', methods: ['DELETE'])]
    public function delete(ProfilTouriste $profil, EntityManagerInterface $em): JsonResponse
    {
        $em->remove($profil);
        $em->flush();

        return $this->json(['message' => 'Profil touriste supprimé']);
    }

    private function serializeProfil(ProfilTouriste $p): array
    {
        return [
            'id' => $p->getId(),
            'budget' => $p->getBudget(),
            'StyleVoyage' => $p->getStyleVoyage(),
            'preferencesCulturelles' => $p->getPreferencesCulturelles(),
            'localisationGPS' => $p->getLocalisationGPS(),
            'historiqueRecherches' => $p->getHistoriqueRecherches(),
            'scoreEco' => $p->getScoreEco(),
            'empreinteCarbone' => $p->getEmpreinteCarbone(),
            'idUtilisateur' => $p->getIdUtilisateur()?->getId(),
        ];
    }
}
