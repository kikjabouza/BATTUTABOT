<?php

namespace App\Entity;

use App\Repository\ConversationIaRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ConversationIaRepository::class)]
class ConversationIa
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 100)]
    private ?string $typeConversation = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $contexte = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTime $dateDernierMessage = null;

    #[ORM\ManyToOne]
    private ?Utilisateur $idUtilisateur = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTypeConversation(): ?string
    {
        return $this->typeConversation;
    }

    public function setTypeConversation(string $typeConversation): static
    {
        $this->typeConversation = $typeConversation;

        return $this;
    }

    public function getContexte(): ?string
    {
        return $this->contexte;
    }

    public function setContexte(?string $contexte): static
    {
        $this->contexte = $contexte;

        return $this;
    }

    public function getDateDernierMessage(): ?\DateTime
    {
        return $this->dateDernierMessage;
    }

    public function setDateDernierMessage(?\DateTime $dateDernierMessage): static
    {
        $this->dateDernierMessage = $dateDernierMessage;

        return $this;
    }

    public function getIdUtilisateur(): ?Utilisateur
    {
        return $this->idUtilisateur;
    }

    public function setIdUtilisateur(?Utilisateur $idUtilisateur): static
    {
        $this->idUtilisateur = $idUtilisateur;

        return $this;
    }
}
