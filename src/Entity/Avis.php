<?php

namespace App\Entity;

use App\Repository\AvisRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: AvisRepository::class)]
class Avis
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 100)]
    private ?string $typeCible = null;

    #[ORM\Column]
    private ?int $idCible = null;

    #[ORM\Column]
    private ?float $note = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $commentaire = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $photos = null;

    #[ORM\Column(options: ['default' => false])]
    private ?bool $estReservationVerifiee = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTime $dateCreation = null;

    #[ORM\ManyToOne]
    private ?Utilisateur $idAuteur = null;

    public function __construct()
    {
        $this->dateCreation = new \DateTime();
    }
    
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTypeCible(): ?string
    {
        return $this->typeCible;
    }

    public function setTypeCible(string $typeCible): static
    {
        $this->typeCible = $typeCible;

        return $this;
    }

    public function getIdCible(): ?int
    {
        return $this->idCible;
    }

    public function setIdCible(int $idCible): static
    {
        $this->idCible = $idCible;

        return $this;
    }

    public function getNote(): ?float
    {
        return $this->note;
    }

    public function setNote(float $note): static
    {
        $this->note = $note;

        return $this;
    }

    public function getCommentaire(): ?string
    {
        return $this->commentaire;
    }

    public function setCommentaire(string $commentaire): static
    {
        $this->commentaire = $commentaire;

        return $this;
    }

    public function getPhotos(): ?string
    {
        return $this->photos;
    }

    public function setPhotos(?string $photos): static
    {
        $this->photos = $photos;

        return $this;
    }

    public function isEstReservationVerifiee(): ?bool
    {
        return $this->estReservationVerifiee;
    }

    public function setEstReservationVerifiee(bool $estReservationVerifiee): static
    {
        $this->estReservationVerifiee = $estReservationVerifiee;

        return $this;
    }

    public function getDateCreation(): ?\DateTime
    {
        return $this->dateCreation;
    }

    public function setDateCreation(\DateTime $dateCreation): static
    {
        $this->dateCreation = $dateCreation;

        return $this;
    }

    public function getIdAuteur(): ?Utilisateur
    {
        return $this->idAuteur;
    }

    public function setIdAuteur(?Utilisateur $idAuteur): static
    {
        $this->idAuteur = $idAuteur;

        return $this;
    }
}
