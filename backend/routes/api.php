<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ClientController;

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::resource('/clients', ClientController::class);
});

