<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Storage;

class SetCountryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $devises = Storage::disk('data')->get('Currencies.json');
        $devises = json_decode($devises, true);
        $devises = array_map(fn($devise) => $devise['code'], array_values($devises));

        $dialscode = Storage::disk('data')->get('CountryCodes.json');
        $dials_code = json_decode($dialscode, true);
        $dials_code = array_map(fn($dial) => $dial['dial_code'], array_values($dials_code));

        return [
            'dial_code' => 'required|in:' . implode(',', $dials_code),
            'devise' => 'required|in:' . implode(',', $devises),
            'ticket_1' => 'required|numeric',
            'ticket_2' => 'required|numeric',
            'ticket_5' => 'required|numeric',
            'ticket_10' => 'required|numeric',
        ];
    }
}
