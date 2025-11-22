<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateVideogameRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'genre' => 'sometimes|string|max:255',
            'developer' => 'sometimes|string|max:255',
            'release_year' => 'sometimes|integer|min:1950|max:' . (date('Y') + 5),
            'cover_image' => 'nullable|url',
        ];
    }

    public function messages(): array
    {
        return [
            'title.string' => 'El título debe ser texto',
            'genre.string' => 'El género debe ser texto',
            'developer.string' => 'El desarrollador debe ser texto',
            'release_year.min' => 'El año debe ser mayor a 1950',
            'release_year.max' => 'El año no puede ser mayor a ' . (date('Y') + 5),
        ];
    }
}