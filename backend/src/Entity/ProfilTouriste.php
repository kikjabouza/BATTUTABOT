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
    private ?string $styleVoyage = null; // Correction: styleVoyage au lieu de StyleVoyage

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

    #[ORM\Column(length: 20, options: ['default' => 'moyen'])]
    private ?string $niveauEconomique = 'moyen';

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
        return $this->styleVoyage;
    }

    public function setStyleVoyage(?string $styleVoyage): static
    {
        $this->styleVoyage = $styleVoyage;

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

    public function getNiveauEconomique(): ?string
    {
        return $this->niveauEconomique;
    }

    public function setNiveauEconomique(string $niveauEconomique): static
    {
        $niveauxValides = ['eco', 'moyen', 'confort', 'luxe'];
        
        if (!in_array($niveauEconomique, $niveauxValides)) {
            throw new \InvalidArgumentException('Niveau économique invalide. Valeurs acceptées: ' . implode(', ', $niveauxValides));
        }
        
        $this->niveauEconomique = $niveauEconomique;
        return $this;
    }

    /**
     * Méthode utilitaire pour déterminer automatiquement le niveau économique basé sur le budget
     */
    public function determinerNiveauEconomiqueAuto(): void
    {
        if (!$this->budget) {
            $this->niveauEconomique = 'moyen';
            return;
        }

        $budget = (float) $this->budget;
        
        if ($budget <= 50) {
            $this->niveauEconomique = 'eco';
        } elseif ($budget <= 100) {
            $this->niveauEconomique = 'moyen';
        } elseif ($budget <= 200) {
            $this->niveauEconomique = 'confort';
        } else {
            $this->niveauEconomique = 'luxe';
        }
    }
}