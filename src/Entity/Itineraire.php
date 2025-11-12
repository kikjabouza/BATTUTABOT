<?php

namespace App\Entity;

use App\Repository\ItineraireRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ItineraireRepository::class)]
class Itineraire
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 150)]
    private ?string $titre = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTime $dateDebut = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTime $dateFin = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 2)]
    private ?string $budgetTotal = null;

    #[ORM\Column(length: 100)]
    private ?string $statut = null;

    #[ORM\Column]
    private ?float $scoreEco = null;

    #[ORM\Column(nullable: true)]
    private ?float $empreinteCarbone = null;

    #[ORM\Column(options: ['default' => false])]
    private ?bool $genereIA = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $planDetaille = null;

    #[ORM\ManyToOne]
    private ?Utilisateur $relation = null;

    #[ORM\ManyToOne]
    private ?Destination $idDestination = null;

    #[ORM\ManyToOne(inversedBy: 'itineraires')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Utilisateur $idTouriste = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitre(): ?string
    {
        return $this->titre;
    }

    public function setTitre(string $titre): static
    {
        $this->titre = $titre;

        return $this;
    }

    public function getDateDebut(): ?\DateTime
    {
        return $this->dateDebut;
    }

    public function setDateDebut(\DateTime $dateDebut): static
    {
        $this->dateDebut = $dateDebut;

        return $this;
    }

    public function getDateFin(): ?\DateTime
    {
        return $this->dateFin;
    }

    public function setDateFin(\DateTime $dateFin): static
    {
        $this->dateFin = $dateFin;

        return $this;
    }

    public function getBudgetTotal(): ?string
    {
        return $this->budgetTotal;
    }

    public function setBudgetTotal(string $budgetTotal): static
    {
        $this->budgetTotal = $budgetTotal;

        return $this;
    }

    public function getStatut(): ?string
    {
        return $this->statut;
    }

    public function setStatut(string $statut): static
    {
        $this->statut = $statut;

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

    public function getEmpreinteCarbone(): ?float
    {
        return $this->empreinteCarbone;
    }

    public function setEmpreinteCarbone(?float $empreinteCarbone): static
    {
        $this->empreinteCarbone = $empreinteCarbone;

        return $this;
    }

    public function isGenereIA(): ?bool
    {
        return $this->genereIA;
    }

    public function setGenereIA(bool $genereIA): static
    {
        $this->genereIA = $genereIA;

        return $this;
    }

    public function getPlanDetaille(): ?string
    {
        return $this->planDetaille;
    }

    public function setPlanDetaille(string $planDetaille): static
    {
        $this->planDetaille = $planDetaille;

        return $this;
    }

    public function getRelation(): ?Utilisateur
    {
        return $this->relation;
    }

    public function setRelation(?Utilisateur $relation): static
    {
        $this->relation = $relation;

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

    public function getIdTouriste(): ?Utilisateur
    {
        return $this->idTouriste;
    }

    public function setIdTouriste(?Utilisateur $idTouriste): static
    {
        $this->idTouriste = $idTouriste;

        return $this;
    }
}
