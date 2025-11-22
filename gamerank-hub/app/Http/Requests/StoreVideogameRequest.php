<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreVideogameRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'genre' => 'required|string|max:255',
            'developer' => 'required|string|max:255',
            'release_year' => 'required|integer|min:1950|max:' . (date('Y') + 5),
            'cover_image' => 'nullable|url',
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'El título es obligatorio',
            'genre.required' => 'El género es obligatorio',
            'developer.required' => 'El desarrollador es obligatorio',
            'release_year.required' => 'El año de lanzamiento es obligatorio',
            'release_year.min' => 'El año debe ser mayor a 1950',
            'release_year.max' => 'El año no puede ser mayor a ' . (date('Y') + 5),
        ];
    }
}