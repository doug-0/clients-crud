<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        User::create([
            'name' => 'João',
            'email' => 'joao@email.com',
            'password' => bcrypt('123456'),
        ]);

        User::create([
            'name' => 'Maria',
            'email' => 'maria@email.com',
            'password' => bcrypt('123456'),
        ]);

        User::create([
            'name' => 'Pedro',
            'email' => 'pedro@email.com',
            'password' => bcrypt('123456'),
        ]);
    }
}
