<?php
// src/Entity/Question.php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: 'question')]
class Question
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: 'text')]
    private string $texteQuestion;

    #[ORM\Column(length: 20)]
    private string $typeQuestion = 'radio';

    #[ORM\Column(length: 20)]
    private string $typeUtilisateur = 'touriste';

    #[ORM\Column]
    private int $ordreAffichage;

    #[ORM\Column]
    private bool $estObligatoire = true;

    #[ORM\Column(type: 'json', nullable: true)]
    private ?array $optionsJson = null;

    #[ORM\Column(type: 'json', nullable: true)]
    private ?array $conditionsJson = null;

    // GETTERS/SETTERS
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTexteQuestion(): string
    {
        return $this->texteQuestion;
    }

    public function setTexteQuestion(string $texteQuestion): self
    {
        $this->texteQuestion = $texteQuestion;
        return $this;
    }

    public function getTypeQuestion(): string
    {
        return $this->typeQuestion;
    }

    public function setTypeQuestion(string $typeQuestion): self
    {
        $this->typeQuestion = $typeQuestion;
        return $this;
    }

    public function getTypeUtilisateur(): string
    {
        return $this->typeUtilisateur;
    }

    public function setTypeUtilisateur(string $typeUtilisateur): self
    {
        $this->typeUtilisateur = $typeUtilisateur;
        return $this;
    }

    public function getOrdreAffichage(): int
    {
        return $this->ordreAffichage;
    }

    public function setOrdreAffichage(int $ordreAffichage): self
    {
        $this->ordreAffichage = $ordreAffichage;
        return $this;
    }

    public function isEstObligatoire(): bool
    {
        return $this->estObligatoire;
    }

    public function setEstObligatoire(bool $estObligatoire): self
    {
        $this->estObligatoire = $estObligatoire;
        return $this;
    }

    public function getOptionsJson(): ?array
    {
        return $this->optionsJson;
    }

    public function setOptionsJson(?array $optionsJson): self
    {
        $this->optionsJson = $optionsJson;
        return $this;
    }

    public function getConditionsJson(): ?array
    {
        return $this->conditionsJson;
    }

    public function setConditionsJson(?array $conditionsJson): self
    {
        $this->conditionsJson = $conditionsJson;
        return $this;
    }
}