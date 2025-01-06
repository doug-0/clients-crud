<?php

namespace Database\Factories;

use App\Models\Client;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ClientFactory extends Factory
{
    protected $model = Client::class;

    public function definition()
    {
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'phone' => $this->faker->phoneNumber(),
            'address' => $this->faker->address(),
            'cep' => $this->faker->postcode(),
            'address_number' => $this->faker->buildingNumber(),
            'address_complement' => $this->faker->secondaryAddress(),
            'neighborhood' => $this->faker->word(),
            'city' => $this->faker->city(),
            'state' => $this->faker->state(),
            'user_id' => User::inRandomOrder()->first()->id,
            'birth_day' => $this->faker->date(),
            'second_name' => $this->faker->word(),
        ];
    }
}
