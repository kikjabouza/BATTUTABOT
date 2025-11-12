<?php
declare(strict_types=1);

use Doctrine\ORM\EntityManager;
use Doctrine\ORM\ORMSetup;
use Doctrine\DBAL\DriverManager;
use Symfony\Component\Dotenv\Dotenv;

require_once __DIR__ . '/vendor/autoload.php';

// ---------------------------
// 1. Chargement .env
// ---------------------------
$dotenv = new Dotenv();
if (file_exists(__DIR__.'/.env')) {
    $dotenv->loadEnv(__DIR__.'/.env');
}

$databaseUrl = $_ENV['DATABASE_URL'] ?? getenv('DATABASE_URL');

if (!$databaseUrl) {
    echo "Erreur: DATABASE_URL non défini dans l'environnement. Vérifie ton .env\n";
    exit(1);
}

echo "DATABASE_URL chargé: $databaseUrl\n";

// ---------------------------
// 2. Configuration Doctrine
// ---------------------------

// Mapper tes entités
$paths = [__DIR__ . '/src/Entity']; // Où seront générées les entités
$isDevMode = true;

$config = ORMSetup::createAnnotationMetadataConfiguration(
    paths: $paths,
    isDevMode: $isDevMode
);

// ---------------------------
// 3. Connexion à la DB
// ---------------------------
$connectionParams = \Doctrine\DBAL\Tools\DsnParser::parse($databaseUrl);

// Si driver manquant, on ajoute pdo_mysql
if (!isset($connectionParams['driver'])) {
    $connectionParams['driver'] = 'pdo_mysql';
}

$conn = DriverManager::getConnection($connectionParams);

// ---------------------------
// 4. Création EntityManager
// ---------------------------
$entityManager = new EntityManager($conn, $config);

echo "EntityManager prêt !\n";

// ---------------------------
// 5. Génération entités et repositories
// ---------------------------

$tables = [
    'UTILISATEUR',
    'PROFIL_TOURISTE',
    'DESTINATION',
    'HEBERGEMENT',
    'TRANSPORT',
    'ACTIVITE',
    'PATRIMOINE_CULTUREL',
    'GUIDE',
    'ARTISAN',
    'ITINERAIRE',
    'EVENEMENT_ITINERAIRE',
    'CONVERSATION_IA',
    'MESSAGE_IA',
    'DEFI_ECO',
    'REALISATION_DEFI',
    'GROUPE_COMMUNAUTE',
    'MEMBRE_GROUPE',
    'CONTACT_URGENCE',
    'EVENEMENT',
    'AVIS',
    'RECOMPENSE',
    'RECOMPENSE_UTILISATEUR'
];

// Ici tu peux utiliser un générateur d’entité Doctrine automatique
// Doctrine 3.x ne fournit plus `doctrine:mapping:import` en PHP pur,
// donc il faut soit créer les entités à la main, soit utiliser `php bin/console doctrine:mapping:import`
// Pour un script PHP autonome, on génère automatiquement un fichier simple pour chaque table:

$outputDir = __DIR__ . '/src/Entity';
if (!is_dir($outputDir)) mkdir($outputDir, 0777, true);

foreach ($tables as $table) {
    $className = str_replace(' ', '', ucwords(strtolower($table), '_'));
    $file = $outputDir . '/' . $className . '.php';
    $code = "<?php\n\nnamespace App\Entity;\n\nuse Doctrine\ORM\Mapping as ORM;\nuse Doctrine\Common\Collections\ArrayCollection;\nuse Doctrine\Common\Collections\Collection;\n\n";
    $code .= "/**\n * @ORM\Entity(repositoryClass=\"App\Repository\\" . $className . "Repository\")\n * @ORM\Table(name=\"$table\")\n */\n";
    $code .= "class $className\n{\n";
    $code .= "    // TODO: Ajouter toutes les propriétés de $table avec leurs annotations\n";
    $code .= "    // TODO: Ajouter setters et getters pour chaque propriété\n";
    $code .= "}\n";

    file_put_contents($file, $code);
    echo "Entité générée : $file\n";

    // Générer repository
    $repoDir = __DIR__ . '/src/Repository';
    if (!is_dir($repoDir)) mkdir($repoDir, 0777, true);
    $repoFile = $repoDir . '/' . $className . 'Repository.php';
    $repoCode = "<?php\n\nnamespace App\Repository;\n\nuse Doctrine\ORM\EntityRepository;\nuse App\Entity\\$className;\n\nclass ".$className."Repository extends EntityRepository\n{\n    // Méthodes personnalisées ici\n}\n";
    file_put_contents($repoFile, $repoCode);
    echo "Repository généré : $repoFile\n";
}

echo "Génération terminée !\n";
