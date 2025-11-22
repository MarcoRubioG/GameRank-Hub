<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\VideogameController;

// Rutas públicas
Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
});

// Rutas protegidas
Route::prefix('auth')->middleware('auth:api')->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::get('me', [AuthController::class, 'me']);
});

// Rutas públicas de videojuegos 
Route::get('videogames', [VideogameController::class, 'index']);
Route::get('videogames/{id}', [VideogameController::class, 'show']);

// Rutas protegidas de videojuegos 
Route::middleware('auth:api')->group(function () {
    Route::post('videogames', [VideogameController::class, 'store']);
    Route::put('videogames/{id}', [VideogameController::class, 'update']);
    Route::delete('videogames/{id}', [VideogameController::class, 'destroy']);
});