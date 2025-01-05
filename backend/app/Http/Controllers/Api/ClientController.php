<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;
use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $clients = Client::where('user_id', Auth::id())->get();

            return response()->json([
                'success' => true,
                'data' => $clients,
            ]);
        } catch (\Exception $e) {
            Log::error("Error fetching clients: {$e->getMessage()}");

            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve clients.',
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreClientRequest $request)
    {
        try {
            $data = $request->validated();

            $data['user_id'] = Auth::id();

            $client = Client::create($data);

            return response()->json([
                'success' => true,
                'message' => 'Client created successfully.',
                'data' => $client,
            ], 201);
        } catch (\Exception $e) {
            Log::error("Error creating client: {$e->getMessage()}");

            return response()->json([
                'success' => false,
                'message' => 'Failed to create client.',
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Client $client)
    {
        try {
            return response()->json([
                'success' => true,
                'data' => $client,
            ]);
        } catch (\Exception $e) {
            Log::error("Error fetching client: {$e->getMessage()}");

            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve client.',
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateClientRequest $request, Client $client)
    {
        try {
            if ($client->user_id !== Auth::id()) {
                return response()->json([
                    'success' => false,
                    'message' => 'You are not authorized to update this client.',
                ], 403);
            }

            $client->update($request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Client updated successfully.',
                'data' => $client,
            ]);
        } catch (\Exception $e) {
            Log::error("Error updating client: {$e->getMessage()}");

            return response()->json([
                'success' => false,
                'message' => 'Failed to update client.',
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Client $client)
    {
        try {
            if ($client->user_id !== Auth::id()) {
                return response()->json([
                    'success' => false,
                    'message' => 'You are not authorized to delete this client.',
                ], 403);
            }

            $client->delete();

            return response()->json([
                'success' => true,
                'message' => 'Client deleted successfully.',
            ]);
        } catch (\Exception $e) {
            Log::error("Error deleting client: {$e->getMessage()}");

            return response()->json([
                'success' => false,
                'message' => 'Failed to delete client.',
            ], 500);
        }
    }
}
