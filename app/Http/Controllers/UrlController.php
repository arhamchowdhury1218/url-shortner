<?php

namespace App\Http\Controllers;

use App\Repositories\Interfaces\UrlRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class UrlController extends Controller
{
    public function __construct(
        private UrlRepositoryInterface $urlRepo
    ) {}


    public function index(Request $request): Response
    {
        $urls = $this->urlRepo->getAllByUser(
            auth()->id(),
            10
        );

        return Inertia::render('Dashboard', [
            'urls' => $urls,
            'baseUrl' => config('app.url'),
        ]);
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'original_url' => 'required|url|max:2048',
            'custom_code'  => 'nullable|alpha_dash|min:3|max:50|unique:urls,custom_code|unique:urls,short_code',
            'expires_at'   => 'nullable|date|after:now',
        ]);

        if (!empty($validated['custom_code'])) {
            if ($this->urlRepo->isCodeTaken($validated['custom_code'])) {
                return back()->withErrors(['custom_code' => 'This custom code is already taken.']);
            }
        }

        $this->urlRepo->create([
            'user_id'      => auth()->id(),
            'original_url' => $validated['original_url'],
            'short_code'   => Str::random(6),
            'custom_code'  => $validated['custom_code'] ?? null,
            'expires_at'   => $validated['expires_at'] ?? null,
        ]);

        return back()->with('success', 'Short URL created!');
    }


    public function update(Request $request, int $id)
    {
        $url = $this->urlRepo->findById($id);


        abort_if($url->user_id !== auth()->id(), 403);

        $validated = $request->validate([
            'original_url' => 'required|url|max:2048',
            'custom_code'  => 'nullable|alpha_dash|min:3|max:50',
            'expires_at'   => 'nullable|date|after:now',
        ]);

        if (!empty($validated['custom_code'])) {
            if ($this->urlRepo->isCodeTaken($validated['custom_code'], $id)) {
                return back()->withErrors(['custom_code' => 'This custom code is already taken.']);
            }
        }

        $this->urlRepo->update($id, $validated);

        return back()->with('success', 'URL updated!');
    }


    public function destroy(int $id)
    {
        $url = $this->urlRepo->findById($id);
        abort_if($url->user_id !== auth()->id(), 403);

        $this->urlRepo->delete($id);

        return back()->with('success', 'URL deleted!');
    }
}
