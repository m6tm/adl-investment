<?php

namespace App\Http\Controllers;

use App\Jobs\ProcessContact;
use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function create()
    {
        return view('web.pages.home.home');
    }

    public function store(Request $request)
    {
        // Validation des données
        $request->validate([
            'nom' => 'required|string',
            'email' => 'required|email',
            'sujet' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $contact = new Contact();
        $contact->nom = request('nom');
        $contact->email = request('email');
        $contact->sujet = request('sujet');
        $contact->message = request('description');
        $contact->save();

        ProcessContact::dispatch($contact)->onQueue('ContactProcess');

        // Redirection ou réponse appropriée
        return redirect()->back()->with('success', 'Votre message a été envoyé avec succès.');
    }
}
