import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Article {
    id: number;
    title: string;
    slug: string;
    topic: string;
    status: string;
    seo_score: number;
    created_at: string;
    updated_at: string;
}

interface PaginatedArticles {
    data: Article[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Props {
    articles: PaginatedArticles;
    [key: string]: unknown;
}

export default function ArticlesIndex({ articles }: Props) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'published': return 'text-green-700 bg-green-100';
            case 'draft': return 'text-yellow-700 bg-yellow-100';
            case 'archived': return 'text-gray-700 bg-gray-100';
            default: return 'text-gray-700 bg-gray-100';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'published': return 'Dipublikasi';
            case 'draft': return 'Draf';
            case 'archived': return 'Diarsipkan';
            default: return status;
        }
    };

    const getSeoScoreColor = (score: number) => {
        if (score >= 80) return 'text-green-600';
        if (score >= 60) return 'text-yellow-600';
        return 'text-red-600';
    };

    return (
        <AppShell>
            <Head title="Artikel Saya - Generator Konten SEO" />
            
            <div className="container mx-auto p-6 max-w-6xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-3xl">📚</span>
                            <h1 className="text-3xl font-bold text-gray-900">Artikel Saya</h1>
                        </div>
                        <p className="text-gray-600">
                            Kelola konten SEO Anda dan pantau performanya
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <Link href={route('seo.index')}>
                            <Button variant="outline" className="flex items-center gap-2">
                                🔍 Riset Kata Kunci
                            </Button>
                        </Link>
                        <Link href={route('articles.create')}>
                            <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
                                ✍️ Artikel Baru
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <span className="text-blue-600 text-xl">📄</span>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">{articles.total}</p>
                                    <p className="text-sm text-gray-600">Total Artikel</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <span className="text-green-600 text-xl">✅</span>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">
                                        {articles.data.filter(a => a.status === 'published').length}
                                    </p>
                                    <p className="text-sm text-gray-600">Dipublikasi</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-yellow-100 rounded-lg">
                                    <span className="text-yellow-600 text-xl">📝</span>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">
                                        {articles.data.filter(a => a.status === 'draft').length}
                                    </p>
                                    <p className="text-sm text-gray-600">Draf</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-purple-100 rounded-lg">
                                    <span className="text-purple-600 text-xl">📊</span>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">
                                        {articles.data.length > 0 
                                            ? Math.round(articles.data.reduce((acc, a) => acc + a.seo_score, 0) / articles.data.length)
                                            : 0
                                        }
                                    </p>
                                    <p className="text-sm text-gray-600">Rata-rata Skor SEO</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Articles List */}
                {articles.data.length > 0 ? (
                    <div className="space-y-4">
                        {articles.data.map((article) => (
                            <Card key={article.id} className="hover:shadow-lg transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-start gap-4 mb-3">
                                                <div>
                                                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                                                        <Link 
                                                            href={route('articles.show', article.id)}
                                                            className="hover:text-blue-600 transition-colors"
                                                        >
                                                            {article.title}
                                                        </Link>
                                                    </h3>
                                                    {article.topic && (
                                                        <p className="text-gray-600 mb-2">
                                                            Topik: {article.topic}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(article.status)}`}>
                                                    {getStatusText(article.status)}
                                                </span>
                                                
                                                <span className="flex items-center gap-1">
                                                    📊 Skor SEO: 
                                                    <span className={`font-semibold ${getSeoScoreColor(article.seo_score)}`}>
                                                        {article.seo_score}/100
                                                    </span>
                                                </span>
                                                
                                                <span>
                                                    📅 {new Date(article.created_at).toLocaleDateString('id-ID')}
                                                </span>
                                                
                                                {article.updated_at !== article.created_at && (
                                                    <span>
                                                        ✏️ Diperbarui {new Date(article.updated_at).toLocaleDateString('id-ID')}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-2 ml-4">
                                            <Link href={route('articles.edit', article.id)}>
                                                <Button variant="outline" size="sm">
                                                    Edit
                                                </Button>
                                            </Link>
                                            <Link href={route('articles.show', article.id)}>
                                                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                                    Lihat
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card className="text-center py-12">
                        <CardContent>
                            <div className="text-6xl mb-4">📝</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                Belum ada artikel
                            </h3>
                            <p className="text-gray-600 mb-6 max-w-md mx-auto">
                                Mulai membuat konten SEO dengan tools bertenaga AI kami. 
                                Riset kata kunci, buat kerangka, dan tulis artikel berperingkat tinggi.
                            </p>
                            <div className="flex items-center justify-center gap-3">
                                <Link href={route('seo.index')}>
                                    <Button variant="outline">
                                        🔍 Mulai dengan Kata Kunci
                                    </Button>
                                </Link>
                                <Link href={route('articles.create')}>
                                    <Button className="bg-blue-600 hover:bg-blue-700">
                                        ✍️ Buat Artikel
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Pagination */}
                {articles.last_page > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-8">
                        {Array.from({ length: articles.last_page }, (_, i) => i + 1).map((page) => (
                            <Link
                                key={page}
                                href={`${route('articles.index')}?page=${page}`}
                                className={`px-3 py-1 rounded ${
                                    page === articles.current_page
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {page}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </AppShell>
    );
}