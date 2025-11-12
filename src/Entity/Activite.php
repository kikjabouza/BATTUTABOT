<?php

namespace App\Entity;

use App\Repository\ActiviteRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ActiviteRepository::class)]
class Activite
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 150)]
    private ?string $nom = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $descritption = null;

    #[ORM\Column(length: 100, nullable: true)]
    private ?string $type = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $adresse = null;

    #[ORM\Column(nullable: true)]
    private ?float $latitude = null;

    #[ORM\Column(nullable: true)]
    private ?float $longitude = null;

    #[ORM\Column(length: 100, nullable: true)]
    private ?string $gammePrix = null;

    #[ORM\Column(length: 100, nullable: true)]
    private ?string $duree = null;

    #[ORM\Column(options: ['default' => false])]
    private ?bool $ecoFriendly = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $accessibilite = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $horaires = null;

    #[ORM\ManyToOne]
    private ?Destination $idDestination = null;

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

    public function getDescritption(): ?string
    {
        return $this->descritption;
    }

    public function setDescritption(?string $descritption): static
    {
        $this->descritption = $descritption;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(?string $type): static
    {
        $this->type = $type;

        return $this;
    }

    public function getAdresse(): ?string
    {
        return $this->adresse;
    }

    public function setAdresse(?string $adresse): static
    {
        $this->adresse = $adresse;

        return $this;
    }

    public function getLatitude(): ?float
    {
        return $this->latitude;
    }

    public function setLatitude(?float $latitude): static
    {
        $this->latitude = $latitude;

        return $this;
    }

    public function getLongitude(): ?float
    {
        return $this->longitude;
    }

    public function setLongitude(?float $longitude): static
    {
        $this->longitude = $longitude;

        return $this;
    }

    public function getGammePrix(): ?string
    {
        return $this->gammePrix;
    }

    public function setGammePrix(?string $gammePrix): static
    {
        $this->gammePrix = $gammePrix;

        return $this;
    }

    public function getDuree(): ?string
    {
        return $this->duree;
    }

    public function setDuree(?string $duree): static
    {
        $this->duree = $duree;

        return $this;
    }

    public function isEcoFriendly(): ?bool
    {
        return $this->ecoFriendly;
    }

    public function setEcoFriendly(bool $ecoFriendly): static
    {
        $this->ecoFriendly = $ecoFriendly;

        return $this;
    }

    public function getAccessibilite(): ?string
    {
        return $this->accessibilite;
    }

    public function setAccessibilite(?string $accessibilite): static
    {
        $this->accessibilite = $accessibilite;

        return $this;
    }

    public function getHoraires(): ?string
    {
        return $this->horaires;
    }

    public function setHoraires(?string $horaires): static
    {
        $this->horaires = $horaires;

        return $this;
    }

    public function getIdDestination(): ?Destination
    {
        return $this->idDestination;
    }

    public function setIdDestination(?Destination $idDestination): static
    {
        $this->idDestination = $idDestination;

        return $this;
    }
}
