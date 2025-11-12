<?php
require __DIR__ . '/vendor/autoload.php';

echo "autoload.php chargé: " . (file_exists(__DIR__.'/vendor/autoload.php') ? "oui\n" : "non\n");
echo "Setup class_exists: ";
var_export(class_exists(\Doctrine\ORM\Tools\Setup::class));
echo "\n";
echo "Fichier Setup présent: " . (file_exists(__DIR__ . '/vendor/doctrine/orm/lib/Doctrine/ORM/Tools/Setup.php') ? "oui\n" : "non\n");
