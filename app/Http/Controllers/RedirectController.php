<?php

namespace App\Http\Controllers;

use App\Repositories\Interfaces\UrlRepositoryInterface;

class RedirectController extends Controller
{
    public function __construct(
        private UrlRepositoryInterface $urlRepo
    ) {}

    public function redirect(string $code)
    {
        $url = $this->urlRepo->findByCode($code);

        if (!$url) {
            abort(404, 'Short URL not found.');
        }


        if ($url->expires_at && $url->expires_at->isPast()) {
            abort(410, 'This link has expired.');
        }

        $this->urlRepo->incrementClick($url->id);

        return redirect()->away($url->original_url);
    }
}
