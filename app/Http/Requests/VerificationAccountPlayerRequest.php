<?php

namespace App\Http\Requests;

use App\Enums\DOCUMENT_TYPE;
use App\Enums\USER_ROLE;
use App\Enums\USER_VERIFICATION_STATUS;
use App\Helpers\AuthHelper;
use App\Models\Country;
use App\Models\DocumentAutorise;
use App\Models\PaysDocumentAutorise;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Collection;

class VerificationAccountPlayerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return AuthHelper::hasRole(USER_ROLE::PLAYER) && auth()->user()->verification_status !== USER_VERIFICATION_STATUS::VERIFIED;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        /**
         * @var Country $country
         */
        $country = auth()->user()->pays;
        /**
         * @var Collection $documents_autorises
         */
        $documents_autorises = $country->documents_autorises;

        $rules = [];
        foreach ($documents_autorises as $documents_autorise) {
            /**
             * @var PaysDocumentAutorise $documents_autorise
             */
            $documents_autorise = $documents_autorise;
            /**
             * @var DocumentAutorise $documents_autorise
             */
            $current_document_autorise = $documents_autorise->documents_autorise;
            switch ($current_document_autorise->type) {
                case DOCUMENT_TYPE::SELFIE:
                    $rules = [
                        ...$rules,
                        'selfie_photo' => [
                            'required_without:selfie_photo_hidden',
                            'mimes:jpg,jpeg,png',
                            'max:1024'
                        ],
                    ];
                    break;
    
                case DOCUMENT_TYPE::CNI:
                    $rules = [
                        ...$rules,
                        'cni_recto_photo' => [
                            'required_without:cni_recto_photo_hidden',
                            'mimes:jpg,jpeg,png,pdf',
                            'max:1024'
                        ],
                        'cni_verso_photo' => [
                            'required_without:cni_verso_photo_hidden',
                            'mimes:jpg,jpeg,png,pdf',
                            'max:1024'
                        ],
                    ];
                    break;
                    
                case DOCUMENT_TYPE::PASSPORT:
                    $rules = [
                        ...$rules,
                        'passport_recto_photo' => [
                            'required_without:passport_recto_photo_hidden',
                            'mimes:jpg,jpeg,png,pdf',
                            'max:1024'
                        ],
                        'passport_verso_photo' => [
                            'required_without:passport_verso_photo_hidden',
                            'mimes:jpg,jpeg,png,pdf',
                            'max:1024'
                        ],
                    ];
                    break;
                    
                case DOCUMENT_TYPE::PERMIS_CONDUIRE:
                        $rules = [
                            ...$rules,
                            'permis_cond_recto_photo' => [
                                'required_without:permis_cond_recto_photo_hidden',
                                'mimes:jpg,jpeg,png,pdf',
                                'max:1024'
                            ],
                            'permis_cond_verso_photo' => [
                                'required_without:permis_cond_verso_photo_hidden',
                                'mimes:jpg,jpeg,png,pdf',
                                'max:1024'
                            ],
                        ];
                        break;
                        
                    case DOCUMENT_TYPE::PREUVE_RESIDENCE:
                            $rules = [
                                ...$rules,
                                'preuve_residence' => 'required_without:preuve_residence_hidden|array|max:2',
                                'preuve_residence.*' => [
                                    'mimes:jpg,jpeg,png,pdf',
                                    'max:1024'
                                ],
                            ];
                    break;
                
                default:
                    break;
            }
        }

        return [
            'nom' => 'required',
            'prenom' => 'required',
            'email' => 'required',
            'telephone' => 'required',
            'street' => 'required',
            ...$rules
        ];
    }
}
