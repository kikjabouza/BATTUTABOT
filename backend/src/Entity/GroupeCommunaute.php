<?php

namespace App\Entity;

use App\Repository\GroupeCommunauteRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: GroupeCommunauteRepository::class)]
class GroupeCommunaute
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 150)]
    private ?string $nom = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $description = null;

    #[ORM\Column(length: 100)]
    private ?string $typeInteret = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $urlWhatsapp = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $urlTelegram = null;

    #[ORM\Column(options: ['default' => true])]
    private ?bool $estActif = null;

    #[ORM\Column(nullable: true)]
    private ?int $membreMax = null;

    #[ORM\ManyToOne]
    private ?Destination $isDestination = null;

    #[ORM\ManyToOne]
    private ?Utilisateur $idCreateur = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): static
    {
        $this->nom = $nom;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getTypeInteret(): ?string
    {
        return $this->typeInteret;
    }

    public function setTypeInteret(string $typeInteret): static
    {
        $this->typeInteret = $typeInteret;

        return $this;
    }

    public function getUrlWhatsapp(): ?string
    {
        return $this->urlWhatsapp;
    }

    public function setUrlWhatsapp(?string $urlWhatsapp): static
    {
        $this->urlWhatsapp = $urlWhatsapp;

        return $this;
    }

    public function getUrlTelegram(): ?string
    {
        return $this->urlTelegram;
    }

    public function setUrlTelegram(?string $urlTelegram): static
    {
        $this->urlTelegram = $urlTelegram;

        return $this;
    }

    public function isEstActif(): ?bool
    {
        return $this->estActif;
    }

    public function setEstActif(bool $estActif): static
    {
        $this->estActif = $estActif;

        return $this;
    }

    public function getMembreMax(): ?int
    {
        return $this->membreMax;
    }

    public function setMembreMax(?int $membreMax): static
    {
        $this->membreMax = $membreMax;

        return $this;
    }

    public function getIsDestination(): ?Destination
    {
        return $this->isDestination;
    }

    public function setIsDestination(?Destination $isDestination): static
    {
        $this->isDestination = $isDestination;

        return $this;
    }

    public function getIdCreateur(): ?Utilisateur
    {
        return $this->idCreateur;
    }

    public function setIdCreateur(?Utilisateur $idCreateur): static
    {
        $this->idCreateur = $idCreateur;

        return $this;
    }
}
