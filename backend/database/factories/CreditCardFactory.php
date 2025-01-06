<?php

namespace Database\Factories;

use App\Models\CreditCard;
use App\Models\Client;
use Illuminate\Database\Eloquent\Factories\Factory;

class CreditCardFactory extends Factory
{
    protected $model = CreditCard::class;

    public function definition()
    {
        return [
            'card_type' => $this->faker->word(),
            'cardholder_name' => $this->faker->name(),
            'card_number' => $this->faker->creditCardNumber(),
            'expiration_date' => $this->faker->creditCardExpirationDateString(),
            'cvv' => '123',
            'cardholder_document' => '999.999.999-99',
            'client_id' => Client::inRandomOrder()->first()->id,
        ];
    }
}
