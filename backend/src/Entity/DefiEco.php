<?php

namespace App\Entity;

use App\Repository\DefiEcoRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: DefiEcoRepository::class)]
class DefiEco
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 150)]
    private ?string $titre = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $description = null;

    #[ORM\Column(length: 100)]
    private ?string $typeDefi = null;

    #[ORM\Column]
    private ?int $pointsRecompense = null;

    #[ORM\Column]
    private ?float $valeurCible = null;

    #[ORM\Column(length: 50)]
    private ?string $unite = null;

    #[ORM\Column(length: 100)]
    private ?string $nomBadge = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $iconeBadge = null;

    #[ORM\Column(options: ['default' => true])]
    private ?bool $estActif = null;

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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getTypeDefi(): ?string
    {
        return $this->typeDefi;
    }

    public function setTypeDefi(string $typeDefi): static
    {
        $this->typeDefi = $typeDefi;

        return $this;
    }

    public function getPointsRecompense(): ?int
    {
        return $this->pointsRecompense;
    }

    public function setPointsRecompense(int $pointsRecompense): static
    {
        $this->pointsRecompense = $pointsRecompense;

        return $this;
    }

    public function getValeurCible(): ?float
    {
        return $this->valeurCible;
    }

    public function setValeurCible(float $valeurCible): static
    {
        $this->valeurCible = $valeurCible;

        return $this;
    }

    public function getUnite(): ?string
    {
        return $this->unite;
    }

    public function setUnite(string $unite): static
    {
        $this->unite = $unite;

        return $this;
    }

    public function getNomBadge(): ?string
    {
        return $this->nomBadge;
    }

    public function setNomBadge(string $nomBadge): static
    {
        $this->nomBadge = $nomBadge;

        return $this;
    }

    public function getIconeBadge(): ?string
    {
        return $this->iconeBadge;
    }

    public function setIconeBadge(?string $iconeBadge): static
    {
        $this->iconeBadge = $iconeBadge;

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
}
