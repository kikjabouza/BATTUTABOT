<?php

namespace App\Repository;

use App\Entity\PatrimoineCulturel;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<PatrimoineCulturel>
 */
class PatrimoineCulturelRepository extends ServiceEntityRepository
{
    use BaseRepositoryTrait;
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, PatrimoineCulturel::class);
    }

//    /**
//     * @return PatrimoineCulturel[] Returns an array of PatrimoineCulturel objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('p.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?PatrimoineCulturel
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
