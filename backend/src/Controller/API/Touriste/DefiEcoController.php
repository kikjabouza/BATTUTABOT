<?php
// src/Controller/API/DefiEcoController.php
namespace App\Controller\API\Touriste;

use App\Entity\DefiEco;
use App\Repository\DefiEcoRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/defis')]
class DefiEcoController extends AbstractController
{
    #[Route('', name: 'defi_list', methods: ['GET'])]
    public function list(DefiEcoRepository $repo, Request $request): JsonResponse
    {
        $page = max(1, (int)$request->query->get('page', 1));
        $limit = max(1, (int)$request->query->get('limit', 20));
        $items = $repo->paginate($page, $limit);

        $data = array_map(function(DefiEco $d){
            return [
                'id' => $d->getId(),
                'titre' => $d->getTitre(),
                'description' => $d->getDescription(),
                'typeDefi' => $d->getTypeDefi(),
                'pointsRecompense' => $d->getPointsRecompense(),
                'valeurCible' => $d->getValeurCible(),
                'unite' => $d->getUnite(),
                'nomBadge' => $d->getNomBadge(),
                'iconeBadge' => $d->getIconeBadge(),
                'estActif' => $d->isEstActif(),
            ];
        }, $items);

        return $this->json(['data' => $data, 'meta' => ['page' => $page, 'limit' => $limit]]);
    }

    #[Route('/{id}', name: 'defi_show', methods: ['GET'])]
    public function show(int $id, DefiEcoRepository $repo): JsonResponse
    {
        $d = $repo->find($id);
        if (!$d) return $this->json(['error' => 'Defi not found'], 404);

        return $this->json(['data' => [
            'id' => $d->getId(),
            'titre' => $d->getTitre(),
            'description' => $d->getDescription(),
            'typeDefi' => $d->getTypeDefi(),
            'pointsRecompense' => $d->getPointsRecompense(),
            'valeurCible' => $d->getValeurCible(),
            'unite' => $d->getUnite(),
            'nomBadge' => $d->getNomBadge(),
            'iconeBadge' => $d->getIconeBadge(),
            'estActif' => $d->isEstActif(),
        ]]);
    }

    #[Route('', name: 'defi_create', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        if (!$data) return $this->json(['error' => 'Invalid JSON'], 400);

        $required = ['titre','description','typeDefi','pointsRecompense','valeurCible','unite','nomBadge'];
        foreach ($required as $f) if (!isset($data[$f])) return $this->json(['error' => "Missing field: $f"], 400);

        $d = new DefiEco();
        $d->setTitre($data['titre']);
        $d->setDescription($data['description']);
        $d->setTypeDefi($data['typeDefi']);
        $d->setPointsRecompense((int)$data['pointsRecompense']);
        $d->setValeurCible((float)$data['valeurCible']);
        $d->setUnite($data['unite']);
        $d->setNomBadge($data['nomBadge']);
        $d->setIconeBadge($data['iconeBadge'] ?? null);
        $d->setEstActif($data['estActif'] ?? true);

        $em->persist($d);
        $em->flush();

        return $this->json(['message' => 'Defi created', 'data' => ['id' => $d->getId()]], 201);
    }

    #[Route('/{id}', name: 'defi_update', methods: ['PUT'])]
    public function update(int $id, Request $request, DefiEcoRepository $repo, EntityManagerInterface $em): JsonResponse
    {
        $d = $repo->find($id);
        if (!$d) return $this->json(['error' => 'Defi not found'], 404);

        $data = json_decode($request->getContent(), true);
        if (!$data) return $this->json(['error' => 'Invalid JSON'], 400);

        if (isset($data['titre'])) $d->setTitre($data['titre']);
        if (isset($data['description'])) $d->setDescription($data['description']);
        if (isset($data['typeDefi'])) $d->setTypeDefi($data['typeDefi']);
        if (isset($data['pointsRecompense'])) $d->setPointsRecompense((int)$data['pointsRecompense']);
        if (isset($data['valeurCible'])) $d->setValeurCible((float)$data['valeurCible']);
        if (isset($data['unite'])) $d->setUnite($data['unite']);
        if (isset($data['nomBadge'])) $d->setNomBadge($data['nomBadge']);
        if (array_key_exists('iconeBadge', $data)) $d->setIconeBadge($data['iconeBadge']);
        if (array_key_exists('estActif', $data)) $d->setEstActif((bool)$data['estActif']);

        $em->flush();
        return $this->json(['message' => 'Defi updated', 'data' => ['id' => $d->getId()]]);
    }

    #[Route('/{id}', name: 'defi_delete', methods: ['DELETE'])]
    public function delete(int $id, DefiEcoRepository $repo, EntityManagerInterface $em): JsonResponse
    {
        $d = $repo->find($id);
        if (!$d) return $this->json(['error' => 'Defi not found'], 404);

        $em->remove($d);
        $em->flush();

        return $this->json(['message' => 'Defi deleted']);
    }
}
