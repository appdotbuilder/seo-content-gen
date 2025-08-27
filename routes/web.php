<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\SeoController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    // Article routes
    Route::resource('articles', ArticleController::class);
    
    // SEO routes
    Route::post('/seo/keywords', [SeoController::class, 'store'])->name('seo.keywords');
});

// SEO Content Generator (main feature on home page)
Route::get('/seo', function () {
    return Inertia::render('seo/index');
})->name('seo.index');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
