<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\CreditCard;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();

        $clientsByDay = Client::where('user_id', $user->id)
            ->select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as total_clients'))
            ->groupBy(DB::raw('DATE(created_at)'))
            ->orderBy(DB::raw('DATE(created_at)'), 'asc')
            ->get();

        $creditCardsByDay = CreditCard::join('clients', 'credit_cards.client_id', '=', 'clients.id')
            ->where('clients.user_id', $user->id)
            ->select(DB::raw('DATE(credit_cards.created_at) as date'), DB::raw('count(*) as total_credit_cards'))
            ->groupBy(DB::raw('DATE(credit_cards.created_at)'))
            ->orderBy(DB::raw('DATE(credit_cards.created_at)'), 'asc')
            ->get();

        $result = [];

        foreach ($clientsByDay as $clientData) {
            $date = $clientData->date;
            $clientCount = $clientData->total_clients;

            $creditCardData = $creditCardsByDay->firstWhere('date', $date);
            $creditCardCount = $creditCardData ? $creditCardData->total_credit_cards : 0;

            $result[] = [
                'date' => $date,
                'client' => $clientCount,
                'creditCard' => $creditCardCount
            ];
        }

        foreach ($creditCardsByDay as $creditCardData) {
            $date = $creditCardData->date;

            if (!in_array($date, array_column($result, 'date'))) {
                $result[] = [
                    'date' => $date,
                    'client' => 0,
                    'creditCard' => $creditCardData->total_credit_cards
                ];
            }
        }

        return response()->json($result);
    }
}
