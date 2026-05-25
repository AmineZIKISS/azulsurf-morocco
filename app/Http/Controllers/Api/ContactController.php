<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ContactResource;
use App\Models\Contact;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'full_name' => 'required|max:255',
            'email' => 'required|email',
            'phone_number' => 'nullable|max:20',
            'subject' => 'required|max:255',
            'selected_service' => 'nullable|in:Surf Camp,Surf School,Surf Package,Surf Guiding,Other',
            'message' => 'required|min:10',
        ]);

        $contact = Contact::create($validated);

        return response()->json([
            'message' => 'Your message has been sent successfully.',
            'data' => new ContactResource($contact),
        ], 201);
    }
}
