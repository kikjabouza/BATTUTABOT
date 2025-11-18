<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
    #[Route('/exemple', name: 'app_exemple')]
    public function exemple(): Response
    {
        return $this->render('classiques/exempleSansReact.html.twig');
    }

    // CORRECTION : Exclusion spécifique des routes API
    #[Route('/{reactRouting}', name: 'app_home', 
        requirements: ['reactRouting' => '^(?!api/|_wdt|_profiler|auth$|login$|register$|hebergements|utilisateurs|profils).+'], 
        defaults: ['reactRouting' => null])]
    public function index(): Response
    {
        return $this->render('react/index.html.twig');
    }
}