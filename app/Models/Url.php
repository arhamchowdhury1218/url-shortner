<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Url extends Model
{
    protected $fillable = [
        'user_id',
        'original_url',
        'short_code',
        'custom_code',
        'click_count',
        'expires_at',
    ];

    protected $casts = [
        'expires_at' => 'datetime',
        'click_count' => 'integer',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }


    public function getActiveCode(): string
    {
        return $this->custom_code ?? $this->short_code;
    }
}
