<?php

namespace App\Entity;

use App\Repository\ArtisanRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ArtisanRepository::class)]
class Artisan
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 100)]
    private ?string $typeArtisanat = null;

    #[ORM\Column(length: 255)]
    private ?string $adresseAtelier = null;

    #[ORM\Column(nullable: true)]
    private ?float $latitude = null;

    #[ORM\Column(nullable: true)]
    private ?float $longitude = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $description = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $produits = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $pratiquesEco = null;

    #[ORM\Column(nullable: true, options: ['default' => false])]
    private ?bool $visiteAtelier = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 2)]
    private ?string $prixVisite = null;

    #[ORM\Column(length: 100, nullable: true)]
    private ?string $labelEco = null;

    #[ORM\ManyToOne]
    private ?Utilisateur $idUtilisateur = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTypeArtisanat(): ?string
    {
        return $this->typeArtisanat;
    }

    public function setTypeArtisanat(string $typeArtisanat): static
    {
        $this->typeArtisanat = $typeArtisanat;

        return $this;
    }

    public function getAdresseAtelier(): ?string
    {
        return $this->adresseAtelier;
    }

    public function setAdresseAtelier(string $adresseAtelier): static
    {
        $this->adresseAtelier = $adresseAtelier;

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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getProduits(): ?string
    {
        return $this->produits;
    }

    public function setProduits(string $produits): static
    {
        $this->produits = $produits;

        return $this;
    }

    public function getPratiquesEco(): ?string
    {
        return $this->pratiquesEco;
    }

    public function setPratiquesEco(?string $pratiquesEco): static
    {
        $this->pratiquesEco = $pratiquesEco;

        return $this;
    }

    public function isVisiteAtelier(): ?bool
    {
        return $this->visiteAtelier;
    }

    public function setVisiteAtelier(?bool $visiteAtelier): static
    {
        $this->visiteAtelier = $visiteAtelier;

        return $this;
    }

    public function getPrixVisite(): ?string
    {
        return $this->prixVisite;
    }

    public function setPrixVisite(string $prixVisite): static
    {
        $this->prixVisite = $prixVisite;

        return $this;
    }

    public function getLabelEco(): ?string
    {
        return $this->labelEco;
    }

    public function setLabelEco(?string $labelEco): static
    {
        $this->labelEco = $labelEco;

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
