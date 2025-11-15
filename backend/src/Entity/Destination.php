<?php

namespace App\Entity;

use App\Repository\DestinationRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: DestinationRepository::class)]
class Destination
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 150, unique: true)]
    private ?string $nom = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $description = null;

    #[ORM\Column(length: 255)]
    private ?string $region = null;

    #[ORM\Column(nullable: true)]
    private ?float $latitude = null;

    #[ORM\Column(nullable: true)]
    private ?float $longitude = null;

    #[ORM\Column(length: 100, nullable: true)]
    private ?string $climat = null;

    #[ORM\Column(length: 100, nullable: true)]
    private ?string $meilleureSaison = null;

    #[ORM\Column(nullable: true)]
    private ?float $scoreEco = null;

    /**
     * @var Collection<int, Hebergement>
     */
    #[ORM\OneToMany(targetEntity: Hebergement::class, mappedBy: 'idDestination')]
    private Collection $hebergements;

    public function __construct()
    {
        $this->hebergements = new ArrayCollection();
    }

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

    public function getRegion(): ?string
    {
        return $this->region;
    }

    public function setRegion(string $region): static
    {
        $this->region = $region;

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

    public function getClimat(): ?string
    {
        return $this->climat;
    }

    public function setClimat(?string $climat): static
    {
        $this->climat = $climat;

        return $this;
    }

    public function getMeilleureSaison(): ?string
    {
        return $this->meilleureSaison;
    }

    public function setMeilleureSaison(?string $meilleureSaison): static
    {
        $this->meilleureSaison = $meilleureSaison;

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

    /**
     * @return Collection<int, Hebergement>
     */
    public function getHebergements(): Collection
    {
        return $this->hebergements;
    }

    public function addHebergement(Hebergement $hebergement): static
    {
        if (!$this->hebergements->contains($hebergement)) {
            $this->hebergements->add($hebergement);
            $hebergement->setIdDestination($this);
        }

        return $this;
    }

    public function removeHebergement(Hebergement $hebergement): static
    {
        if ($this->hebergements->removeElement($hebergement)) {
            // set the owning side to null (unless already changed)
            if ($hebergement->getIdDestination() === $this) {
                $hebergement->setIdDestination(null);
            }
        }

        return $this;
    }
}
