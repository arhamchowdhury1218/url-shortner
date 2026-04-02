<?php

namespace App\Providers;

use App\Repositories\Interfaces\UrlRepositoryInterface;
use App\Repositories\UrlRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(
            UrlRepositoryInterface::class,
            UrlRepository::class
        );
    }

    public function boot(): void
    {
        //
    }
}
