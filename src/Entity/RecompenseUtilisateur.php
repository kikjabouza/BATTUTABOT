<?php

namespace App\Entity;

use App\Repository\RecompenseUtilisateurRepository;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\DBAL\Types\Types;

#[ORM\Entity(repositoryClass: RecompenseUtilisateurRepository::class)]
class RecompenseUtilisateur
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTime $dateObtention = null;

    #[ORM\Column(options: ['default' => false])]
    private ?bool $estUtilise = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Utilisateur $idUtilisateur = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Recompense $idRecompense = null;

    public function __construct()
    {
        $this->dateCreation = new \DateTime();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDateObtention(): ?\DateTime
    {
        return $this->dateObtention;
    }

    public function setDateObtention(\DateTime $dateObtention): static
    {
        $this->dateObtention = $dateObtention;

        return $this;
    }

    public function isEstUtilise(): ?bool
    {
        return $this->estUtilise;
    }

    public function setEstUtilise(bool $estUtilise): static
    {
        $this->estUtilise = $estUtilise;

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

    public function getIdRecompense(): ?Recompense
    {
        return $this->idRecompense;
    }

    public function setIdRecompense(?Recompense $idRecompense): static
    {
        $this->idRecompense = $idRecompense;

        return $this;
    }
}
