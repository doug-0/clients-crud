<?php

namespace App\Http\Controllers\Api;

use App\Models\CreditCard;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use App\Http\Controllers\Controller;
use Carbon\Carbon;

class CreditCardController extends Controller
{
    public function index()
    {
        $creditCards = CreditCard::all();

        return response()->json($creditCards);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'cardholder_name' => 'required|string',
            'card_number' => 'required|string',
            'cardholder_document' => 'required|string',
            'cvv' => 'required|string',
            'expiration_date' => 'required|string|date_format:m/y',
        ]);

        $expirationDate = Carbon::createFromFormat('m/y', $data['expiration_date'])->endOfMonth();

        if ($expirationDate->isPast()) {
            return response()->json(['message' => 'The expiration date cannot be less than to the current month.'], 400);
        }

        $data['card_type'] = getCCType($request->card_number);

        CreditCard::create($data);

        return response()->json(['message' => 'Credit Card created successfully.']);
    }

    public function show($id)
    {
        $creditCard = CreditCard::findOrFail($id);

        return response()->json($creditCard);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'cardholder_name' => 'required|string',
            'card_number' => 'required|string',
            'cardholder_document' => 'required|string',
            'cvv' => 'required|string',
            'expiration_date' => 'required|string|date_format:m/y',
        ]);

        $expirationDate = Carbon::createFromFormat('m/y', $data['expiration_date'])->endOfMonth();

        if ($expirationDate->isPast()) {
            return response()->json(['message' => 'The expiration date cannot be less than to the current month.'], 400);
        }

        $data['card_type'] = getCCType($request->card_number);

        $creditCard = CreditCard::findOrFail($id);

        $creditCard->update($data);

        return response()->json(['Credit Card updated successfully.'], 200);
    }

    public function destroy($id)
    {
        $creditCard = CreditCard::findOrFail($id);

        $creditCard->delete();

        return response()->json(['Credit Card deleted successfully.'], 200);
    }
}

