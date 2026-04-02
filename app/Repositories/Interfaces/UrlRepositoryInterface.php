<?php

namespace App\Repositories\Interfaces;

use App\Models\Url;
use Illuminate\Pagination\LengthAwarePaginator;

interface UrlRepositoryInterface
{
    public function getAllByUser(int $userId, int $perPage = 10): LengthAwarePaginator;
    public function findByCode(string $code): ?Url;
    public function findById(int $id): ?Url;
    public function create(array $data): Url;
    public function update(int $id, array $data): Url;
    public function delete(int $id): void;
    public function incrementClick(int $id): void;
    public function isCodeTaken(string $code, ?int $excludeId = null): bool;
}
