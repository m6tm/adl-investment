<?php

namespace App\Http\Requests\User;

use App\Models\Country;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Storage;

class CreateUserRequest extends FormRequest
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
        $countries_name = Country::all()->pluck('name')->toArray();
        return [
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg|max:500|dimensions:max_width=800,max_height=800',
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users',
            'telephone' => 'required|string|max:20',
            'username' => 'required|string|max:255|unique:users,pseudo',
            'birth_date' => 'required|date|before_or_equal:' . now()->subYears(19)->format('Y-m-d'),
            'ville' => 'nullable|string|max:255',
            'pays' => 'nullable|string|in:' . implode(',', $countries_name)
        ];
    }

    public function messages()
    {
        return [
            'birth_date.before_or_equal' => __('users.requests.birth_date_before_or_equal'),
        ];
    }
}
