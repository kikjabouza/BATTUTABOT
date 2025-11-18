<?php

namespace App\Entity;

use App\Repository\EvenementItineraireRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: EvenementItineraireRepository::class)]
class EvenementItineraire
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $jourNumero = null;

    #[ORM\Column]
    private ?int $ordreEvenement = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTime $heureDebut = null;

    #[ORM\Column(type: Types::TIME_MUTABLE, nullable: true)]
    private ?\DateTime $heureFin = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $notes = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 2)]
    private ?string $coutEstime = null;

    #[ORM\ManyToOne]
    private ?Itineraire $idItineraire = null;

    #[ORM\ManyToOne]
    private ?Activite $idActivite = null;

    #[ORM\ManyToOne]
    private ?Transport $idHebergement = null;

    #[ORM\ManyToOne]
    private ?Transport $idTransport = null;

    #[ORM\ManyToOne]
    private ?Guide $idGuide = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getJourNumero(): ?int
    {
        return $this->jourNumero;
    }

    public function setJourNumero(int $jourNumero): static
    {
        $this->jourNumero = $jourNumero;

        return $this;
    }

    public function getOrdreEvenement(): ?int
    {
        return $this->ordreEvenement;
    }

    public function setOrdreEvenement(int $ordreEvenement): static
    {
        $this->ordreEvenement = $ordreEvenement;

        return $this;
    }

    public function getHeureDebut(): ?\DateTime
    {
        return $this->heureDebut;
    }

    public function setHeureDebut(\DateTime $heureDebut): static
    {
        $this->heureDebut = $heureDebut;

        return $this;
    }

    public function getHeureFin(): ?\DateTime
    {
        return $this->heureFin;
    }

    public function setHeureFin(?\DateTime $heureFin): static
    {
        $this->heureFin = $heureFin;

        return $this;
    }

    public function getNotes(): ?string
    {
        return $this->notes;
    }

    public function setNotes(?string $notes): static
    {
        $this->notes = $notes;

        return $this;
    }

    public function getCoutEstime(): ?string
    {
        return $this->coutEstime;
    }

    public function setCoutEstime(string $coutEstime): static
    {
        $this->coutEstime = $coutEstime;

        return $this;
    }

    public function getIdItineraire(): ?Itineraire
    {
        return $this->idItineraire;
    }

    public function setIdItineraire(?Itineraire $idItineraire): static
    {
        $this->idItineraire = $idItineraire;

        return $this;
    }

    public function getIdActivite(): ?Activite
    {
        return $this->idActivite;
    }

    public function setIdActivite(?Activite $idActivite): static
    {
        $this->idActivite = $idActivite;

        return $this;
    }

    public function getIdHebergement(): ?Transport
    {
        return $this->idHebergement;
    }

    public function setIdHebergement(?Transport $idHebergement): static
    {
        $this->idHebergement = $idHebergement;

        return $this;
    }

    public function getIdTransport(): ?Transport
    {
        return $this->idTransport;
    }

    public function setIdTransport(?Transport $idTransport): static
    {
        $this->idTransport = $idTransport;

        return $this;
    }

    public function getIdGuide(): ?Guide
    {
        return $this->idGuide;
    }

    public function setIdGuide(?Guide $idGuide): static
    {
        $this->idGuide = $idGuide;

        return $this;
    }
}
