<?php

use App\Models\User;
use App\Services\SeoService;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('seo service can generate keywords for topic', function () {
    $seoService = new SeoService();
    $keywords = $seoService->generateKeywords('digital marketing');
    
    expect($keywords)->toBeArray()
        ->and(count($keywords))->toBeGreaterThan(0);
    
    foreach ($keywords as $keyword) {
        expect($keyword)->toHaveKeys([
            'keyword', 'search_volume', 'competition', 'content_type', 'lsi_keywords'
        ]);
    }
});

test('seo service can generate article outline', function () {
    $seoService = new SeoService();
    $outline = $seoService->generateOutline('digital marketing guide');
    
    expect($outline)->toBeArray()
        ->and(count($outline))->toBeGreaterThan(0);
    
    foreach ($outline as $section) {
        expect($section)->toHaveKey('type')
            ->and($section)->toHaveKey('content');
    }
});

test('seo service can analyze content for seo score', function () {
    $seoService = new SeoService();
    $content = str_repeat('This is test content about digital marketing. ', 100);
    
    $analysis = $seoService->analyzeSeo($content, 'digital marketing');
    
    expect($analysis)->toHaveKeys(['score', 'checklist'])
        ->and($analysis['score'])->toBeInt()
        ->and($analysis['score'])->toBeGreaterThanOrEqual(0)
        ->and($analysis['score'])->toBeLessThanOrEqual(100)
        ->and($analysis['checklist'])->toBeArray();
});

test('seo service can generate meta descriptions', function () {
    $seoService = new SeoService();
    $content = 'This is test content about digital marketing strategies and best practices.';
    
    $descriptions = $seoService->generateMetaDescriptions($content, 'digital marketing');
    
    expect($descriptions)->toBeArray()
        ->and(count($descriptions))->toBeGreaterThan(0);
    
    foreach ($descriptions as $description) {
        expect(strlen($description))->toBeLessThanOrEqual(160);
    }
});

test('seo service can generate seo tags', function () {
    $seoService = new SeoService();
    $tags = $seoService->generateSeoTags('digital marketing', ['SEO', 'marketing', 'online']);
    
    expect($tags)->toBeArray()
        ->and(count($tags))->toBeGreaterThan(0)
        ->and($tags)->toContain('digital marketing');
});

test('seo service can generate json-ld schema', function () {
    $seoService = new SeoService();
    $schema = $seoService->generateSchema('Test Title', 'Test content', 'Test description');
    
    expect($schema)->toHaveKeys(['@context', '@type', 'headline'])
        ->and($schema['@context'])->toBe('https://schema.org')
        ->and($schema['@type'])->toBe('Article')
        ->and($schema['headline'])->toBe('Test Title');
});

test('authenticated users can generate keywords', function () {
    $user = User::factory()->create();
    
    $response = $this->actingAs($user)->post(route('seo.keywords'), [
        'topic' => 'digital marketing'
    ]);
    
    $response->assertStatus(200);
});

test('keyword generation requires topic', function () {
    $user = User::factory()->create();
    
    $response = $this->actingAs($user)->post(route('seo.keywords'), []);
    
    $response->assertSessionHasErrors(['topic']);
});

test('guest users can access seo index page', function () {
    $response = $this->get(route('seo.index'));
    
    $response->assertStatus(200)
        ->assertInertia(fn ($page) => $page->component('seo/index'));
});