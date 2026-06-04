<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ContactResource;
use App\Models\Contact;
use Illuminate\Http\JsonResponse;

class ContactController extends Controller
{
    /**
     * Display a listing of all contact messages.
     */
    public function index(): JsonResponse
    {
        $contacts = Contact::latest()->get();

        return response()->json(['data' => ContactResource::collection($contacts)]);
    }

    /**
     * Display the specified contact message.
     */
    public function show(Contact $contact): JsonResponse
    {
        if (!$contact->is_read) {
            $contact->update(['is_read' => true]);
        }

        return response()->json(['data' => new ContactResource($contact)]);
    }

    /**
     * Remove the specified contact message.
     */
    public function destroy(Contact $contact): JsonResponse
    {
        $contact->delete();

        return response()->json([
            'message' => 'Contact message deleted successfully.',
        ]);
    }
}

