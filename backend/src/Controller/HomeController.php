<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
    // 1️⃣ Route spécifique — toujours en premier
    #[Route('/exemple', name: 'app_exemple')]
    public function exemple(): Response
    {
        return $this->render('classiques/exempleSansReact.html.twig');
    }

    // 2️⃣ Route catch-all — toujours en dernier
    #[Route(
        '/{reactRouting}',
        name: 'app_home',
        requirements: ['reactRouting' => '^(?!api|_wdt|_profiler|exemple).*'],
        defaults: ['reactRouting' => null]
    )]
    public function index(): Response
    {
        return $this->render('react/index.html.twig');
    }
}
