<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\User;
use Illuminate\Database\Seeder;

class ClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        User::all()->each(function ($user) {
            Client::factory()->count(15)->create([
                'user_id' => $user->id,
            ]);
        });
    }
}
