<?php

namespace Database\Factories;

use App\Models\Article;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Article>
 */
class ArticleFactory extends Factory
{
    protected $model = Article::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $topics = [
            'digital marketing',
            'healthy eating',
            'home fitness',
            'personal finance',
            'social media',
            'content creation',
            'web development',
            'photography',
            'travel tips',
            'productivity'
        ];

        $topic = fake()->randomElement($topics);
        $title = ucfirst($topic) . ' ' . fake()->randomElement([
            'guide for beginners',
            'best practices',
            'tips and tricks',
            'complete tutorial',
            'strategies that work',
            'ultimate guide'
        ]);

        return [
            'user_id' => User::factory(),
            'title' => $title,
            'slug' => fake()->slug(),
            'topic' => $topic,
            'keywords' => $this->generateKeywords($topic),
            'outline' => $this->generateOutline($title),
            'content' => fake()->paragraphs(10, true),
            'meta_description' => fake()->sentence(20),
            'seo_tags' => fake()->words(5),
            'schema_markup' => $this->generateSchema($title),
            'seo_analysis' => $this->generateSeoAnalysis(),
            'status' => fake()->randomElement(['draft', 'published', 'archived']),
            'seo_score' => fake()->numberBetween(50, 100),
        ];
    }

    public function generateKeywords(string $topic): array
    {
        return [
            [
                'keyword' => $topic,
                'search_volume' => fake()->numberBetween(1000, 50000),
                'competition' => fake()->randomElement(['low', 'medium', 'high']),
                'content_type' => 'guide',
                'lsi_keywords' => fake()->words(5)
            ],
            [
                'keyword' => 'best ' . $topic,
                'search_volume' => fake()->numberBetween(500, 20000),
                'competition' => fake()->randomElement(['low', 'medium', 'high']),
                'content_type' => 'list',
                'lsi_keywords' => fake()->words(5)
            ]
        ];
    }

    public function generateOutline(string $title): array
    {
        return [
            ['type' => 'heading', 'level' => 1, 'content' => $title],
            ['type' => 'heading', 'level' => 2, 'content' => 'Introduction'],
            ['type' => 'paragraph', 'content' => 'Brief introduction'],
            ['type' => 'heading', 'level' => 2, 'content' => 'Main Benefits'],
            ['type' => 'heading', 'level' => 2, 'content' => 'Step-by-Step Guide'],
            ['type' => 'heading', 'level' => 2, 'content' => 'Conclusion']
        ];
    }

    public function generateSchema(string $title): array
    {
        return [
            '@context' => 'https://schema.org',
            '@type' => 'Article',
            'headline' => $title,
            'author' => ['@type' => 'Person', 'name' => fake()->name()],
            'datePublished' => fake()->dateTimeThisYear()->format('c'),
            'wordCount' => fake()->numberBetween(800, 3000)
        ];
    }

    public function generateSeoAnalysis(): array
    {
        return [
            'score' => fake()->numberBetween(50, 100),
            'checklist' => [
                ['item' => 'Content length (300+ words)', 'passed' => true],
                ['item' => 'Keyword density (1-3%)', 'passed' => fake()->boolean(80)],
                ['item' => 'Proper heading structure', 'passed' => fake()->boolean(90)],
                ['item' => 'Images have alt text', 'passed' => fake()->boolean(70)],
                ['item' => 'Contains links (2+)', 'passed' => fake()->boolean(85)]
            ]
        ];
    }
}