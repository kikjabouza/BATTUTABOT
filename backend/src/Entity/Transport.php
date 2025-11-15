<?php

namespace App\Entity;

use App\Repository\TransportRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TransportRepository::class)]
class Transport
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 100)]
    private ?string $type = null;

    #[ORM\Column(length: 100)]
    private ?string $operateur = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 2)]
    private ?string $prix = null;

    #[ORM\Column(length: 20)]
    private ?string $duree = null;

    #[ORM\Column]
    private ?float $scoreEco = null;

    #[ORM\Column]
    private ?float $emissionCo2 = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $endpointApi = null;

    #[ORM\Column(options: ['default' => true])]
    private ?bool $estActif = null;

    #[ORM\ManyToOne]
    private ?Destination $destinationDepart = null;

    #[ORM\ManyToOne]
    private ?Destination $destinationArrivee = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): static
    {
        $this->type = $type;

        return $this;
    }

    public function getOperateur(): ?string
    {
        return $this->operateur;
    }

    public function setOperateur(string $operateur): static
    {
        $this->operateur = $operateur;

        return $this;
    }

    public function getPrix(): ?string
    {
        return $this->prix;
    }

    public function setPrix(string $prix): static
    {
        $this->prix = $prix;

        return $this;
    }

    public function getDuree(): ?string
    {
        return $this->duree;
    }

    public function setDuree(string $duree): static
    {
        $this->duree = $duree;

        return $this;
    }

    public function getScoreEco(): ?float
    {
        return $this->scoreEco;
    }

    public function setScoreEco(float $scoreEco): static
    {
        $this->scoreEco = $scoreEco;

        return $this;
    }

    public function getEmissionCo2(): ?float
    {
        return $this->emissionCo2;
    }

    public function setEmissionCo2(float $emissionCo2): static
    {
        $this->emissionCo2 = $emissionCo2;

        return $this;
    }

    public function getEndpointApi(): ?string
    {
        return $this->endpointApi;
    }

    public function setEndpointApi(?string $endpointApi): static
    {
        $this->endpointApi = $endpointApi;

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

    public function getDestinationDepart(): ?Destination
    {
        return $this->destinationDepart;
    }

    public function setDestinationDepart(?Destination $destinationDepart): static
    {
        $this->destinationDepart = $destinationDepart;

        return $this;
    }

    public function getDestinationArrivee(): ?Destination
    {
        return $this->destinationArrivee;
    }

    public function setDestinationArrivee(?Destination $destinationArrivee): static
    {
        $this->destinationArrivee = $destinationArrivee;

        return $this;
    }
}
