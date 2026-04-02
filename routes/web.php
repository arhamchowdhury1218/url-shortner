<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UrlController;
use App\Http\Controllers\RedirectController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Welcome page
// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin'       => Route::has('login'),
//         'canRegister'    => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion'     => PHP_VERSION,
//     ]);
// });
Route::get('/', function () {
    return redirect()->route('login');
});


require __DIR__ . '/auth.php';


Route::middleware(['auth', 'verified'])->group(function () {


    Route::get('/dashboard', [UrlController::class, 'index'])->name('dashboard');


    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    Route::post('/urls', [UrlController::class, 'store'])->name('urls.store');
    Route::put('/urls/{id}', [UrlController::class, 'update'])->name('urls.update');
    Route::delete('/urls/{id}', [UrlController::class, 'destroy'])->name('urls.destroy');
});


Route::get('/{code}', [RedirectController::class, 'redirect'])
    ->where('code', '[a-zA-Z0-9_-]+')
    ->name('redirect');
