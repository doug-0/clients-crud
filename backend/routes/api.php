<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\CreditCardController;

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::resource('/clients', ClientController::class);

    Route::post('/credit-card/multiple', [CreditCardController::class, 'createMultipleCreditCardsforCustomer']);

    Route::put('/credit-card/multiple', [CreditCardController::class, 'updateMultipleCreditCards']);

    Route::delete('/credit-card/multiple', [CreditCardController::class, 'deleteMultipleCreditCards']);

    Route::resource('/credit-card', CreditCardController::class);

    Route::get('/me',  function () {
        return response()->json(['user' => auth()->user()]);
    });
});

