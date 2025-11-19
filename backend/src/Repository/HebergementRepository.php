<?php

namespace App\Repository;

use App\Entity\Hebergement;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Hebergement>
 */
class HebergementRepository extends ServiceEntityRepository
{
    use BaseRepositoryTrait;
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Hebergement::class);
    }

    /**
     * Trouve les hébergements selon le niveau économique
     */
    public function findByNiveauEconomique(string $niveauEconomique): array
    {
        $plagesPrix = [
            'eco' => ['min' => 10, 'max' => 30],
            'moyen' => ['min' => 25, 'max' => 60],
            'confort' => ['min' => 50, 'max' => 120],
            'luxe' => ['min' => 100, 'max' => 500]
        ];

        $plage = $plagesPrix[$niveauEconomique] ?? $plagesPrix['moyen'];

        return $this->createQueryBuilder('h')
            ->where('h.estVerifie = true')
            ->andWhere('h.prixNuit BETWEEN :min AND :max')
            ->setParameter('min', $plage['min'])
            ->setParameter('max', $plage['max'])
            ->orderBy('h.ecoCertifie', 'DESC')
            ->addOrderBy('h.prixNuit', 'ASC')
            ->getQuery()
            ->getResult();
    }

    /**
     * Trouve les hébergements avec filtres
     */
    public function findByFilters(array $filtres, string $niveauEconomique): array
    {
        $qb = $this->createQueryBuilder('h')
            ->leftJoin('h.idDestination', 'd')
            ->where('h.estVerifie = true');

        // Filtre par type
        if (!empty($filtres['type'])) {
            $qb->andWhere('h.type = :type')
               ->setParameter('type', $filtres['type']);
        }

        // Filtre par destination
        if (!empty($filtres['destination'])) {
            $qb->andWhere('d.nom LIKE :destination')
               ->setParameter('destination', '%' . $filtres['destination'] . '%');
        }

        // Filtre par quartier (recherche dans l'adresse)
        if (!empty($filtres['quartier'])) {
            $qb->andWhere('h.adresse LIKE :quartier')
               ->setParameter('quartier', '%' . $filtres['quartier'] . '%');
        }

        // Filtre par prix (priorité sur le niveau économique si pas spécifié)
        if (!empty($filtres['prix_min']) || !empty($filtres['prix_max'])) {
            if (!empty($filtres['prix_min'])) {
                $qb->andWhere('h.prixNuit >= :prix_min')
                   ->setParameter('prix_min', $filtres['prix_min']);
            }
            if (!empty($filtres['prix_max'])) {
                $qb->andWhere('h.prixNuit <= :prix_max')
                   ->setParameter('prix_max', $filtres['prix_max']);
            }
        } else {
            // Applique le filtre de niveau économique
            $plagesPrix = [
                'eco' => ['min' => 10, 'max' => 30],
                'moyen' => ['min' => 25, 'max' => 60],
                'confort' => ['min' => 50, 'max' => 120],
                'luxe' => ['min' => 100, 'max' => 500]
            ];
            $plage = $plagesPrix[$niveauEconomique] ?? $plagesPrix['moyen'];
            $qb->andWhere('h.prixNuit BETWEEN :min AND :max')
               ->setParameter('min', $plage['min'])
               ->setParameter('max', $plage['max']);
        }

        // Filtre éco-certifié
        if (isset($filtres['eco_certifie']) && $filtres['eco_certifie'] !== '') {
            $qb->andWhere('h.ecoCertifie = :eco_certifie')
               ->setParameter('eco_certifie', (bool)$filtres['eco_certifie']);
        }

        return $qb->orderBy('h.ecoCertifie', 'DESC')
                  ->addOrderBy('h.prixNuit', 'ASC')
                  ->getQuery()
                  ->getResult();
    }

    /**
     * Trouve les types distincts d'hébergements
     */
    public function findDistinctTypes(): array
    {
        return $this->createQueryBuilder('h')
            ->select('DISTINCT h.type')
            ->where('h.type IS NOT NULL')
            ->getQuery()
            ->getSingleColumnResult();
    }

    /**
     * Trouve les hébergements par destination
     */
    public function findByDestination(int $destinationId): array
    {
        return $this->createQueryBuilder('h')
            ->where('h.idDestination = :destinationId')
            ->andWhere('h.estVerifie = true')
            ->setParameter('destinationId', $destinationId)
            ->orderBy('h.ecoCertifie', 'DESC')
            ->addOrderBy('h.prixNuit', 'ASC')
            ->getQuery()
            ->getResult();
    }

    /**
     * Trouve les hébergements éco-certifiés
     */
    public function findEcoCertifies(): array
    {
        return $this->createQueryBuilder('h')
            ->where('h.ecoCertifie = true')
            ->andWhere('h.estVerifie = true')
            ->orderBy('h.prixNuit', 'ASC')
            ->getQuery()
            ->getResult();
    }

    /**
     * Trouve les hébergements par propriétaire
     */
    public function findByProprietaire(int $proprietaireId): array
    {
        return $this->createQueryBuilder('h')
            ->where('h.idProprietaire = :proprietaireId')
            ->setParameter('proprietaireId', $proprietaireId)
            ->orderBy('h.estVerifie', 'DESC')
            ->addOrderBy('h.id', 'DESC')
            ->getQuery()
            ->getResult();
    }

    /**
     * Compte le nombre total d'hébergements vérifiés
     */
    public function countHebergementsVerifies(): int
    {
        return $this->createQueryBuilder('h')
            ->select('COUNT(h.id)')
            ->where('h.estVerifie = true')
            ->getQuery()
            ->getSingleScalarResult();
    }

//    /**
//     * @return Hebergement[] Returns an array of Hebergement objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('h')
//            ->andWhere('h.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('h.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Hebergement
//    {
//        return $this->createQueryBuilder('h')
//            ->andWhere('h.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}