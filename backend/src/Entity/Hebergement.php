<?php

namespace App\Entity;

use App\Repository\HebergementRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: HebergementRepository::class)]
class Hebergement
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 150)]
    private ?string $nom = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $description = null;

    #[ORM\Column(length: 100, nullable: true)]
    private ?string $type = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $adresse = null;

    #[ORM\Column(nullable: true)]
    private ?float $latitude = null;

    #[ORM\Column(nullable: true)]
    private ?float $longitude = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 2)]
    private ?string $prixNuit = null;

    #[ORM\Column]
    private ?int $capacite = null;

    #[ORM\Column(nullable: true, options: ['default' => false])]
    private ?bool $ecoCertifie = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $caracteristiquesEco = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $equipements = null;

    #[ORM\Column(options: ['default' => false])]
    private ?bool $estVerifie = null;

    #[ORM\ManyToOne]
    private ?Utilisateur $idProprietaire = null;

    #[ORM\ManyToOne(inversedBy: 'hebergements')]
    #[ORM\JoinColumn(nullable: false)]
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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

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

    public function getPrixNuit(): ?string
    {
        return $this->prixNuit;
    }

    public function setPrixNuit(string $prixNuit): static
    {
        $this->prixNuit = $prixNuit;

        return $this;
    }

    public function getCapacite(): ?int
    {
        return $this->capacite;
    }

    public function setCapacite(int $capacite): static
    {
        $this->capacite = $capacite;

        return $this;
    }

    public function isEcoCertifie(): ?bool
    {
        return $this->ecoCertifie;
    }

    public function setEcoCertifie(?bool $ecoCertifie): static
    {
        $this->ecoCertifie = $ecoCertifie;

        return $this;
    }

    public function getCaracteristiquesEco(): ?string
    {
        return $this->caracteristiquesEco;
    }

    public function setCaracteristiquesEco(?string $caracteristiquesEco): static
    {
        $this->caracteristiquesEco = $caracteristiquesEco;

        return $this;
    }

    public function getEquipements(): ?string
    {
        return $this->equipements;
    }

    public function setEquipements(?string $equipements): static
    {
        $this->equipements = $equipements;

        return $this;
    }

    public function isEstVerifie(): ?bool
    {
        return $this->estVerifie;
    }

    public function setEstVerifie(bool $estVerifie): static
    {
        $this->estVerifie = $estVerifie;

        return $this;
    }

    public function getIdProprietaire(): ?Utilisateur
    {
        return $this->idProprietaire;
    }

    public function setIdProprietaire(?Utilisateur $idProprietaire): static
    {
        $this->idProprietaire = $idProprietaire;

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
