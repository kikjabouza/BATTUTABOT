<?php

namespace App\Controller\API\Touriste;

use App\Entity\ContactUrgence;
use App\Entity\Destination;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/contact-urgence')]
class ContactUrgenceController extends AbstractController
{
    #[Route('', methods: ['GET'])]
    public function index(EntityManagerInterface $em): JsonResponse
    {
        $contacts = $em->getRepository(ContactUrgence::class)->findAll();

        $data = [];
        foreach ($contacts as $c) {
            $data[] = [
                'id' => $c->getId(),
                'typeService' => $c->getTypeService(),
                'nom' => $c->getNom(),
                'numeroTelephone' => $c->getNumeroTelephone(),
                'adresse' => $c->getAdresse(),
                'latitude' => $c->getLatitude(),
                'longitude' => $c->getLongitude(),
                'disponible247' => $c->isDisponible247(),
                'languesParlees' => $c->getLanguesParlees(),
                'idDestination' => $c->getIdDestination()?->getId()
            ];
        }

        return $this->json($data);
    }

    #[Route('/{id}', methods: ['GET'])]
    public function show(int $id, EntityManagerInterface $em): JsonResponse
    {
        $c = $em->getRepository(ContactUrgence::class)->find($id);
        if (!$c) {
            return $this->json(['error' => 'Contact non trouvé'], 404);
        }

        return $this->json([
            'id' => $c->getId(),
            'typeService' => $c->getTypeService(),
            'nom' => $c->getNom(),
            'numeroTelephone' => $c->getNumeroTelephone(),
            'adresse' => $c->getAdresse(),
            'latitude' => $c->getLatitude(),
            'longitude' => $c->getLongitude(),
            'disponible247' => $c->isDisponible247(),
            'languesParlees' => $c->getLanguesParlees(),
            'idDestination' => $c->getIdDestination()?->getId()
        ]);
    }

    #[Route('', methods: ['POST'])]
    public function store(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $d = json_decode($request->getContent(), true);

        $c = new ContactUrgence();
        $c->setTypeService($d['typeService']);
        $c->setNom($d['nom']);
        $c->setNumeroTelephone($d['numeroTelephone']);
        $c->setAdresse($d['adresse']);
        $c->setLatitude($d['latitude'] ?? null);
        $c->setLongitude($d['longitude'] ?? null);
        $c->setDisponible247($d['disponible247']);
        $c->setLanguesParlees($d['languesParlees'] ?? null);

        if (!empty($d['idDestination'])) {
            $dest = $em->getRepository(Destination::class)->find($d['idDestination']);
            if (!$dest) return $this->json(['error' => 'Destination invalide'], 400);
            $c->setIdDestination($dest);
        }

        $em->persist($c);
        $em->flush();

        return $this->json(['message' => 'ContactUrgence créé', 'id' => $c->getId()], 201);
    }

    #[Route('/{id}', methods: ['PUT'])]
    public function update(int $id, Request $request, EntityManagerInterface $em): JsonResponse
    {
        $c = $em->getRepository(ContactUrgence::class)->find($id);
        if (!$c) return $this->json(['error' => 'Contact non trouvé'], 404);

        $d = json_decode($request->getContent(), true);

        $c->setTypeService($d['typeService'] ?? $c->getTypeService());
        $c->setNom($d['nom'] ?? $c->getNom());
        $c->setNumeroTelephone($d['numeroTelephone'] ?? $c->getNumeroTelephone());
        $c->setAdresse($d['adresse'] ?? $c->getAdresse());
        $c->setLatitude($d['latitude'] ?? $c->getLatitude());
        $c->setLongitude($d['longitude'] ?? $c->getLongitude());
        $c->setDisponible247($d['disponible247'] ?? $c->isDisponible247());
        $c->setLanguesParlees($d['languesParlees'] ?? $c->getLanguesParlees());

        if (!empty($d['idDestination'])) {
            $dest = $em->getRepository(Destination::class)->find($d['idDestination']);
            if (!$dest) return $this->json(['error' => 'Destination invalide'], 400);
            $c->setIdDestination($dest);
        }

        $em->flush();

        return $this->json(['message' => 'ContactUrgence modifié']);
    }

    #[Route('/{id}', methods: ['DELETE'])]
    public function delete(int $id, EntityManagerInterface $em): JsonResponse
    {
        $c = $em->getRepository(ContactUrgence::class)->find($id);
        if (!$c) return $this->json(['error' => 'Contact non trouvé'], 404);

        $em->remove($c);
        $em->flush();

        return $this->json(['message' => 'ContactUrgence supprimé']);
    }
}
