<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    /** @use HasFactory<\Database\Factories\ClientFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'phone',
        'address',
        'cep',
        'address_number',
        'address_complement',
        'neighborhood',
        'city',
        'state',
        'user_id'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
