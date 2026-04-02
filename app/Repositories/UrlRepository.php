<?php

namespace App\Repositories;

use App\Models\Url;
use App\Repositories\Interfaces\UrlRepositoryInterface; // ← fixed
use Illuminate\Pagination\LengthAwarePaginator;

class UrlRepository implements UrlRepositoryInterface
{
    public function getAllByUser(int $userId, int $perPage = 10): LengthAwarePaginator
    {
        return Url::where('user_id', $userId)
            ->latest()
            ->paginate($perPage);
    }

    public function findByCode(string $code): ?Url
    {
        return Url::where('short_code', $code)
            ->orWhere('custom_code', $code)
            ->first();
    }

    public function findById(int $id): ?Url
    {
        return Url::find($id);
    }

    public function create(array $data): Url
    {
        return Url::create($data);
    }

    public function update(int $id, array $data): Url
    {
        $url = Url::findOrFail($id);
        $url->update($data);
        return $url->fresh();
    }

    public function delete(int $id): void
    {
        Url::findOrFail($id)->delete();
    }

    public function incrementClick(int $id): void
    {
        Url::where('id', $id)->increment('click_count');
    }

    public function isCodeTaken(string $code, ?int $excludeId = null): bool
    {
        return Url::where(function ($q) use ($code) {
            $q->where('short_code', $code)
                ->orWhere('custom_code', $code);
        })
            ->when($excludeId, fn($q) => $q->where('id', '!=', $excludeId))
            ->exists();
    }
}
