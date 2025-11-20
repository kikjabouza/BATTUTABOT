<?php
// src/Controller/API/Touriste/ArtisanController.php
namespace App\Controller\API\Touriste;

use App\Entity\Artisan;
use App\Repository\ArtisanRepository;
use App\Repository\UtilisateurRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/artisans')]
class ArtisanController extends AbstractController
{
    #[Route('', name: 'artisan_list', methods: ['GET'])]
    public function list(ArtisanRepository $repo, Request $request): JsonResponse
    {
        $page = max(1, (int)$request->query->get('page', 1));
        $limit = max(1, (int)$request->query->get('limit', 20));
        $search = $request->query->get('q');

        if ($search) {
            $items = $repo->searchByName('typeArtisanat', (string)$search);
        } else {
            $items = $repo->paginate($page, $limit);
        }

        // serialisation simple
        $data = array_map(function (Artisan $a) {
            return [
                'id' => $a->getId(),
                'typeArtisanat' => $a->getTypeArtisanat(),
                'adresseAtelier' => $a->getAdresseAtelier(),
                'latitude' => $a->getLatitude(),
                'longitude' => $a->getLongitude(),
                'description' => $a->getDescription(),
                'produits' => $a->getProduits(),
                'pratiquesEco' => $a->getPratiquesEco(),
                'visiteAtelier' => $a->isVisiteAtelier(),
                'prixVisite' => $a->getPrixVisite(),
                'labelEco' => $a->getLabelEco(),
                'idUtilisateur' => $a->getIdUtilisateur()?->getId(),
            ];
        }, $items);

        return $this->json(['data' => $data, 'meta' => ['page' => $page, 'limit' => $limit]]);
    }

    #[Route('/{id}', name: 'artisan_show', methods: ['GET'])]
    public function show(int $id, ArtisanRepository $repo): JsonResponse
    {
        $a = $repo->find($id);
        if (!$a) return $this->json(['error' => 'Artisan not found'], 404);

        return $this->json(['data' => [
            'id' => $a->getId(),
            'typeArtisanat' => $a->getTypeArtisanat(),
            'adresseAtelier' => $a->getAdresseAtelier(),
            'latitude' => $a->getLatitude(),
            'longitude' => $a->getLongitude(),
            'description' => $a->getDescription(),
            'produits' => $a->getProduits(),
            'pratiquesEco' => $a->getPratiquesEco(),
            'visiteAtelier' => $a->isVisiteAtelier(),
            'prixVisite' => $a->getPrixVisite(),
            'labelEco' => $a->getLabelEco(),
            'idUtilisateur' => $a->getIdUtilisateur()?->getId(),
        ]]);
    }

    #[Route('', name: 'artisan_create', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em, UtilisateurRepository $userRepo): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        if (!$data) return $this->json(['error' => 'Invalid JSON'], 400);

        $required = ['typeArtisanat', 'adresseAtelier', 'description', 'produits', 'prixVisite'];
        foreach ($required as $f) {
            if (!isset($data[$f])) return $this->json(['error' => "Missing field: $f"], 400);
        }

        $artisan = new Artisan();
        $artisan->setTypeArtisanat($data['typeArtisanat']);
        $artisan->setAdresseAtelier($data['adresseAtelier']);
        $artisan->setLatitude($data['latitude'] ?? null);
        $artisan->setLongitude($data['longitude'] ?? null);
        $artisan->setDescription($data['description']);
        $artisan->setProduits($data['produits']);
        $artisan->setPratiquesEco($data['pratiquesEco'] ?? null);
        $artisan->setVisiteAtelier($data['visiteAtelier'] ?? false);
        $artisan->setPrixVisite((string)$data['prixVisite']);
        $artisan->setLabelEco($data['labelEco'] ?? null);

        if (!empty($data['idUtilisateur'])) {
            $u = $userRepo->find($data['idUtilisateur']);
            if (!$u) return $this->json(['error' => 'Utilisateur non trouvé'], 404);
            $artisan->setIdUtilisateur($u);
        }

        $em->persist($artisan);
        $em->flush();

        return $this->json(['message' => 'Artisan created', 'data' => ['id' => $artisan->getId()]], 201);
    }

    #[Route('/{id}', name: 'artisan_update', methods: ['PUT'])]
    public function update(int $id, Request $request, ArtisanRepository $repo, EntityManagerInterface $em, UtilisateurRepository $userRepo): JsonResponse
    {
        $artisan = $repo->find($id);
        if (!$artisan) return $this->json(['error' => 'Artisan not found'], 404);

        $data = json_decode($request->getContent(), true);
        if (!$data) return $this->json(['error' => 'Invalid JSON'], 400);

        if (isset($data['typeArtisanat'])) $artisan->setTypeArtisanat($data['typeArtisanat']);
        if (isset($data['adresseAtelier'])) $artisan->setAdresseAtelier($data['adresseAtelier']);
        if (array_key_exists('latitude', $data)) $artisan->setLatitude($data['latitude']);
        if (array_key_exists('longitude', $data)) $artisan->setLongitude($data['longitude']);
        if (isset($data['description'])) $artisan->setDescription($data['description']);
        if (isset($data['produits'])) $artisan->setProduits($data['produits']);
        if (array_key_exists('pratiquesEco', $data)) $artisan->setPratiquesEco($data['pratiquesEco']);
        if (array_key_exists('visiteAtelier', $data)) $artisan->setVisiteAtelier($data['visiteAtelier']);
        if (isset($data['prixVisite'])) $artisan->setPrixVisite((string)$data['prixVisite']);
        if (array_key_exists('labelEco', $data)) $artisan->setLabelEco($data['labelEco']);

        if (array_key_exists('idUtilisateur', $data)) {
            if ($data['idUtilisateur'] === null) {
                $artisan->setIdUtilisateur(null);
            } else {
                $u = $userRepo->find($data['idUtilisateur']);
                if (!$u) return $this->json(['error' => 'Utilisateur non trouvé'], 404);
                $artisan->setIdUtilisateur($u);
            }
        }

        $em->flush();
        return $this->json(['message' => 'Artisan updated', 'data' => ['id' => $artisan->getId()]]);
    }

    #[Route('/{id}', name: 'artisan_delete', methods: ['DELETE'])]
    public function delete(int $id, ArtisanRepository $repo, EntityManagerInterface $em): JsonResponse
    {
        $artisan = $repo->find($id);
        if (!$artisan) return $this->json(['error' => 'Artisan not found'], 404);

        $em->remove($artisan);
        $em->flush();
        return $this->json(['message' => 'Artisan deleted']);
    }
}
