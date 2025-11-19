<?php

namespace App\Controller\API\Touriste;

use App\Entity\ConversationIa;
use App\Entity\Utilisateur;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/conversations-ia')]
class ConversationIaController extends AbstractController
{
    #[Route('', methods: ['GET'])]
    public function index(EntityManagerInterface $em): JsonResponse
    {
        $rows = $em->getRepository(ConversationIa::class)->findAll();

        $data = [];
        foreach ($rows as $c) {
            $data[] = [
                'id' => $c->getId(),
                'typeConversation' => $c->getTypeConversation(),
                'contexte' => $c->getContexte(),
                'dateDernierMessage' => $c->getDateDernierMessage()?->format('Y-m-d H:i:s'),
                'idUtilisateur' => $c->getIdUtilisateur()?->getId(),
            ];
        }

        return $this->json($data);
    }

    #[Route('/{id}', methods: ['GET'])]
    public function show(int $id, EntityManagerInterface $em): JsonResponse
    {
        $c = $em->getRepository(ConversationIa::class)->find($id);
        if (!$c) return $this->json(['error' => 'Conversation non trouvée'], 404);

        return $this->json([
            'id' => $c->getId(),
            'typeConversation' => $c->getTypeConversation(),
            'contexte' => $c->getContexte(),
            'dateDernierMessage' => $c->getDateDernierMessage()?->format('Y-m-d H:i:s'),
            'idUtilisateur' => $c->getIdUtilisateur()?->getId(),
        ]);
    }

    #[Route('', methods: ['POST'])]
    public function store(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $d = json_decode($request->getContent(), true);

        $conv = new ConversationIa();
        $conv->setTypeConversation($d['typeConversation']);
        $conv->setContexte($d['contexte'] ?? null);

        if (!empty($d['dateDernierMessage'])) {
            $conv->setDateDernierMessage(new \DateTime($d['dateDernierMessage']));
        }

        if (!empty($d['idUtilisateur'])) {
            $user = $em->getRepository(Utilisateur::class)->find($d['idUtilisateur']);
            if (!$user) return $this->json(['error' => 'Utilisateur invalide'], 400);
            $conv->setIdUtilisateur($user);
        }

        $em->persist($conv);
        $em->flush();

        return $this->json(['message' => 'Conversation créée', 'id' => $conv->getId()], 201);
    }

    #[Route('/{id}', methods: ['PUT'])]
    public function update(int $id, Request $request, EntityManagerInterface $em): JsonResponse
    {
        $conv = $em->getRepository(ConversationIa::class)->find($id);
        if (!$conv) return $this->json(['error' => 'Conversation non trouvée'], 404);

        $d = json_decode($request->getContent(), true);

        $conv->setTypeConversation($d['typeConversation'] ?? $conv->getTypeConversation());
        $conv->setContexte($d['contexte'] ?? $conv->getContexte());

        if (!empty($d['dateDernierMessage'])) {
            $conv->setDateDernierMessage(new \DateTime($d['dateDernierMessage']));
        }

        if (!empty($d['idUtilisateur'])) {
            $user = $em->getRepository(Utilisateur::class)->find($d['idUtilisateur']);
            if (!$user) return $this->json(['error' => 'Utilisateur invalide'], 400);
            $conv->setIdUtilisateur($user);
        }

        $em->flush();

        return $this->json(['message' => 'Conversation modifiée']);
    }

    #[Route('/{id}', methods: ['DELETE'])]
    public function delete(int $id, EntityManagerInterface $em): JsonResponse
    {
        $conv = $em->getRepository(ConversationIa::class)->find($id);
        if (!$conv) return $this->json(['error' => 'Conversation non trouvée'], 404);

        $em->remove($conv);
        $em->flush();

        return $this->json(['message' => 'Conversation supprimée']);
    }
}
