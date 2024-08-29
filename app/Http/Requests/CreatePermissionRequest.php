<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreatePermissionRequest extends FormRequest
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
            'permissions' => 'required|array',
            'permissions.*.code' => 'required|regex:/^[a-z]+(\.[a-z]+)*$/|unique:permissions,name',
            'permissions.*.description' => 'required|min:5|string',
        ];
    }

    public function messages()
    {
        return [
            // 'permissions.required' => 'Le champ permissions est obligatoire.',
            // 'permissions.array' => 'Le champ permissions doit être un tableau.',
            // 'permissions.*.code.required' => 'Le code de permission est obligatoire.',
            // 'permissions.*.code.regex' => 'Le code de permission doit être en minuscules et peut contenir des points.',
            // 'permissions.*.code.unique' => 'Ce code de permission existe déjà.',
            // 'permissions.*.description.required' => 'La description de la permission est obligatoire.',
            // 'permissions.*.description.min' => 'La description de la permission doit contenir au moins 5 caractères.',
            // 'permissions.*.description.string' => 'La description de la permission doit être une chaîne de caractères.'
        ];
    }
}
