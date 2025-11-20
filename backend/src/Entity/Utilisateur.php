<?php

namespace App\Entity;

use App\Repository\UtilisateurRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

#[ORM\Entity(repositoryClass: UtilisateurRepository::class)]
class Utilisateur implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 150, unique: true)]
    private ?string $email = null;

    #[ORM\Column(length: 255)]
    private ?string $motDePasse = null;

    #[ORM\Column(length: 50, nullable: true)]
    private ?string $role = null;

    #[ORM\Column(length: 100, nullable: true)]
    private ?string $prenom = null;

    #[ORM\Column(length: 100, nullable: true)]
    private ?string $nom = null;

    #[ORM\Column(length: 30, nullable: true)]
    private ?string $telephone = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $avatar = null;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    private ?\DateTime $dateNaissance = null;

    #[ORM\Column(length: 50, nullable: true)]
    private ?string $languePreferee = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $besoinsAccessibilite = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTime $dateCreation = null;

    #[ORM\Column(options: ['default' => true])]
    private ?bool $estActif = null;

    /**
     * @var Collection<int, ProfilTouriste>
     */
    #[ORM\OneToMany(targetEntity: ProfilTouriste::class, mappedBy: 'idUtilisateur')]
    private Collection $profilTouristes;

    /**
     * @var Collection<int, Itineraire>
     */
    #[ORM\OneToMany(targetEntity: Itineraire::class, mappedBy: 'idTouriste')]
    private Collection $itineraires;

    public function __construct()
    {
        $this->profilTouristes = new ArrayCollection();
        $this->itineraires = new ArrayCollection();
        $this->dateCreation = new \DateTime();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getMotDePasse(): ?string
    {
        return $this->motDePasse;
    }

    public function setMotDePasse(string $motDePasse): static
    {
        $this->motDePasse = $motDePasse;

        return $this;
    }

    public function getRole(): ?string
    {
        return $this->role;
    }

    public function setRole(?string $role): static
    {
        $this->role = $role;

        return $this;
    }

    public function getPrenom(): ?string
    {
        return $this->prenom;
    }

    public function setPrenom(?string $prenom): static
    {
        $this->prenom = $prenom;

        return $this;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(?string $nom): static
    {
        $this->nom = $nom;

        return $this;
    }

    public function getTelephone(): ?string
    {
        return $this->telephone;
    }

    public function setTelephone(?string $telephone): static
    {
        $this->telephone = $telephone;

        return $this;
    }

    public function getAvatar(): ?string
    {
        return $this->avatar;
    }

    public function setAvatar(?string $avatar): static
    {
        $this->avatar = $avatar;

        return $this;
    }

    public function getDateNaissance(): ?\DateTime
    {
        return $this->dateNaissance;
    }

    public function setDateNaissance(?\DateTime $dateNaissance): static
    {
        $this->dateNaissance = $dateNaissance;

        return $this;
    }

    public function getLanguePreferee(): ?string
    {
        return $this->languePreferee;
    }

    public function setLanguePreferee(?string $languePreferee): static
    {
        $this->languePreferee = $languePreferee;

        return $this;
    }

    public function getBesoinsAccessibilite(): ?string
    {
        return $this->besoinsAccessibilite;
    }

    public function setBesoinsAccessibilite(?string $besoinsAccessibilite): static
    {
        $this->besoinsAccessibilite = $besoinsAccessibilite;

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

    public function isEstActif(): ?bool
    {
        return $this->estActif;
    }

    public function setEstActif(bool $estActif): static
    {
        $this->estActif = $estActif;

        return $this;
    }

    /**
     * @return Collection<int, ProfilTouriste>
     */
    public function getProfilTouristes(): Collection
    {
        return $this->profilTouristes;
    }

    public function addProfilTouriste(ProfilTouriste $profilTouriste): static
    {
        if (!$this->profilTouristes->contains($profilTouriste)) {
            $this->profilTouristes->add($profilTouriste);
            $profilTouriste->setIdUtilisateur($this);
        }

        return $this;
    }

    public function removeProfilTouriste(ProfilTouriste $profilTouriste): static
    {
        if ($this->profilTouristes->removeElement($profilTouriste)) {
            // set the owning side to null (unless already changed)
            if ($profilTouriste->getIdUtilisateur() === $this) {
                $profilTouriste->setIdUtilisateur(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Itineraire>
     */
    public function getItineraires(): Collection
    {
        return $this->itineraires;
    }

    public function addItineraire(Itineraire $itineraire): static
    {
        if (!$this->itineraires->contains($itineraire)) {
            $this->itineraires->add($itineraire);
            $itineraire->setIdTouriste($this);
        }

        return $this;
    }

    public function removeItineraire(Itineraire $itineraire): static
    {
        if ($this->itineraires->removeElement($itineraire)) {
            // set the owning side to null (unless already changed)
            if ($itineraire->getIdTouriste() === $this) {
                $itineraire->setIdTouriste(null);
            }
        }

        return $this;
    }
    // PasswordAuthenticatedUserInterface
    public function getPassword(): ?string
    {
        return $this->motDePasse;
    }

    // UserInterface
    public function getUserIdentifier(): string
    {
        return $this->email;
    }

    public function getRoles(): array
    {
        return [$this->role ?? 'ROLE_USER'];
    }

    public function eraseCredentials(): void
    {
        // rien à effacer pour le moment
    }
}
