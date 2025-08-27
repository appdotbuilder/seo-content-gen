<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Services\SeoService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SeoController extends Controller
{
    /**
     * The SEO service instance.
     *
     * @var SeoService
     */
    protected SeoService $seoService;

    /**
     * Create a new controller instance.
     *
     * @param SeoService $seoService
     * @return void
     */
    public function __construct(SeoService $seoService)
    {
        $this->seoService = $seoService;
    }

    /**
     * Generate keyword ideas for a given topic.
     *
     * @param Request $request
     * @return \Inertia\Response|\Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'topic' => 'required|string|max:255',
            'article_id' => 'nullable|exists:articles,id'
        ]);

        $keywords = $this->seoService->generateKeywords($request->topic);
        
        if ($request->article_id) {
            $article = Article::findOrFail($request->article_id);
            if ($article->user_id !== auth()->id()) {
                abort(403);
            }
            
            // Save keywords to database
            $article->articleKeywords()->delete();
            foreach ($keywords as $keywordData) {
                $article->articleKeywords()->create($keywordData);
            }
            
            return redirect()->route('articles.edit', $article);
        }

        return Inertia::render('seo/keywords', [
            'keywords' => $keywords,
            'topic' => $request->topic
        ]);
    }
}