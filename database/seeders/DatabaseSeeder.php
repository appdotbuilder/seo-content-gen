<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Article;
use App\Models\Keyword;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create test user
        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // Create sample articles for the test user
        $articles = Article::factory(5)->create([
            'user_id' => $user->id,
        ]);

        // Create keywords for each article
        foreach ($articles as $article) {
            Keyword::factory(random_int(3, 8))->create([
                'article_id' => $article->id,
            ]);
        }

        // Create additional users with articles
        User::factory(3)->create()->each(function ($user) {
            $articles = Article::factory(random_int(2, 5))->create([
                'user_id' => $user->id,
            ]);

            foreach ($articles as $article) {
                Keyword::factory(random_int(3, 8))->create([
                    'article_id' => $article->id,
                ]);
            }
        });
    }
}