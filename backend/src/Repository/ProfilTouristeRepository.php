<?php

namespace App\Repository;

use App\Entity\ProfilTouriste;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<ProfilTouriste>
 */
class ProfilTouristeRepository extends ServiceEntityRepository
{
    use BaseRepositoryTrait;
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ProfilTouriste::class);
    }

//    /**
//     * @return ProfilTouriste[] Returns an array of ProfilTouriste objects
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

//    public function findOneBySomeField($value): ?ProfilTouriste
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
