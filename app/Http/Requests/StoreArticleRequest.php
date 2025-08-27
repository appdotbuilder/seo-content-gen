<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreArticleRequest extends FormRequest
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
            'title' => 'required|string|max:255',
            'topic' => 'nullable|string',
            'keywords' => 'nullable|array',
            'outline' => 'nullable|array',
            'content' => 'nullable|string',
            'meta_description' => 'nullable|string|max:160',
            'seo_tags' => 'nullable|array',
            'schema_markup' => 'nullable|array',
            'status' => 'nullable|in:draft,published,archived',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Article title is required.',
            'title.max' => 'Article title must not exceed 255 characters.',
            'meta_description.max' => 'Meta description must not exceed 160 characters.',
            'status.in' => 'Status must be draft, published, or archived.',
        ];
    }
}