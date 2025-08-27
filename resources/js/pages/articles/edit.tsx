import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import InputError from '@/components/input-error';

interface Article {
    id: number;
    title: string;
    topic: string;
    content: string;
    meta_description: string;
    status: string;
    seo_score: number;
}

interface Props {
    article: Article;
    [key: string]: unknown;
}

export default function ArticlesEdit({ article }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        title: article.title,
        topic: article.topic || '',
        content: article.content || '',
        meta_description: article.meta_description || '',
        status: article.status,
    });

    const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
    const seoScore = article.seo_score || 0;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        put(route('articles.update', article.id));
    };

    const getSeoScoreColor = (score: number) => {
        if (score >= 80) return 'text-green-600 bg-green-100';
        if (score >= 60) return 'text-yellow-600 bg-yellow-100';
        return 'text-red-600 bg-red-100';
    };

    return (
        <AppShell>
            <Head title={`Edit: ${article.title} - Generator Konten SEO`} />
            
            <div className="container mx-auto p-6 max-w-6xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-3xl">✏️</span>
                            <h1 className="text-3xl font-bold text-gray-900">Edit Artikel</h1>
                        </div>
                        <p className="text-gray-600">
                            Optimalkan konten Anda dengan analisis SEO real-time
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <div className={`px-4 py-2 rounded-lg ${getSeoScoreColor(seoScore)}`}>
                            <span className="font-semibold">Skor SEO: {seoScore}/100</span>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Main Editor */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Basic Info */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>📄 Informasi Artikel</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                            Judul *
                                        </label>
                                        <Input
                                            id="title"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            className="text-lg"
                                            placeholder="Masukkan judul artikel..."
                                            required
                                        />
                                        <InputError message={errors.title} className="mt-2" />
                                    </div>

                                    <div>
                                        <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
                                            Topik Utama/Kata Kunci
                                        </label>
                                        <Input
                                            id="topic"
                                            value={data.topic}
                                            onChange={(e) => setData('topic', e.target.value)}
                                            placeholder="Kata kunci fokus utama..."
                                        />
                                        <InputError message={errors.topic} className="mt-2" />
                                    </div>

                                    <div>
                                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                                            Status
                                        </label>
                                        <select
                                            id="status"
                                            value={data.status}
                                            onChange={(e) => setData('status', e.target.value)}
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                        >
                                            <option value="draft">Draf</option>
                                            <option value="published">Dipublikasi</option>
                                            <option value="archived">Diarsipkan</option>
                                        </select>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Content Editor */}
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle>📝 Editor Konten</CardTitle>
                                        <div className="flex gap-2">
                                            <Button
                                                type="button"
                                                variant={activeTab === 'edit' ? 'default' : 'outline'}
                                                size="sm"
                                                onClick={() => setActiveTab('edit')}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                type="button"
                                                variant={activeTab === 'preview' ? 'default' : 'outline'}
                                                size="sm"
                                                onClick={() => setActiveTab('preview')}
                                            >
                                                Preview
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    {activeTab === 'edit' ? (
                                        <div>
                                            <textarea
                                                value={data.content}
                                                onChange={(e) => setData('content', e.target.value)}
                                                placeholder="Mulai menulis konten artikel Anda..."
                                                className="w-full h-96 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                                            />
                                            <InputError message={errors.content} className="mt-2" />
                                            <p className="text-sm text-gray-500 mt-2">
                                                Jumlah kata: {data.content.split(' ').filter(w => w.length > 0).length}
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="min-h-96 prose max-w-none p-4 border border-gray-200 rounded-lg bg-gray-50">
                                            {data.content ? (
                                                <div dangerouslySetInnerHTML={{ __html: data.content.replace(/\n/g, '<br>') }} />
                                            ) : (
                                                <p className="text-gray-500 italic">Tidak ada konten untuk preview</p>
                                            )}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Actions */}
                            <div className="flex items-center justify-between">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => window.history.back()}
                                >
                                    Batal
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-600 hover:bg-blue-700"
                                >
                                    {processing ? '💾 Menyimpan...' : '💾 Simpan Artikel'}
                                </Button>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Meta Description */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>📄 Meta Description</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div>
                                        <textarea
                                            value={data.meta_description}
                                            onChange={(e) => setData('meta_description', e.target.value)}
                                            placeholder="Tulis meta description yang menarik..."
                                            className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            maxLength={160}
                                        />
                                        <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                                            <span>{data.meta_description.length}/160 karakter</span>
                                            <Button type="button" variant="outline" size="sm">
                                                🤖 Buat dengan AI
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* SEO Checklist */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        📊 Daftar Periksa SEO
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <span className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold">✓</span>
                                            <span className="text-sm">Judul mengandung kata kunci</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="w-5 h-5 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-xs font-bold">!</span>
                                            <span className="text-sm">Panjang konten (300+ kata)</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="w-5 h-5 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold">✗</span>
                                            <span className="text-sm">Meta description ditambahkan</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </form>
            </div>
        </AppShell>
    );
}