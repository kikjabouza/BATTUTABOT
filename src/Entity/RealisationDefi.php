<?php

namespace App\Entity;

use App\Repository\RealisationDefiRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: RealisationDefiRepository::class)]
class RealisationDefi
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?float $progresValeur = null;

    #[ORM\Column(options: ['default' => false])]
    private ?bool $estTermine = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTime $dateTerminaison = null;

    #[ORM\Column]
    private ?int $pointsGagnes = null;

    #[ORM\ManyToOne]
    private ?Utilisateur $idUtilisateur = null;

    #[ORM\ManyToOne]
    private ?DefiEco $idDefi = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getProgresValeur(): ?float
    {
        return $this->progresValeur;
    }

    public function setProgresValeur(float $progresValeur): static
    {
        $this->progresValeur = $progresValeur;

        return $this;
    }

    public function isEstTermine(): ?bool
    {
        return $this->estTermine;
    }

    public function setEstTermine(bool $estTermine): static
    {
        $this->estTermine = $estTermine;

        return $this;
    }

    public function getDateTerminaison(): ?\DateTime
    {
        return $this->dateTerminaison;
    }

    public function setDateTerminaison(?\DateTime $dateTerminaison): static
    {
        $this->dateTerminaison = $dateTerminaison;

        return $this;
    }

    public function getPointsGagnes(): ?int
    {
        return $this->pointsGagnes;
    }

    public function setPointsGagnes(int $pointsGagnes): static
    {
        $this->pointsGagnes = $pointsGagnes;

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

    public function getIdDefi(): ?DefiEco
    {
        return $this->idDefi;
    }

    public function setIdDefi(?DefiEco $idDefi): static
    {
        $this->idDefi = $idDefi;

        return $this;
    }
}
