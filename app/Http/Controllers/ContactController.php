<?php

namespace App\Http\Controllers;

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

        dd(request()->input());

        // Redirection ou réponse appropriée
        return redirect()->back()->with('success', 'Votre message a été envoyé avec succès.');
    }
}
