<?php

namespace App\Http\Controllers;

use App\Enums\DOCUMENT_STATUS;
use App\Models\Country;
use Illuminate\Http\Request;

class AccountVerificationController extends Controller
{
    function index() {
        $DOCUMENT_STATUS = DOCUMENT_STATUS::class;
        $pays = Country::all();
        return view('dashboard.pages.verification-account.index', compact('DOCUMENT_STATUS', 'pays'));
    }

    function adminVerifications() {
        return view('dashboard.pages.verification-account.admin-verifications');
    }
}
