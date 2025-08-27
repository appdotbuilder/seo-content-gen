<?php

namespace Database\Factories;

use App\Models\Article;
use App\Models\Keyword;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Keyword>
 */
class KeywordFactory extends Factory
{
    protected $model = Keyword::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $keywords = [
            'digital marketing tips',
            'best SEO practices',
            'content marketing strategy',
            'social media growth',
            'email marketing automation',
            'web design trends',
            'online business ideas',
            'productivity hacks',
            'healthy lifestyle tips',
            'financial planning guide'
        ];

        $keyword = fake()->randomElement($keywords);

        return [
            'article_id' => Article::factory(),
            'keyword' => $keyword,
            'search_volume' => fake()->numberBetween(100, 50000),
            'competition' => fake()->randomElement(['low', 'medium', 'high']),
            'content_type' => fake()->randomElement(['blog post', 'tutorial', 'guide', 'list', 'review']),
            'lsi_keywords' => fake()->words(5),
            'is_completed' => fake()->boolean(30),
            'is_selected' => fake()->boolean(20),
        ];
    }
}