<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\CreditCardController;

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::resource('/clients', ClientController::class);

    Route::resource('/credit-card', CreditCardController::class);
});

