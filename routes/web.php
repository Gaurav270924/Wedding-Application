<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WeddingController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| Web Routes - K&A Wedding Portal
|--------------------------------------------------------------------------
*/

// Public wedding portal
Route::get('/', [WeddingController::class, 'index'])->name('home');
Route::post('/wishes', [WeddingController::class, 'storeWish'])->name('wishes.store');
Route::post('/rsvp', [WeddingController::class, 'storeRsvp'])->name('rsvp.store');

// Admin Authentication Routes
Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login'])->name('login.post');
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    // Protected Admin Panel
    Route::middleware('auth')->group(function () {
        Route::get('/', function () {
            return redirect()->route('admin.dashboard');
        })->name('index');

        Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
        Route::get('/content', [AdminController::class, 'content'])->name('content');
        Route::post('/content', [AdminController::class, 'saveContent'])->name('content.save');
        Route::post('/content/reset', [AdminController::class, 'resetContent'])->name('content.reset');
        Route::post('/upload', [AdminController::class, 'upload'])->name('upload');
        Route::get('/rsvps', [AdminController::class, 'rsvps'])->name('rsvps');
        Route::get('/wishes', [AdminController::class, 'wishes'])->name('wishes');
        Route::get('/events', [AdminController::class, 'events'])->name('events');

        // Actions
        Route::post('/wishes/{id}/toggle', [AdminController::class, 'toggleWishApproval'])->name('wishes.toggle');
        Route::delete('/wishes/{id}', [AdminController::class, 'deleteWish'])->name('wishes.delete');
        Route::delete('/rsvps/{id}', [AdminController::class, 'deleteRsvp'])->name('rsvps.delete');
        Route::get('/rsvps/export', [AdminController::class, 'exportRsvps'])->name('rsvps.export');
    });
});
