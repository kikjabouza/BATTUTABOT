<?php
namespace App\Entity;

use App\Repository\PatrimoineCulturelRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PatrimoineCulturelRepository::class)]
class PatrimoineCulturel
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 150)]
    private ?string $titre = null;

    #[ORM\Column(length: 100)]
    private ?string $categorie = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $description = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $contexteHistorique = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $urlMedia = null;

    #[ORM\Column(length: 50, nullable: true)]
    private ?string $typeMedia = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $quizInteractif = null;

    #[ORM\ManyToOne]
    private ?Destination $idDestination = null;

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

    public function getCategorie(): ?string
    {
        return $this->categorie;
    }

    public function setCategorie(string $categorie): static
    {
        $this->categorie = $categorie;

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

    public function getContexteHistorique(): ?string
    {
        return $this->contexteHistorique;
    }

    public function setContexteHistorique(string $contexteHistorique): static
    {
        $this->contexteHistorique = $contexteHistorique;

        return $this;
    }

    public function getUrlMedia(): ?string
    {
        return $this->urlMedia;
    }

    public function setUrlMedia(?string $urlMedia): static
    {
        $this->urlMedia = $urlMedia;

        return $this;
    }

    public function getTypeMedia(): ?string
    {
        return $this->typeMedia;
    }

    public function setTypeMedia(?string $typeMedia): static
    {
        $this->typeMedia = $typeMedia;

        return $this;
    }

    public function getQuizInteractif(): ?string
    {
        return $this->quizInteractif;
    }

    public function setQuizInteractif(?string $quizInteractif): static
    {
        $this->quizInteractif = $quizInteractif;

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
