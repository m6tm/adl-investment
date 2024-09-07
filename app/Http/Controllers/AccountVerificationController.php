<?php

namespace App\Http\Controllers;

use App\Enums\DOCUMENT_STATUS;
use App\Enums\DOCUMENT_TYPE;
use App\Enums\USER_ROLE;
use App\Enums\USER_VERIFICATION_STATUS;
use App\Helpers\AuthHelper;
use App\Http\Requests\VerificationAccountPlayerRequest;
use App\Models\Country;
use App\Models\Document;
use App\Models\DocumentAutorise;
use App\Models\PaysDocumentAutorise;
use App\Models\User;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

class AccountVerificationController extends Controller
{
    function index() {
        if (!AuthHelper::hasRole(USER_ROLE::PLAYER)) return redirect()->back()->withErrors(__('dashboard/backend.not-access'));
        $DOCUMENT_STATUS = DOCUMENT_STATUS::class;
        $pays = Country::all();
        $DOCUMENT_TYPE = DOCUMENT_TYPE::class;
        return view('dashboard.pages.verification-account.index', compact('DOCUMENT_STATUS', 'pays', 'DOCUMENT_TYPE'));
    }

    function verificationAccount(VerificationAccountPlayerRequest $request) {
        /**
         * @var Country $country
         */
        $country = auth()->user()->pays;
        /**
         * @var Collection $documents_autorises
         */
        $documents_autorises = $country->documents_autorises;
        /**
         * @var Collection $user_documents
         */
        $user_documents = auth()->user()->documents;

        foreach ($documents_autorises as $documents_autorise) {
            $document = new Document;
            $document->document_autorise_id = $documents_autorise->id;
            $document->user_id = auth()->id();

            /**
             * @var PaysDocumentAutorise $documents_autorise
             */
            $documents_autorise = $documents_autorise;
            /**
             * @var DocumentAutorise $documents_autorise
             */
            $current_document_autorise = $documents_autorise->documents_autorise;
            $path = 'uploads/verification_account';
            $files_path = [];
            switch ($current_document_autorise->type) {
                case DOCUMENT_TYPE::SELFIE:
                    $has_selfie_document = $user_documents->filter(fn(Document $doc) => $doc->document_autorise->type == DOCUMENT_TYPE::SELFIE)->count() > 0;
                    if ($has_selfie_document) $document = $user_documents->filter(fn(Document $doc) => $doc->document_autorise->type == DOCUMENT_TYPE::SELFIE)->first();

                    $unique_name = strtoupper(uniqid()) . '_' . request()->file('selfie_photo')->getFilename();
                    $unique_name = Str::slug($unique_name) . '.' . request()->file('selfie_photo')->getClientOriginalExtension();
                    request()->file('selfie_photo')->move(public_path("$path/SELFIE"), $unique_name);
                    $files_path[] = "$path/SELFIE/$unique_name";
                    break;
                    
                case DOCUMENT_TYPE::CNI:
                    $has_cni_document = $user_documents->filter(fn(Document $doc) => $doc->document_autorise->type == DOCUMENT_TYPE::CNI)->count() > 0;
                    if ($has_cni_document) $document = $user_documents->filter(fn(Document $doc) => $doc->document_autorise->type == DOCUMENT_TYPE::CNI)->first();

                    $unique_name_recto = strtoupper(uniqid()) . '_recto_' . request()->file('cni_recto_photo')->getFilename();
                    $unique_name_verso = strtoupper(uniqid()) . '_verso_' . request()->file('cni_verso_photo')->getFilename();
                    $unique_name_recto = Str::slug($unique_name_recto) . '.' . request()->file('cni_recto_photo')->getClientOriginalExtension();
                    $unique_name_verso = Str::slug($unique_name_verso) . '.' . request()->file('cni_verso_photo')->getClientOriginalExtension();
                    request()->file('cni_recto_photo')->move(public_path("$path/CNI"), $unique_name_recto);
                    request()->file('cni_verso_photo')->move(public_path("$path/CNI"), $unique_name_verso);
                    $files_path[] = "$path/CNI/$unique_name_recto";
                    $files_path[] = "$path/CNI/$unique_name_verso";
                    break;
                        
                case DOCUMENT_TYPE::PASSPORT:
                    $has_passport_document = $user_documents->filter(fn(Document $doc) => $doc->document_autorise->type == DOCUMENT_TYPE::PASSPORT)->count() > 0;
                    if ($has_passport_document) $document = $user_documents->filter(fn(Document $doc) => $doc->document_autorise->type == DOCUMENT_TYPE::PASSPORT)->first();

                    $unique_name_recto = strtoupper(uniqid()) . '_recto_' . request()->file('passport_recto_photo')->getFilename();
                    $unique_name_verso = strtoupper(uniqid()) . '_verso_' . request()->file('passport_verso_photo')->getFilename();
                    $unique_name_recto = Str::slug($unique_name_recto) . '.' . request()->file('passport_recto_photo')->getClientOriginalExtension();
                    $unique_name_verso = Str::slug($unique_name_verso) . '.' . request()->file('passport_verso_photo')->getClientOriginalExtension();
                    request()->file('passport_recto_photo')->move(public_path("$path/PASSPORT"), $unique_name_recto);
                    request()->file('passport_verso_photo')->move(public_path("$path/PASSPORT"), $unique_name_verso);
                    $files_path[] = "$path/PASSPORT/$unique_name_recto";
                    $files_path[] = "$path/PASSPORT/$unique_name_verso";
                    break;
                    
                case DOCUMENT_TYPE::PERMIS_CONDUIRE:
                    $has_permis_conduire_document = $user_documents->filter(fn(Document $doc) => $doc->document_autorise->type == DOCUMENT_TYPE::PERMIS_CONDUIRE)->count() > 0;
                    if ($has_permis_conduire_document) $document = $user_documents->filter(fn(Document $doc) => $doc->document_autorise->type == DOCUMENT_TYPE::PERMIS_CONDUIRE)->first();

                    $unique_name_recto = strtoupper(uniqid()) . '_recto_' . request()->file('permis_cond_recto_photo')->getFilename();
                    $unique_name_verso = strtoupper(uniqid()) . '_verso_' . request()->file('permis_cond_verso_photo')->getFilename();
                    $unique_name_recto = Str::slug($unique_name_recto) . '.' . request()->file('permis_cond_recto_photo')->getClientOriginalExtension();
                    $unique_name_verso = Str::slug($unique_name_verso) . '.' . request()->file('permis_cond_verso_photo')->getClientOriginalExtension();
                    request()->file('permis_cond_recto_photo')->move(public_path("$path/PERMIS_CONDUIRE"), $unique_name_recto);
                    request()->file('permis_cond_verso_photo')->move(public_path("$path/PERMIS_CONDUIRE"), $unique_name_verso);
                    $files_path[] = "$path/PERMIS_CONDUIRE/$unique_name_recto";
                    $files_path[] = "$path/PERMIS_CONDUIRE/$unique_name_verso";
                    break;
                        
                case DOCUMENT_TYPE::PREUVE_RESIDENCE:
                    $has_preuve_residence_document = $user_documents->filter(fn(Document $doc) => $doc->document_autorise->type == DOCUMENT_TYPE::PREUVE_RESIDENCE)->count() > 0;
                    if ($has_preuve_residence_document) $document = $user_documents->filter(fn(Document $doc) => $doc->document_autorise->type == DOCUMENT_TYPE::PREUVE_RESIDENCE)->first();

                    foreach (request()->file('preuve_residence') as $preuve_residence) {
                        $unique_name = strtoupper(uniqid()) . '_' . $preuve_residence->getFilename();
                        $unique_name = Str::slug($unique_name) . '.' . $preuve_residence->getClientOriginalExtension();
                        $preuve_residence->move(public_path("$path/PREUVE_RESIDENCE"), $unique_name);
                        $files_path[] = "$path/PREUVE_RESIDENCE/$unique_name";
                    }
                    break;
                
                default:
                    break;
            }
            $document->statuts = DOCUMENT_STATUS::PENDING;
            $document->path = json_encode($files_path);
            $document->save();
        }

        $user = User::find(auth()->id());
        $user->verification_status = USER_VERIFICATION_STATUS::PENDING;
        $user->update();
        
        return redirect()->route('dashboard.profile.edit')->with('success', __('settings.verification_account.player-success'));
    }

    function adminVerifications() {
        return view('dashboard.pages.verification-account.admin-verifications');
    }

    function adminVerificationsCheck(int $player_id) {
        $user = User::find($player_id);
        return view('dashboard.pages.verification-account.admin-verification-user', compact('user'));
    }
}
