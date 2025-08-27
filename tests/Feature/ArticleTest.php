<?php

use App\Models\Article;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('authenticated users can view their articles', function () {
    $user = User::factory()->create();
    $articles = Article::factory(3)->create(['user_id' => $user->id]);
    
    $response = $this->actingAs($user)->get(route('articles.index'));
    
    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->component('articles/index')
            ->has('articles.data', 3)
    );
});

test('users cannot view other users articles', function () {
    $user1 = User::factory()->create();
    $user2 = User::factory()->create();
    $article = Article::factory()->create(['user_id' => $user1->id]);
    
    $response = $this->actingAs($user2)->get(route('articles.show', $article));
    
    $response->assertStatus(403);
});

test('authenticated users can create articles', function () {
    $user = User::factory()->create();
    
    $articleData = [
        'title' => 'Test Article',
        'topic' => 'Test Topic',
        'status' => 'draft'
    ];
    
    $response = $this->actingAs($user)->post(route('articles.store'), $articleData);
    
    $response->assertRedirect();
    $this->assertDatabaseHas('articles', [
        'title' => 'Test Article',
        'user_id' => $user->id
    ]);
});

test('article creation requires title', function () {
    $user = User::factory()->create();
    
    $response = $this->actingAs($user)->post(route('articles.store'), [
        'topic' => 'Test Topic'
    ]);
    
    $response->assertSessionHasErrors(['title']);
});

test('users can update their own articles', function () {
    $user = User::factory()->create();
    $article = Article::factory()->create(['user_id' => $user->id]);
    
    $updateData = [
        'title' => 'Updated Title',
        'topic' => 'Updated Topic'
    ];
    
    $response = $this->actingAs($user)->put(route('articles.update', $article), $updateData);
    
    $response->assertRedirect();
    $this->assertDatabaseHas('articles', [
        'id' => $article->id,
        'title' => 'Updated Title'
    ]);
});

test('users can delete their own articles', function () {
    $user = User::factory()->create();
    $article = Article::factory()->create(['user_id' => $user->id]);
    
    $response = $this->actingAs($user)->delete(route('articles.destroy', $article));
    
    $response->assertRedirect(route('articles.index'));
    $this->assertDatabaseMissing('articles', ['id' => $article->id]);
});

test('guest users cannot access article routes', function () {
    $article = Article::factory()->create();
    
    $this->get(route('articles.index'))->assertRedirect(route('login'));
    $this->get(route('articles.create'))->assertRedirect(route('login'));
    $this->get(route('articles.show', $article))->assertRedirect(route('login'));
    $this->post(route('articles.store'), [])->assertRedirect(route('login'));
});