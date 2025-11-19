<?php

namespace App\Repository;

use App\Entity\DefiEco;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<DefiEco>
 */
class DefiEcoRepository extends ServiceEntityRepository
{
    use BaseRepositoryTrait;
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, DefiEco::class);
    }

//    /**
//     * @return DefiEco[] Returns an array of DefiEco objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('d')
//            ->andWhere('d.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('d.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?DefiEco
//    {
//        return $this->createQueryBuilder('d')
//            ->andWhere('d.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
