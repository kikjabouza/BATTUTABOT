<?php
// src/Controller/API/AvisController.php
namespace App\Controller\API\Touriste;

use App\Entity\Avis;
use App\Repository\AvisRepository;
use App\Repository\UtilisateurRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/avis')]
class AvisController extends AbstractController
{
    #[Route('', name: 'avis_list', methods: ['GET'])]
    public function list(AvisRepository $repo, Request $request): JsonResponse
    {
        $page = max(1, (int)$request->query->get('page', 1));
        $limit = max(1, (int)$request->query->get('limit', 20));
        $items = $repo->paginate($page, $limit);

        $data = array_map(function(Avis $a) {
            return [
                'id' => $a->getId(),
                'typeCible' => $a->getTypeCible(),
                'idCible' => $a->getIdCible(),
                'note' => $a->getNote(),
                'commentaire' => $a->getCommentaire(),
                'photos' => $a->getPhotos(),
                'estReservationVerifiee' => $a->isEstReservationVerifiee(),
                'dateCreation' => $a->getDateCreation()?->format('c'),
                'idAuteur' => $a->getIdAuteur()?->getId(),
            ];
        }, $items);

        return $this->json(['data' => $data, 'meta' => ['page' => $page, 'limit' => $limit]]);
    }

    #[Route('/{id}', name: 'avis_show', methods: ['GET'])]
    public function show(int $id, AvisRepository $repo): JsonResponse
    {
        $a = $repo->find($id);
        if (!$a) return $this->json(['error' => 'Avis not found'], 404);

        return $this->json(['data' => [
            'id' => $a->getId(),
            'typeCible' => $a->getTypeCible(),
            'idCible' => $a->getIdCible(),
            'note' => $a->getNote(),
            'commentaire' => $a->getCommentaire(),
            'photos' => $a->getPhotos(),
            'estReservationVerifiee' => $a->isEstReservationVerifiee(),
            'dateCreation' => $a->getDateCreation()?->format('c'),
            'idAuteur' => $a->getIdAuteur()?->getId(),
        ]]);
    }

    #[Route('', name: 'avis_create', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em, UtilisateurRepository $userRepo): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        if (!$data) return $this->json(['error' => 'Invalid JSON'], 400);

        $required = ['typeCible','idCible','note','commentaire','idAuteur'];
        foreach ($required as $f) {
            if (!isset($data[$f])) return $this->json(['error' => "Missing field: $f"], 400);
        }

        $a = new Avis();
        $a->setTypeCible($data['typeCible']);
        $a->setIdCible((int)$data['idCible']);
        $a->setNote((float)$data['note']);
        $a->setCommentaire($data['commentaire']);
        $a->setPhotos($data['photos'] ?? null);
        $a->setEstReservationVerifiee($data['estReservationVerifiee'] ?? false);
        // dateCreation set dans le constructeur de l'entité

        $u = $userRepo->find($data['idAuteur']);
        if (!$u) return $this->json(['error' => 'Auteur non trouvé'], 404);
        $a->setIdAuteur($u);

        $em->persist($a);
        $em->flush();

        return $this->json(['message' => 'Avis created', 'data' => ['id' => $a->getId()]], 201);
    }

    #[Route('/{id}', name: 'avis_update', methods: ['PUT'])]
    public function update(int $id, Request $request, AvisRepository $repo, EntityManagerInterface $em, UtilisateurRepository $userRepo): JsonResponse
    {
        $a = $repo->find($id);
        if (!$a) return $this->json(['error' => 'Avis not found'], 404);

        $data = json_decode($request->getContent(), true);
        if (!$data) return $this->json(['error' => 'Invalid JSON'], 400);

        if (isset($data['typeCible'])) $a->setTypeCible($data['typeCible']);
        if (isset($data['idCible'])) $a->setIdCible((int)$data['idCible']);
        if (isset($data['note'])) $a->setNote((float)$data['note']);
        if (isset($data['commentaire'])) $a->setCommentaire($data['commentaire']);
        if (array_key_exists('photos', $data)) $a->setPhotos($data['photos']);
        if (array_key_exists('estReservationVerifiee', $data)) $a->setEstReservationVerifiee((bool)$data['estReservationVerifiee']);

        if (array_key_exists('idAuteur', $data)) {
            $u = $userRepo->find($data['idAuteur']);
            if (!$u) return $this->json(['error' => 'Auteur non trouvé'], 404);
            $a->setIdAuteur($u);
        }

        $em->flush();
        return $this->json(['message' => 'Avis updated', 'data' => ['id' => $a->getId()]]);
    }

    #[Route('/{id}', name: 'avis_delete', methods: ['DELETE'])]
    public function delete(int $id, AvisRepository $repo, EntityManagerInterface $em): JsonResponse
    {
        $a = $repo->find($id);
        if (!$a) return $this->json(['error' => 'Avis not found'], 404);

        $em->remove($a);
        $em->flush();

        return $this->json(['message' => 'Avis deleted']);
    }
}
