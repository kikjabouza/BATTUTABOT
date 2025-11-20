<?php

namespace App\Entity;

use App\Repository\GuideRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Ignore;

#[ORM\Entity(repositoryClass: GuideRepository::class)]
class Guide
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $specialisations = null;

    #[ORM\Column(length: 255)]
    private ?string $languesParlees = null;

    #[ORM\Column]
    private ?int $experienceAnnees = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 2)]
    private ?string $tarifHoraire = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $certification = null;

    #[ORM\Column(options: ['default' => false])]
    private ?bool $accessibiliteHandicap = false;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $disponibilities = null;

    #[ORM\Column(nullable: true, options: ['default' => 0.0])]
    private ?float $noteMoyenne = 0.0;

    #[ORM\Column(nullable: true, options: ['default' => 0])]
    private ?int $totalAvis = 0;

    #[ORM\Column(options: ['default' => false])]
    private ?bool $estCertifie = false;

    #[ORM\ManyToOne(targetEntity: Utilisateur::class)]
    #[ORM\JoinColumn(name: 'utilisateur_id', referencedColumnName: 'id', nullable: false)]
    #[Ignore] // ⭐ AJOUTEZ CETTE LIGNE
    private ?Utilisateur $utilisateur = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSpecialisations(): ?string
    {
        return $this->specialisations;
    }

    public function setSpecialisations(string $specialisations): static
    {
        $this->specialisations = $specialisations;

        return $this;
    }

    public function getLanguesParlees(): ?string
    {
        return $this->languesParlees;
    }

    public function setLanguesParlees(string $languesParlees): static
    {
        $this->languesParlees = $languesParlees;

        return $this;
    }

    public function getExperienceAnnees(): ?int
    {
        return $this->experienceAnnees;
    }

    public function setExperienceAnnees(int $experienceAnnees): static
    {
        $this->experienceAnnees = $experienceAnnees;

        return $this;
    }

    public function getTarifHoraire(): ?string
    {
        return $this->tarifHoraire;
    }

    public function setTarifHoraire(string $tarifHoraire): static
    {
        $this->tarifHoraire = $tarifHoraire;

        return $this;
    }

    public function getCertification(): ?string
    {
        return $this->certification;
    }

    public function setCertification(?string $certification): static
    {
        $this->certification = $certification;

        return $this;
    }

    public function isAccessibiliteHandicap(): ?bool
    {
        return $this->accessibiliteHandicap;
    }

    public function setAccessibiliteHandicap(bool $accessibiliteHandicap): static
    {
        $this->accessibiliteHandicap = $accessibiliteHandicap;

        return $this;
    }

    public function getDisponibilities(): ?string
    {
        return $this->disponibilities;
    }

    public function setDisponibilities(string $disponibilities): static
    {
        $this->disponibilities = $disponibilities;

        return $this;
    }

    public function getNoteMoyenne(): ?float
    {
        return $this->noteMoyenne;
    }

    public function setNoteMoyenne(?float $noteMoyenne): static
    {
        $this->noteMoyenne = $noteMoyenne;

        return $this;
    }

    public function getTotalAvis(): ?int
    {
        return $this->totalAvis;
    }

    public function setTotalAvis(?int $totalAvis): static
    {
        $this->totalAvis = $totalAvis;

        return $this;
    }

    public function isEstCertifie(): ?bool
    {
        return $this->estCertifie;
    }

    public function setEstCertifie(bool $estCertifie): static
    {
        $this->estCertifie = $estCertifie;

        return $this;
    }

    public function getUtilisateur(): ?Utilisateur
    {
        return $this->utilisateur;
    }

    public function setUtilisateur(?Utilisateur $utilisateur): static
    {
        $this->utilisateur = $utilisateur;

        return $this;
    }
}
