<?php

namespace App\Controller\API\Touriste;

use App\Entity\MessageIa;
use App\Entity\ConversationIa;
use App\Repository\MessageIaRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/messages-ia')]
class MessageIaController extends AbstractController
{
    #[Route('', methods: ['GET'])]
    public function index(MessageIaRepository $repo): JsonResponse
    {
        $messages = $repo->findAll();
        $data = [];

        foreach ($messages as $m) {
            $data[] = $this->serializeMessage($m);
        }

        return $this->json($data);
    }

    #[Route('/{id}', methods: ['GET'])]
    public function show(MessageIa $message): JsonResponse
    {
        return $this->json($this->serializeMessage($message));
    }

    #[Route('', methods: ['POST'])]
    public function store(Request $req, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($req->getContent(), true);

        $message = new MessageIa();
        $message->setTexteMessage($data['texteMessage']);
        $message->setExpediteur($data['expediteur']);
        $message->setModeleIa($data['modeleIa'] ?? null);
        $message->setDonneesContexte($data['donneesContexte'] ?? null);

        if (isset($data['idConversation'])) {
            $conv = $em->getRepository(ConversationIa::class)->find($data['idConversation']);
            $message->setIdConversation($conv);
        }

        $em->persist($message);
        $em->flush();

        return $this->json(['message' => 'Message IA créé', 'data' => $this->serializeMessage($message)], 201);
    }

    #[Route('/{id}', methods: ['PUT'])]
    public function update(Request $req, MessageIa $message, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($req->getContent(), true);

        $message->setTexteMessage($data['texteMessage'] ?? $message->getTexteMessage());
        $message->setExpediteur($data['expediteur'] ?? $message->getExpediteur());
        $message->setModeleIa($data['modeleIa'] ?? $message->getModeleIa());
        $message->setDonneesContexte($data['donneesContexte'] ?? $message->getDonneesContexte());

        if (isset($data['idConversation'])) {
            $conv = $em->getRepository(ConversationIa::class)->find($data['idConversation']);
            $message->setIdConversation($conv);
        }

        $em->flush();

        return $this->json(['message' => 'Message IA modifié', 'data' => $this->serializeMessage($message)]);
    }

    #[Route('/{id}', methods: ['DELETE'])]
    public function delete(MessageIa $message, EntityManagerInterface $em): JsonResponse
    {
        $em->remove($message);
        $em->flush();

        return $this->json(['message' => 'Message IA supprimé']);
    }

    private function serializeMessage(MessageIa $m): array
    {
        return [
            'id' => $m->getId(),
            'texteMessage' => $m->getTexteMessage(),
            'expediteur' => $m->getExpediteur(),
            'modeleIa' => $m->getModeleIa(),
            'donneesContexte' => $m->getDonneesContexte(),
            'dateCreation' => $m->getDateCreation()?->format('Y-m-d H:i:s'),
            'idConversation' => $m->getIdConversation()?->getId(),
        ];
    }
}
