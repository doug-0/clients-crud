<?php

namespace App\Http\Controllers\Api;

use App\Models\CreditCard;
use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class CreditCardController extends Controller
{
    public function index()
    {
        $clients = Auth::user()->clients;

        $creditCards = CreditCard::whereIn('client_id', $clients->pluck('id'))->get();

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
            'client_id' => 'required|integer|exists:clients,id',
        ]);

        $client = Client::findOrFail($data['client_id']);

        if ($client->user_id !== Auth::id()) {
            return response()->json([
                'message' => 'Unauthorized, the related client does not belong to you.',
            ], 401);
        }

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

        if ($creditCard->client->user_id !== Auth::id()) {
            return response()->json([
                'message' => 'Unauthorized, the related client does not belong to you.',
            ], 401);
        }

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
            'client_id' => 'required|integer|exists:clients,id',
        ]);

        $creditCard = CreditCard::findOrFail($id);

        if ($creditCard->client->user_id !== Auth::id()) {
            return response()->json([
                'message' => 'Unauthorized, the related client does not belong to you.',
            ], 401);
        }

        $expirationDate = Carbon::createFromFormat('m/y', $data['expiration_date'])->endOfMonth();

        if ($expirationDate->isPast()) {
            return response()->json(['message' => 'The expiration date cannot be less than to the current month.'], 400);
        }

        $data['card_type'] = getCCType($request->card_number);

        $creditCard->update($data);

        return response()->json(['Credit Card updated successfully.'], 200);
    }

    public function destroy($id)
    {
        $creditCard = CreditCard::findOrFail($id);

        if ($creditCard->client->user_id !== Auth::id()) {
            return response()->json([
                'message' => 'Unauthorized, the related client does not belong to you.',
            ], 401);
        }

        $creditCard->delete();

        return response()->json(['Credit Card deleted successfully.'], 200);
    }

    public function createMultipleCreditCardsforCustomer(Request $request)
    {
        $data = $request->validate([
            'client_id' => 'required|integer|exists:clients,id',
            'credit_cards' => 'required|array',
            'credit_cards.*.cardholder_name' => 'required|string',
            'credit_cards.*.card_number' => 'required|string',
            'credit_cards.*.cardholder_document' => 'required|string',
            'credit_cards.*.cvv' => 'required|string',
            'credit_cards.*.expiration_date' => 'required|string|date_format:m/y',
        ]);

        $client = Client::findOrFail($data['client_id']);

        if ($client->user_id !== Auth::id()) {
            return response()->json([
                'message' => 'Unauthorized, the related client does not belong to you.',
            ], 401);
        }

        $invalidCards = collect($data['credit_cards'])->filter(function ($cardData) {
            $expirationDate = Carbon::createFromFormat('m/y', $cardData['expiration_date'])->endOfMonth();

            return $expirationDate->isPast();
        });

        if ($invalidCards->isNotEmpty()) {
            $errors = $invalidCards->map(function ($cardData) {
                return "The expiration date for cardholder '{$cardData['cardholder_name']}, {$cardData['expiration_date']}' cannot be less than the current month.";
            });

            return response()->json(['message' => 'Validation failed', 'errors' => $errors->toArray()], 400);
        }

        foreach ($data['credit_cards'] as $cardData) {
            $cardData['card_type'] = getCCType($cardData['card_number']);

            $cardData['client_id'] = $client->id;

            CreditCard::create($cardData);
        }

        return response()->json(['message' => 'Credit cards created successfully.']);
    }

    public function updateMultipleCreditCards(Request $request)
    {
        $data = $request->validate([
            'client_id' => 'required|integer|exists:clients,id',
            'credit_cards' => 'required|array',
            'credit_cards.*.id' => 'required|integer|exists:credit_cards,id',
            'credit_cards.*.cardholder_name' => 'nullable|string',
            'credit_cards.*.card_number' => 'nullable|string',
            'credit_cards.*.cardholder_document' => 'nullable|string',
            'credit_cards.*.cvv' => 'nullable|string',
            'credit_cards.*.expiration_date' => 'nullable|string|date_format:m/y',
        ]);

        $client = Client::findOrFail($data['client_id']);

        if ($client->user_id !== Auth::id()) {
            return response()->json([
                'message' => 'Unauthorized, the related client does not belong to you.',
            ], 401);
        }

        $errors = [];

        foreach ($data['credit_cards'] as $cardData) {
            $creditCard = CreditCard::find($cardData['id']);

            if ($creditCard->client_id !== $client->id) {
                $errors[] = "The credit card with ID {$creditCard->id} does not belong to the specified client.";
                continue;
            }

            if (!empty($cardData['expiration_date'])) {
                $expirationDate = Carbon::createFromFormat('m/y', $cardData['expiration_date'])->endOfMonth();

                if ($expirationDate->isPast()) {
                    $errors[] = "The expiration date for card with ID {$creditCard->id}, {$cardData['expiration_date']} cannot be less than the current month.";
                    continue;
                }
            }
        }

        if (!empty($errors)) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $errors,
            ], 400);
        }

        foreach ($data['credit_cards'] as $cardData) {
            $creditCard = CreditCard::find($cardData['id']);
            $creditCard->update(array_filter($cardData));
        }

        return response()->json(['message' => 'Credit cards updated successfully.']);
    }

    public function deleteMultipleCreditCards(Request $request)
    {
        $data = $request->validate([
            'client_id' => 'required|integer|exists:clients,id',
            'credit_card_ids' => 'required|array',
            'credit_card_ids.*' => 'required|integer|exists:credit_cards,id',
        ]);

        $client = Client::findOrFail($data['client_id']);

        if ($client->user_id !== Auth::id()) {
            return response()->json([
                'message' => 'Unauthorized, the related client does not belong to you.',
            ], 401);
        }

        $invalidCards = CreditCard::whereIn('id', $data['credit_card_ids'])
            ->where('client_id', '!=', $client->id)
            ->get();

        if ($invalidCards->isNotEmpty()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $invalidCards->pluck('id')->map(function ($id) {
                    return "The credit card with ID {$id} does not belong to the specified client.";
                }),
            ], 400);
        }

        CreditCard::whereIn('id', $data['credit_card_ids'])->delete();

        return response()->json(['message' => 'Credit cards deleted successfully.']);
    }
}

