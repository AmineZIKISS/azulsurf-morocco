<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;

class ContactController extends Controller
{
    /**
     * Display a listing of all contact messages.
     */
    public function index(): View
    {
        $contacts = Contact::latest()->get();

        return view('admin.contacts.index', compact('contacts'));
    }

    /**
     * Display the specified contact message.
     */
    public function show(Contact $contact): View
    {
        return view('admin.contacts.show', compact('contact'));
    }

    /**
     * Remove the specified contact message.
     */
    public function destroy(Contact $contact): RedirectResponse
    {
        $contact->delete();

        return redirect()->route('admin.contacts.index')
            ->with('success', 'Contact message deleted successfully.');
    }
}
