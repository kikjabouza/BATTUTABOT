<?php

namespace App\Repository;

use App\Entity\MessageIa;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<MessageIa>
 */
class MessageIaRepository extends ServiceEntityRepository
{
    use BaseRepositoryTrait;
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, MessageIa::class);
    }

//    /**
//     * @return MessageIa[] Returns an array of MessageIa objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('m')
//            ->andWhere('m.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('m.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?MessageIa
//    {
//        return $this->createQueryBuilder('m')
//            ->andWhere('m.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
