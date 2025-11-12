<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20251112034505 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE evenement_itineraire (id INT AUTO_INCREMENT NOT NULL, jour_numero INT NOT NULL, ordre_evenement INT NOT NULL, heure_debut DATE NOT NULL, heure_fin TIME DEFAULT NULL, notes LONGTEXT DEFAULT NULL, cout_estime NUMERIC(10, 2) NOT NULL, id_itineraire_id INT DEFAULT NULL, id_activite_id INT DEFAULT NULL, id_hebergement_id INT DEFAULT NULL, id_transport_id INT DEFAULT NULL, id_guide_id INT DEFAULT NULL, INDEX IDX_B906265F179082DD (id_itineraire_id), INDEX IDX_B906265F831D4546 (id_activite_id), INDEX IDX_B906265F1EDDB260 (id_hebergement_id), INDEX IDX_B906265FBAC8B44D (id_transport_id), INDEX IDX_B906265F8736F1DE (id_guide_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE groupe_communaute (id INT AUTO_INCREMENT NOT NULL, nom VARCHAR(150) NOT NULL, description LONGTEXT NOT NULL, type_interet VARCHAR(100) NOT NULL, url_whatsapp VARCHAR(255) DEFAULT NULL, url_telegram VARCHAR(255) DEFAULT NULL, est_actif TINYINT(1) DEFAULT 1 NOT NULL, membre_max INT DEFAULT NULL, is_destination_id INT DEFAULT NULL, id_createur_id INT DEFAULT NULL, INDEX IDX_99247645A7D41AAD (is_destination_id), INDEX IDX_992476456BB0CC12 (id_createur_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE guide (id INT AUTO_INCREMENT NOT NULL, specialisations LONGTEXT NOT NULL, langues_parlees VARCHAR(255) NOT NULL, experience_annees INT NOT NULL, tarif_horaire NUMERIC(10, 2) NOT NULL, certification VARCHAR(255) DEFAULT NULL, accessibilite_handicap TINYINT(1) DEFAULT 0 NOT NULL, disponibilities LONGTEXT NOT NULL, note_moyenne DOUBLE PRECISION DEFAULT NULL, total_avis INT DEFAULT NULL, est_certifie TINYINT(1) DEFAULT 0 NOT NULL, id_utilisateur_id INT DEFAULT NULL, INDEX IDX_CA9EC735C6EE5C49 (id_utilisateur_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE hebergement (id INT AUTO_INCREMENT NOT NULL, nom VARCHAR(150) NOT NULL, description LONGTEXT DEFAULT NULL, type VARCHAR(100) DEFAULT NULL, adresse VARCHAR(255) DEFAULT NULL, latitude DOUBLE PRECISION DEFAULT NULL, longitude DOUBLE PRECISION DEFAULT NULL, prix_nuit NUMERIC(10, 2) NOT NULL, capacite INT NOT NULL, eco_certifie TINYINT(1) DEFAULT 0, caracteristiques_eco LONGTEXT DEFAULT NULL, equipements LONGTEXT DEFAULT NULL, est_verifie TINYINT(1) DEFAULT 0 NOT NULL, id_proprietaire_id INT DEFAULT NULL, id_destination_id INT NOT NULL, INDEX IDX_4852DD9C9F9BCDC2 (id_proprietaire_id), INDEX IDX_4852DD9CBC0ADC46 (id_destination_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE itineraire (id INT AUTO_INCREMENT NOT NULL, titre VARCHAR(150) NOT NULL, date_debut DATE NOT NULL, date_fin DATE NOT NULL, budget_total NUMERIC(10, 2) NOT NULL, statut VARCHAR(100) NOT NULL, score_eco DOUBLE PRECISION NOT NULL, empreinte_carbone DOUBLE PRECISION DEFAULT NULL, genere_ia TINYINT(1) DEFAULT 0 NOT NULL, plan_detaille LONGTEXT NOT NULL, relation_id INT DEFAULT NULL, id_destination_id INT DEFAULT NULL, id_touriste_id INT NOT NULL, INDEX IDX_487C9A113256915B (relation_id), INDEX IDX_487C9A11BC0ADC46 (id_destination_id), INDEX IDX_487C9A1143F139A5 (id_touriste_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE membre_groupe (id INT AUTO_INCREMENT NOT NULL, date_adhesion DATETIME NOT NULL, role VARCHAR(100) NOT NULL, id_groupe_id INT DEFAULT NULL, id_utilisateur_id INT NOT NULL, INDEX IDX_9EB01998FA7089AB (id_groupe_id), INDEX IDX_9EB01998C6EE5C49 (id_utilisateur_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE message_ia (id INT AUTO_INCREMENT NOT NULL, texte_message LONGTEXT NOT NULL, expediteur VARCHAR(100) NOT NULL, modele_ia VARCHAR(255) DEFAULT NULL, donnees_contexte LONGTEXT DEFAULT NULL, date_creation DATETIME NOT NULL, id_conversation_id INT DEFAULT NULL, INDEX IDX_2310E7A6E0F2C01E (id_conversation_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE patrimoine_culturel (id INT AUTO_INCREMENT NOT NULL, titre VARCHAR(150) NOT NULL, categorie VARCHAR(100) NOT NULL, description LONGTEXT NOT NULL, contexte_historique LONGTEXT NOT NULL, url_media VARCHAR(255) DEFAULT NULL, type_media VARCHAR(50) DEFAULT NULL, quiz_interactif LONGTEXT DEFAULT NULL, id_destination_id INT DEFAULT NULL, INDEX IDX_2AFBEE74BC0ADC46 (id_destination_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE profil_touriste (id INT AUTO_INCREMENT NOT NULL, budget NUMERIC(10, 2) DEFAULT NULL, style_voyage VARCHAR(100) DEFAULT NULL, preferences_culturelles LONGTEXT DEFAULT NULL, localisation_gps VARCHAR(100) DEFAULT NULL, historique_recherches LONGTEXT DEFAULT NULL, score_eco DOUBLE PRECISION DEFAULT NULL, empreinte_carbone DOUBLE PRECISION DEFAULT NULL, id_utilisateur_id INT DEFAULT NULL, INDEX IDX_92C061DAC6EE5C49 (id_utilisateur_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE realisation_defi (id INT AUTO_INCREMENT NOT NULL, progres_valeur DOUBLE PRECISION NOT NULL, est_termine TINYINT(1) DEFAULT 0 NOT NULL, date_terminaison DATETIME DEFAULT NULL, points_gagnes INT NOT NULL, id_utilisateur_id INT DEFAULT NULL, id_defi_id INT DEFAULT NULL, INDEX IDX_C67879AFC6EE5C49 (id_utilisateur_id), INDEX IDX_C67879AFAD6DA657 (id_defi_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE recompense (id INT AUTO_INCREMENT NOT NULL, nom VARCHAR(150) NOT NULL, description LONGTEXT NOT NULL, type VARCHAR(100) NOT NULL, valeur_points INT NOT NULL, est_actif TINYINT(1) DEFAULT 0 NOT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE recompense_utilisateur (id INT AUTO_INCREMENT NOT NULL, date_obtention DATETIME NOT NULL, est_utilise TINYINT(1) DEFAULT 0 NOT NULL, id_utilisateur_id INT NOT NULL, id_recompense_id INT NOT NULL, INDEX IDX_ACCF132C6EE5C49 (id_utilisateur_id), INDEX IDX_ACCF132F35991F3 (id_recompense_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE transport (id INT AUTO_INCREMENT NOT NULL, type VARCHAR(100) NOT NULL, operateur VARCHAR(100) NOT NULL, prix NUMERIC(10, 2) NOT NULL, duree VARCHAR(20) NOT NULL, score_eco DOUBLE PRECISION NOT NULL, emission_co2 DOUBLE PRECISION NOT NULL, endpoint_api VARCHAR(255) DEFAULT NULL, est_actif TINYINT(1) DEFAULT 1 NOT NULL, destination_depart_id INT DEFAULT NULL, destination_arrivee_id INT DEFAULT NULL, INDEX IDX_66AB212EFF824EB1 (destination_depart_id), INDEX IDX_66AB212EB7C9E5F0 (destination_arrivee_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE utilisateur (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(150) NOT NULL, mot_de_passe VARCHAR(255) NOT NULL, role VARCHAR(50) DEFAULT NULL, prenom VARCHAR(100) DEFAULT NULL, nom VARCHAR(100) DEFAULT NULL, telephone VARCHAR(30) DEFAULT NULL, avatar VARCHAR(255) DEFAULT NULL, date_naissance DATE DEFAULT NULL, langue_preferee VARCHAR(50) DEFAULT NULL, besoins_accessibilite LONGTEXT DEFAULT NULL, date_creation DATE NOT NULL, est_actif TINYINT(1) DEFAULT 1 NOT NULL, UNIQUE INDEX UNIQ_1D1C63B3E7927C74 (email), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('ALTER TABLE evenement_itineraire ADD CONSTRAINT FK_B906265F179082DD FOREIGN KEY (id_itineraire_id) REFERENCES itineraire (id)');
        $this->addSql('ALTER TABLE evenement_itineraire ADD CONSTRAINT FK_B906265F831D4546 FOREIGN KEY (id_activite_id) REFERENCES activite (id)');
        $this->addSql('ALTER TABLE evenement_itineraire ADD CONSTRAINT FK_B906265F1EDDB260 FOREIGN KEY (id_hebergement_id) REFERENCES transport (id)');
        $this->addSql('ALTER TABLE evenement_itineraire ADD CONSTRAINT FK_B906265FBAC8B44D FOREIGN KEY (id_transport_id) REFERENCES transport (id)');
        $this->addSql('ALTER TABLE evenement_itineraire ADD CONSTRAINT FK_B906265F8736F1DE FOREIGN KEY (id_guide_id) REFERENCES guide (id)');
        $this->addSql('ALTER TABLE groupe_communaute ADD CONSTRAINT FK_99247645A7D41AAD FOREIGN KEY (is_destination_id) REFERENCES destination (id)');
        $this->addSql('ALTER TABLE groupe_communaute ADD CONSTRAINT FK_992476456BB0CC12 FOREIGN KEY (id_createur_id) REFERENCES utilisateur (id)');
        $this->addSql('ALTER TABLE guide ADD CONSTRAINT FK_CA9EC735C6EE5C49 FOREIGN KEY (id_utilisateur_id) REFERENCES utilisateur (id)');
        $this->addSql('ALTER TABLE hebergement ADD CONSTRAINT FK_4852DD9C9F9BCDC2 FOREIGN KEY (id_proprietaire_id) REFERENCES utilisateur (id)');
        $this->addSql('ALTER TABLE hebergement ADD CONSTRAINT FK_4852DD9CBC0ADC46 FOREIGN KEY (id_destination_id) REFERENCES destination (id)');
        $this->addSql('ALTER TABLE itineraire ADD CONSTRAINT FK_487C9A113256915B FOREIGN KEY (relation_id) REFERENCES utilisateur (id)');
        $this->addSql('ALTER TABLE itineraire ADD CONSTRAINT FK_487C9A11BC0ADC46 FOREIGN KEY (id_destination_id) REFERENCES destination (id)');
        $this->addSql('ALTER TABLE itineraire ADD CONSTRAINT FK_487C9A1143F139A5 FOREIGN KEY (id_touriste_id) REFERENCES utilisateur (id)');
        $this->addSql('ALTER TABLE membre_groupe ADD CONSTRAINT FK_9EB01998FA7089AB FOREIGN KEY (id_groupe_id) REFERENCES groupe_communaute (id)');
        $this->addSql('ALTER TABLE membre_groupe ADD CONSTRAINT FK_9EB01998C6EE5C49 FOREIGN KEY (id_utilisateur_id) REFERENCES utilisateur (id)');
        $this->addSql('ALTER TABLE message_ia ADD CONSTRAINT FK_2310E7A6E0F2C01E FOREIGN KEY (id_conversation_id) REFERENCES conversation_ia (id)');
        $this->addSql('ALTER TABLE patrimoine_culturel ADD CONSTRAINT FK_2AFBEE74BC0ADC46 FOREIGN KEY (id_destination_id) REFERENCES destination (id)');
        $this->addSql('ALTER TABLE profil_touriste ADD CONSTRAINT FK_92C061DAC6EE5C49 FOREIGN KEY (id_utilisateur_id) REFERENCES utilisateur (id)');
        $this->addSql('ALTER TABLE realisation_defi ADD CONSTRAINT FK_C67879AFC6EE5C49 FOREIGN KEY (id_utilisateur_id) REFERENCES utilisateur (id)');
        $this->addSql('ALTER TABLE realisation_defi ADD CONSTRAINT FK_C67879AFAD6DA657 FOREIGN KEY (id_defi_id) REFERENCES defi_eco (id)');
        $this->addSql('ALTER TABLE recompense_utilisateur ADD CONSTRAINT FK_ACCF132C6EE5C49 FOREIGN KEY (id_utilisateur_id) REFERENCES utilisateur (id)');
        $this->addSql('ALTER TABLE recompense_utilisateur ADD CONSTRAINT FK_ACCF132F35991F3 FOREIGN KEY (id_recompense_id) REFERENCES recompense (id)');
        $this->addSql('ALTER TABLE transport ADD CONSTRAINT FK_66AB212EFF824EB1 FOREIGN KEY (destination_depart_id) REFERENCES destination (id)');
        $this->addSql('ALTER TABLE transport ADD CONSTRAINT FK_66AB212EB7C9E5F0 FOREIGN KEY (destination_arrivee_id) REFERENCES destination (id)');
        $this->addSql('ALTER TABLE activite ADD CONSTRAINT FK_B8755515BC0ADC46 FOREIGN KEY (id_destination_id) REFERENCES destination (id)');
        $this->addSql('ALTER TABLE artisan ADD CONSTRAINT FK_3C600AD3C6EE5C49 FOREIGN KEY (id_utilisateur_id) REFERENCES utilisateur (id)');
        $this->addSql('ALTER TABLE avis ADD CONSTRAINT FK_8F91ABF0E08ED3C1 FOREIGN KEY (id_auteur_id) REFERENCES utilisateur (id)');
        $this->addSql('ALTER TABLE contact_urgence ADD CONSTRAINT FK_E9524A4CBC0ADC46 FOREIGN KEY (id_destination_id) REFERENCES destination (id)');
        $this->addSql('ALTER TABLE conversation_ia ADD CONSTRAINT FK_79C6F719C6EE5C49 FOREIGN KEY (id_utilisateur_id) REFERENCES utilisateur (id)');
        $this->addSql('ALTER TABLE evenement ADD CONSTRAINT FK_B26681EBC0ADC46 FOREIGN KEY (id_destination_id) REFERENCES destination (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE evenement_itineraire DROP FOREIGN KEY FK_B906265F179082DD');
        $this->addSql('ALTER TABLE evenement_itineraire DROP FOREIGN KEY FK_B906265F831D4546');
        $this->addSql('ALTER TABLE evenement_itineraire DROP FOREIGN KEY FK_B906265F1EDDB260');
        $this->addSql('ALTER TABLE evenement_itineraire DROP FOREIGN KEY FK_B906265FBAC8B44D');
        $this->addSql('ALTER TABLE evenement_itineraire DROP FOREIGN KEY FK_B906265F8736F1DE');
        $this->addSql('ALTER TABLE groupe_communaute DROP FOREIGN KEY FK_99247645A7D41AAD');
        $this->addSql('ALTER TABLE groupe_communaute DROP FOREIGN KEY FK_992476456BB0CC12');
        $this->addSql('ALTER TABLE guide DROP FOREIGN KEY FK_CA9EC735C6EE5C49');
        $this->addSql('ALTER TABLE hebergement DROP FOREIGN KEY FK_4852DD9C9F9BCDC2');
        $this->addSql('ALTER TABLE hebergement DROP FOREIGN KEY FK_4852DD9CBC0ADC46');
        $this->addSql('ALTER TABLE itineraire DROP FOREIGN KEY FK_487C9A113256915B');
        $this->addSql('ALTER TABLE itineraire DROP FOREIGN KEY FK_487C9A11BC0ADC46');
        $this->addSql('ALTER TABLE itineraire DROP FOREIGN KEY FK_487C9A1143F139A5');
        $this->addSql('ALTER TABLE membre_groupe DROP FOREIGN KEY FK_9EB01998FA7089AB');
        $this->addSql('ALTER TABLE membre_groupe DROP FOREIGN KEY FK_9EB01998C6EE5C49');
        $this->addSql('ALTER TABLE message_ia DROP FOREIGN KEY FK_2310E7A6E0F2C01E');
        $this->addSql('ALTER TABLE patrimoine_culturel DROP FOREIGN KEY FK_2AFBEE74BC0ADC46');
        $this->addSql('ALTER TABLE profil_touriste DROP FOREIGN KEY FK_92C061DAC6EE5C49');
        $this->addSql('ALTER TABLE realisation_defi DROP FOREIGN KEY FK_C67879AFC6EE5C49');
        $this->addSql('ALTER TABLE realisation_defi DROP FOREIGN KEY FK_C67879AFAD6DA657');
        $this->addSql('ALTER TABLE recompense_utilisateur DROP FOREIGN KEY FK_ACCF132C6EE5C49');
        $this->addSql('ALTER TABLE recompense_utilisateur DROP FOREIGN KEY FK_ACCF132F35991F3');
        $this->addSql('ALTER TABLE transport DROP FOREIGN KEY FK_66AB212EFF824EB1');
        $this->addSql('ALTER TABLE transport DROP FOREIGN KEY FK_66AB212EB7C9E5F0');
        $this->addSql('DROP TABLE evenement_itineraire');
        $this->addSql('DROP TABLE groupe_communaute');
        $this->addSql('DROP TABLE guide');
        $this->addSql('DROP TABLE hebergement');
        $this->addSql('DROP TABLE itineraire');
        $this->addSql('DROP TABLE membre_groupe');
        $this->addSql('DROP TABLE message_ia');
        $this->addSql('DROP TABLE patrimoine_culturel');
        $this->addSql('DROP TABLE profil_touriste');
        $this->addSql('DROP TABLE realisation_defi');
        $this->addSql('DROP TABLE recompense');
        $this->addSql('DROP TABLE recompense_utilisateur');
        $this->addSql('DROP TABLE transport');
        $this->addSql('DROP TABLE utilisateur');
        $this->addSql('ALTER TABLE activite DROP FOREIGN KEY FK_B8755515BC0ADC46');
        $this->addSql('ALTER TABLE artisan DROP FOREIGN KEY FK_3C600AD3C6EE5C49');
        $this->addSql('ALTER TABLE avis DROP FOREIGN KEY FK_8F91ABF0E08ED3C1');
        $this->addSql('ALTER TABLE contact_urgence DROP FOREIGN KEY FK_E9524A4CBC0ADC46');
        $this->addSql('ALTER TABLE conversation_ia DROP FOREIGN KEY FK_79C6F719C6EE5C49');
        $this->addSql('ALTER TABLE evenement DROP FOREIGN KEY FK_B26681EBC0ADC46');
    }
}
