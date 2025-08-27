import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Article {
    id: number;
    title: string;
    slug: string;
    topic: string;
    content: string;
    meta_description: string;
    seo_score: number;
    status: string;
    created_at: string;
    updated_at: string;
    keywords?: Array<{keyword: string; search_volume: number; competition: string}>;
    outline?: Array<{type: string; content: string}>;
    seo_tags?: string[];
    schema_markup?: Record<string, unknown>;
    seo_analysis?: {
        score: number;
        checklist: Array<{item: string; passed: boolean}>;
    };
}

interface Props {
    article: Article;
    [key: string]: unknown;
}

export default function ArticlesShow({ article }: Props) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'published': return 'text-green-700 bg-green-100';
            case 'draft': return 'text-yellow-700 bg-yellow-100';
            case 'archived': return 'text-gray-700 bg-gray-100';
            default: return 'text-gray-700 bg-gray-100';
        }
    };

    const getSeoScoreColor = (score: number) => {
        if (score >= 80) return 'text-green-600 bg-green-100';
        if (score >= 60) return 'text-yellow-600 bg-yellow-100';
        return 'text-red-600 bg-red-100';
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this article?')) {
            router.delete(route('articles.destroy', article.id));
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        // You could add a toast notification here
    };

    return (
        <AppShell>
            <Head title={`${article.title} - SEO Content Generator`} />
            
            <div className="container mx-auto p-6 max-w-6xl">
                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-4">
                            <Link 
                                href={route('articles.index')}
                                className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                            >
                                ← Back to Articles
                            </Link>
                        </div>
                        
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            {article.title}
                        </h1>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(article.status)}`}>
                                {article.status}
                            </span>
                            
                            {article.topic && (
                                <span className="flex items-center gap-1">
                                    🎯 Topic: {article.topic}
                                </span>
                            )}
                            
                            <span>
                                📅 Created {new Date(article.created_at).toLocaleDateString()}
                            </span>
                            
                            {article.updated_at !== article.created_at && (
                                <span>
                                    ✏️ Updated {new Date(article.updated_at).toLocaleDateString()}
                                </span>
                            )}
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3 ml-6">
                        <Link href={route('articles.edit', article.id)}>
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                ✏️ Edit Article
                            </Button>
                        </Link>
                        <Button 
                            variant="destructive" 
                            onClick={handleDelete}
                        >
                            🗑️ Delete
                        </Button>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* SEO Analysis */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    <span className="flex items-center gap-2">
                                        📊 SEO Analysis
                                    </span>
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getSeoScoreColor(article.seo_score)}`}>
                                        {article.seo_score}/100
                                    </span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {article.seo_analysis?.checklist ? (
                                    <div className="space-y-3">
                                        {article.seo_analysis.checklist.map((item, index) => (
                                            <div key={index} className="flex items-center gap-3">
                                                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                                                    item.passed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                                                }`}>
                                                    {item.passed ? '✓' : '✗'}
                                                </span>
                                                <span className={item.passed ? 'text-gray-700' : 'text-red-600'}>
                                                    {item.item}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500">No SEO analysis available. Edit the article to generate analysis.</p>
                                )}
                            </CardContent>
                        </Card>

                        {/* Content */}
                        <Card>
                            <CardHeader>
                                <CardTitle>📝 Article Content</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {article.content ? (
                                    <div className="prose max-w-none">
                                        <div dangerouslySetInnerHTML={{ __html: article.content }} />
                                    </div>
                                ) : (
                                    <p className="text-gray-500 italic">No content yet. Edit the article to add content.</p>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Meta Description */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">📄 Meta Description</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {article.meta_description ? (
                                    <div>
                                        <p className="text-sm text-gray-700 mb-3">
                                            {article.meta_description}
                                        </p>
                                        <div className="flex items-center justify-between text-xs text-gray-500">
                                            <span>{article.meta_description.length}/160 characters</span>
                                            <Button 
                                                size="sm" 
                                                variant="outline"
                                                onClick={() => copyToClipboard(article.meta_description)}
                                            >
                                                📋 Copy
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-sm">No meta description yet.</p>
                                )}
                            </CardContent>
                        </Card>

                        {/* SEO Tags */}
                        {article.seo_tags && article.seo_tags.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center justify-between">
                                        🏷️ SEO Tags
                                        <Button 
                                            size="sm" 
                                            variant="outline"
                                            onClick={() => copyToClipboard(article.seo_tags?.join(', ') || '')}
                                        >
                                            📋 Copy
                                        </Button>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {article.seo_tags.map((tag, index) => (
                                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Schema Markup */}
                        {article.schema_markup && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center justify-between">
                                        🔧 Schema Markup
                                        <Button 
                                            size="sm" 
                                            variant="outline"
                                            onClick={() => copyToClipboard(JSON.stringify(article.schema_markup, null, 2))}
                                        >
                                            📋 Copy JSON-LD
                                        </Button>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
                                        {JSON.stringify(article.schema_markup, null, 2)}
                                    </pre>
                                </CardContent>
                            </Card>
                        )}

                        {/* Keywords */}
                        {article.keywords && article.keywords.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">🔍 Keywords</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {article.keywords.slice(0, 5).map((keyword, index) => (
                                            <div key={index} className="border-b pb-2 last:border-b-0">
                                                <p className="font-medium text-sm">{keyword.keyword}</p>
                                                <p className="text-xs text-gray-500">
                                                    {keyword.search_volume?.toLocaleString()} searches • {keyword.competition} competition
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">🚀 Export Options</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button className="w-full justify-start" variant="outline">
                                    🌐 Generate Landing Page
                                </Button>
                                <Button className="w-full justify-start" variant="outline">
                                    📄 Export as HTML
                                </Button>
                                <Button className="w-full justify-start" variant="outline">
                                    📋 Copy WordPress Tags
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}