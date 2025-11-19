<?php

namespace App\Controller\API\Touriste;

use App\Entity\EvenementItineraire;
use App\Entity\Itineraire;
use App\Entity\Activite;
use App\Entity\Transport;
use App\Entity\Guide;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/evenements-itineraire')]
class EvenementItineraireController extends AbstractController
{
    #[Route('', methods: ['GET'])]
    public function index(EntityManagerInterface $em): JsonResponse
    {
        $rows = $em->getRepository(EvenementItineraire::class)->findAll();

        $data = [];
        foreach ($rows as $e) {
            $data[] = [
                'id' => $e->getId(),
                'jourNumero' => $e->getJourNumero(),
                'ordreEvenement' => $e->getOrdreEvenement(),
                'heureDebut' => $e->getHeureDebut()?->format('Y-m-d'),
                'heureFin' => $e->getHeureFin()?->format('H:i:s'),
                'notes' => $e->getNotes(),
                'coutEstime' => $e->getCoutEstime(),
                'idItineraire' => $e->getIdItineraire()?->getId(),
                'idActivite' => $e->getIdActivite()?->getId(),
                'idHebergement' => $e->getIdHebergement()?->getId(),
                'idTransport' => $e->getIdTransport()?->getId(),
                'idGuide' => $e->getIdGuide()?->getId()
            ];
        }

        return $this->json($data);
    }

    #[Route('/{id}', methods: ['GET'])]
    public function show(int $id, EntityManagerInterface $em): JsonResponse
    {
        $e = $em->getRepository(EvenementItineraire::class)->find($id);
        if (!$e) return $this->json(['error' => 'Événement itinéraire non trouvé'], 404);

        return $this->json([
            'id' => $e->getId(),
            'jourNumero' => $e->getJourNumero(),
            'ordreEvenement' => $e->getOrdreEvenement(),
            'heureDebut' => $e->getHeureDebut()?->format('Y-m-d'),
            'heureFin' => $e->getHeureFin()?->format('H:i:s'),
            'notes' => $e->getNotes(),
            'coutEstime' => $e->getCoutEstime(),
            'idItineraire' => $e->getIdItineraire()?->getId(),
            'idActivite' => $e->getIdActivite()?->getId(),
            'idHebergement' => $e->getIdHebergement()?->getId(),
            'idTransport' => $e->getIdTransport()?->getId(),
            'idGuide' => $e->getIdGuide()?->getId()
        ]);
    }

    #[Route('', methods: ['POST'])]
    public function store(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $d = json_decode($request->getContent(), true);
        $e = new EvenementItineraire();

        $e->setJourNumero($d['jourNumero']);
        $e->setOrdreEvenement($d['ordreEvenement']);
        $e->setHeureDebut(new \DateTime($d['heureDebut']));

        if (!empty($d['heureFin'])) {
            $e->setHeureFin(new \DateTime($d['heureFin']));
        }

        $e->setNotes($d['notes'] ?? null);
        $e->setCoutEstime($d['coutEstime']);

        if (!empty($d['idItineraire'])) {
            $it = $em->getRepository(Itineraire::class)->find($d['idItineraire']);
            if (!$it) return $this->json(['error' => 'Itinéraire invalide'], 400);
            $e->setIdItineraire($it);
        }

        if (!empty($d['idActivite'])) {
            $ac = $em->getRepository(Activite::class)->find($d['idActivite']);
            if (!$ac) return $this->json(['error' => 'Activité invalide'], 400);
            $e->setIdActivite($ac);
        }

        if (!empty($d['idHebergement'])) {
            $hb = $em->getRepository(Transport::class)->find($d['idHebergement']);
            if (!$hb) return $this->json(['error' => 'Hebergement invalide'], 400);
            $e->setIdHebergement($hb);
        }

        if (!empty($d['idTransport'])) {
            $tr = $em->getRepository(Transport::class)->find($d['idTransport']);
            if (!$tr) return $this->json(['error' => 'Transport invalide'], 400);
            $e->setIdTransport($tr);
        }

        if (!empty($d['idGuide'])) {
            $g = $em->getRepository(Guide::class)->find($d['idGuide']);
            if (!$g) return $this->json(['error' => 'Guide invalide'], 400);
            $e->setIdGuide($g);
        }

        $em->persist($e);
        $em->flush();

        return $this->json(['message' => 'Créé', 'id' => $e->getId()], 201);
    }

    #[Route('/{id}', methods: ['PUT'])]
    public function update(int $id, Request $request, EntityManagerInterface $em): JsonResponse
    {
        $e = $em->getRepository(EvenementItineraire::class)->find($id);
        if (!$e) return $this->json(['error' => 'Événement itinéraire non trouvé'], 404);

        $d = json_decode($request->getContent(), true);

        $e->setJourNumero($d['jourNumero'] ?? $e->getJourNumero());
        $e->setOrdreEvenement($d['ordreEvenement'] ?? $e->getOrdreEvenement());

        if (!empty($d['heureDebut'])) $e->setHeureDebut(new \DateTime($d['heureDebut']));
        if (!empty($d['heureFin'])) $e->setHeureFin(new \DateTime($d['heureFin']));

        $e->setNotes($d['notes'] ?? $e->getNotes());
        $e->setCoutEstime($d['coutEstime'] ?? $e->getCoutEstime());

        foreach ([
            'idItineraire' => Itineraire::class,
            'idActivite' => Activite::class,
            'idHebergement' => Transport::class,
            'idTransport' => Transport::class,
            'idGuide' => Guide::class
        ] as $field => $class) {
            if (!empty($d[$field])) {
                $obj = $em->getRepository($class)->find($d[$field]);
                if (!$obj) return $this->json(['error' => "$field invalide"], 400);
                $setter = 'set' . ucfirst($field);
                $e->$setter($obj);
            }
        }

        $em->flush();

        return $this->json(['message' => 'Modifié']);
    }

    #[Route('/{id}', methods: ['DELETE'])]
    public function delete(int $id, EntityManagerInterface $em): JsonResponse
    {
        $e = $em->getRepository(EvenementItineraire::class)->find($id);
        if (!$e) return $this->json(['error' => 'Non trouvé'], 404);

        $em->remove($e);
        $em->flush();

        return $this->json(['message' => 'Supprimé']);
    }
}
