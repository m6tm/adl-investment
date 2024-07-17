<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact;

class ContactController extends Controller
{
    public function create()
    {
        return view('pages.home.home');
    }

    public function store(Request $request)
    {
        // Validation des données
        $request->validate([
            'nom' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'sujet' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        // Création du contact
        Contact::create($request->all());

        // Redirection ou réponse appropriée
        return redirect()->back()->with('success', 'Votre message a été envoyé avec succès.');
    }
}
