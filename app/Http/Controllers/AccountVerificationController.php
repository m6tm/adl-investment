<?php

namespace App\Http\Controllers;

use App\Enums\DOCUMENT_STATUS;
use Illuminate\Http\Request;

class AccountVerificationController extends Controller
{
    function index() {
        $DOCUMENT_STATUS = DOCUMENT_STATUS::class;
        return view('dashboard.pages.verification-account.index', compact('DOCUMENT_STATUS'));
    }
}
