<?php

namespace App\Entity;

use App\Repository\MessageIaRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: MessageIaRepository::class)]
class MessageIa
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $texteMessage = null;

    #[ORM\Column(length: 100)]
    private ?string $expediteur = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $modeleIa = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $donneesContexte = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTime $dateCreation = null;

    #[ORM\ManyToOne]
    private ?ConversationIa $idConversation = null;
    
    public function __construct()
    {
        $this->dateCreation = new \DateTime();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTexteMessage(): ?string
    {
        return $this->texteMessage;
    }

    public function setTexteMessage(string $texteMessage): static
    {
        $this->texteMessage = $texteMessage;

        return $this;
    }

    public function getExpediteur(): ?string
    {
        return $this->expediteur;
    }

    public function setExpediteur(string $expediteur): static
    {
        $this->expediteur = $expediteur;

        return $this;
    }

    public function getModeleIa(): ?string
    {
        return $this->modeleIa;
    }

    public function setModeleIa(?string $modeleIa): static
    {
        $this->modeleIa = $modeleIa;

        return $this;
    }

    public function getDonneesContexte(): ?string
    {
        return $this->donneesContexte;
    }

    public function setDonneesContexte(?string $donneesContexte): static
    {
        $this->donneesContexte = $donneesContexte;

        return $this;
    }

    public function getDateCreation(): ?\DateTime
    {
        return $this->dateCreation;
    }

    public function setDateCreation(\DateTime $dateCreation): static
    {
        $this->dateCreation = $dateCreation;

        return $this;
    }

    public function getIdConversation(): ?ConversationIa
    {
        return $this->idConversation;
    }

    public function setIdConversation(?ConversationIa $idConversation): static
    {
        $this->idConversation = $idConversation;

        return $this;
    }
}
