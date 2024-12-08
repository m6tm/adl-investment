<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

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
        return [
            'dial_code' => 'required|regex:/^\+[0-9]{1,}$/',
            'ticket_1' => 'required|numeric',
            'ticket_2' => 'required|numeric',
            'ticket_5' => 'required|numeric',
            'ticket_10' => 'required|numeric',
        ];
    }
}
