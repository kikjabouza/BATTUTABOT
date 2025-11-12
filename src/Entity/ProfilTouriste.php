<?php

namespace App\Entity;

use App\Repository\ProfilTouristeRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ProfilTouristeRepository::class)]
class ProfilTouriste
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 2, nullable: true)]
    private ?string $budget = null;

    #[ORM\Column(length: 100, nullable: true)]
    private ?string $StyleVoyage = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $preferencesCulturelles = null;

    #[ORM\Column(length: 100, nullable: true)]
    private ?string $localisationGPS = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $historiqueRecherches = null;

    #[ORM\Column(nullable: true)]
    private ?float $scoreEco = null;

    #[ORM\Column(nullable: true)]
    private ?float $empreinteCarbone = null;

    #[ORM\ManyToOne(inversedBy: 'profilTouristes')]
    private ?Utilisateur $idUtilisateur = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getBudget(): ?string
    {
        return $this->budget;
    }

    public function setBudget(?string $budget): static
    {
        $this->budget = $budget;

        return $this;
    }

    public function getStyleVoyage(): ?string
    {
        return $this->StyleVoyage;
    }

    public function setStyleVoyage(?string $StyleVoyage): static
    {
        $this->StyleVoyage = $StyleVoyage;

        return $this;
    }

    public function getPreferencesCulturelles(): ?string
    {
        return $this->preferencesCulturelles;
    }

    public function setPreferencesCulturelles(?string $preferencesCulturelles): static
    {
        $this->preferencesCulturelles = $preferencesCulturelles;

        return $this;
    }

    public function getLocalisationGPS(): ?string
    {
        return $this->localisationGPS;
    }

    public function setLocalisationGPS(?string $localisationGPS): static
    {
        $this->localisationGPS = $localisationGPS;

        return $this;
    }

    public function getHistoriqueRecherches(): ?string
    {
        return $this->historiqueRecherches;
    }

    public function setHistoriqueRecherches(?string $historiqueRecherches): static
    {
        $this->historiqueRecherches = $historiqueRecherches;

        return $this;
    }

    public function getScoreEco(): ?float
    {
        return $this->scoreEco;
    }

    public function setScoreEco(?float $scoreEco): static
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
