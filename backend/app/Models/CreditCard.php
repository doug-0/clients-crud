<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;

class CreditCard extends Model
{
    use HasFactory;

    protected $fillable = [
        'card_type',
        'cardholder_name',
        'card_number',
        'expiration_date',
        'cvv',
        'cardholder_document',
    ];

    public function setCardNumberAttribute($value)
    {
        $this->attributes['card_number'] = Crypt::encryptString($value);
    }

    public function setExpirationDateAttribute($value)
    {
        $this->attributes['expiration_date'] = Crypt::encryptString($value);
    }

    public function setCvvAttribute($value)
    {
        $this->attributes['cvv'] = Crypt::encryptString($value);
    }

    public function getCardNumberAttribute($value)
    {
        return Crypt::decryptString($value);
    }

    public function getExpirationDateAttribute($value)
    {
        return Crypt::decryptString($value);
    }

    public function getCvvAttribute($value)
    {
        return Crypt::decryptString($value);
    }
}
