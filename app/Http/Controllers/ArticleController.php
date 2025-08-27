<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreArticleRequest;
use App\Http\Requests\UpdateArticleRequest;
use App\Models\Article;
use App\Services\SeoService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $articles = Article::where('user_id', Auth::id())
            ->latest()
            ->paginate(10);
        
        return Inertia::render('articles/index', [
            'articles' => $articles
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('articles/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreArticleRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = Auth::id();
        
        $article = Article::create($data);

        return redirect()->route('articles.show', $article)
            ->with('success', 'Article created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Article $article)
    {
        if ($article->user_id !== Auth::id()) {
            abort(403);
        }
        
        $article->load('articleKeywords');
        
        return Inertia::render('articles/show', [
            'article' => $article
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Article $article)
    {
        if ($article->user_id !== Auth::id()) {
            abort(403);
        }
        
        $article->load('articleKeywords');
        
        return Inertia::render('articles/edit', [
            'article' => $article
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateArticleRequest $request, Article $article)
    {
        if ($article->user_id !== Auth::id()) {
            abort(403);
        }
        
        $article->update($request->validated());

        return redirect()->route('articles.show', $article)
            ->with('success', 'Article updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        if ($article->user_id !== Auth::id()) {
            abort(403);
        }
        
        $article->delete();

        return redirect()->route('articles.index')
            ->with('success', 'Article deleted successfully.');
    }
}