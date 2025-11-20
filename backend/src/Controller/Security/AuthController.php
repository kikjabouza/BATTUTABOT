<?php

namespace App\Controller\Security;

use App\Entity\Utilisateur;
use App\Repository\UtilisateurRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

final class AuthController extends AbstractController
{
    #[Route('/api/auth/register', name: 'api_auth_register', methods: ['POST'])]
    public function register(
        Request $request,
        EntityManagerInterface $em,
        UserPasswordHasherInterface $passwordHasher,
        UtilisateurRepository $userRepo
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        // Validation
        if (!isset($data['email']) || !isset($data['password'])) {
            return $this->json([
                'success' => false,
                'error' => 'Email et mot de passe requis'
            ], 400);
        }

        // Vérifier si l'email existe déjà
        $existingUser = $userRepo->findOneBy(['email' => $data['email']]);
        if ($existingUser) {
            return $this->json([
                'success' => false,
                'error' => 'Cet email est déjà utilisé'
            ], 400);
        }

        // Créer un nouvel utilisateur
        $user = new Utilisateur();
        $user->setEmail($data['email']);
        $user->setMotDePasse($passwordHasher->hashPassword($user, $data['password']));
        $user->setPrenom($data['prenom'] ?? '');
        $user->setNom($data['nom'] ?? '');
        $user->setRole($data['role'] ?? 'ROLE_USER');
        $user->setDateCreation(new \DateTime());
        $user->setTelephone($data['telephone'] ?? null);
        $user->setLanguePreferee($data['langue_preferee'] ?? null);
        $user->setBesoinsAccessibilite($data['besoins_accessibilite'] ?? null);
        $user->setDateNaissance($data['date_naissance'] ? new \DateTime($data['date_naissance']) : null);
        $user->setAvatar($data['avatar'] ?? null);
        $user->setEstActif(true);

        $em->persist($user);
        $em->flush();

        return $this->json([
            'success' => true,
            'message' => 'Utilisateur créé avec succès',
            'user' => [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'prenom' => $user->getPrenom(),
                'nom' => $user->getNom(),
                'role' => $user->getRole()
            ]
        ], 201);
    }

    #[Route('/api/auth/login', name: 'api_auth_login', methods: ['POST'])]
    public function login(#[CurrentUser] ?Utilisateur $user): JsonResponse
    {
        if (null === $user) {
            return $this->json([
                'success' => false,
                'error' => 'Email ou mot de passe incorrect'
            ], 401);
        }

        return $this->json([
            'success' => true,
            'message' => 'Connexion réussie',
            'user' => [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'prenom' => $user->getPrenom(),
                'nom' => $user->getNom(),
                'role' => $user->getRole()
            ]
        ]);
    }

    #[Route('/api/auth/me', name: 'api_auth_me', methods: ['GET'])]
    public function getCurrentUser(#[CurrentUser] ?Utilisateur $user): JsonResponse
    {
        if (!$user) {
            return $this->json([
                'success' => false,
                'error' => 'Non authentifié'
            ], 401);
        }

        return $this->json([
            'success' => true,
            'user' => [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'prenom' => $user->getPrenom(),
                'nom' => $user->getNom(),
                'telephone' => $user->getTelephone(),
                'avatar' => $user->getAvatar(),
                'role' => $user->getRole(),
                'date_creation' => $user->getDateCreation()->format('Y-m-d')
            ]
        ]);
    }

    // Dans AuthController.php - modifier la méthode logout
    #[Route('/api/auth/logout', name: 'api_auth_logout', methods: ['POST'])]
    public function logout(Request $request): JsonResponse
    {
        // Invalider la session
        $session = $request->getSession();
        if ($session) {
            $session->invalidate();
        }

        // Déconnecter l'utilisateur Symfony
        $this->container->get('security.token_storage')->setToken(null);

        return $this->json([
            'success' => true,
            'message' => 'Déconnexion réussie'
        ]);
    }

    #[Route('/auth', name: 'app_auth')]
    public function index(): Response
    {
        return $this->render('auth/index.html.twig', [
            'controller_name' => 'AuthController',
        ]);
    }
}
