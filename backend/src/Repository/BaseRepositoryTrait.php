<?php
// src/Repository/BaseRepositoryTrait.php
namespace App\Repository;

trait BaseRepositoryTrait
{
    public function findLatest(int $limit = 10): array
    {
        return $this->createQueryBuilder('e')
            ->orderBy('e.id', 'DESC')
            ->setMaxResults($limit)
            ->getQuery()
            ->getResult();
    }

    public function paginate(int $page = 1, int $limit = 10): array
    {
        return $this->createQueryBuilder('e')
            ->setFirstResult(($page - 1) * $limit)
            ->setMaxResults($limit)
            ->getQuery()
            ->getResult();
    }

    public function searchByName(string $field, string $value): array
    {
        return $this->createQueryBuilder('e')
            ->where("e.$field LIKE :val")
            ->setParameter('val', "%$value%")
            ->getQuery()
            ->getResult();
    }

    public function findWithRelations(array $relations = []): array
    {
        $qb = $this->createQueryBuilder('e');
        foreach ($relations as $relation) {
            $qb->leftJoin("e.$relation", $relation)
               ->addSelect($relation);
        }
        return $qb->getQuery()->getResult();
    }
}
