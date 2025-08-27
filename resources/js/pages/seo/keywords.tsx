import React from 'react';
import { Head } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Keyword {
    keyword: string;
    search_volume: number;
    competition: 'low' | 'medium' | 'high';
    content_type: string;
    lsi_keywords: string[];
}

interface Props {
    keywords: Keyword[];
    topic: string;
    [key: string]: unknown;
}

export default function SeoKeywords({ keywords, topic }: Props) {
    const getCompetitionColor = (competition: string) => {
        switch (competition) {
            case 'low': return 'text-green-600 bg-green-100';
            case 'medium': return 'text-yellow-600 bg-yellow-100';
            case 'high': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getCompetitionText = (competition: string) => {
        switch (competition) {
            case 'low': return 'rendah';
            case 'medium': return 'sedang';
            case 'high': return 'tinggi';
            default: return competition;
        }
    };

    const getContentTypeText = (contentType: string) => {
        switch (contentType) {
            case 'blog post': return 'artikel blog';
            case 'tutorial': return 'tutorial';
            case 'guide': return 'panduan';
            case 'list': return 'daftar';
            case 'review': return 'ulasan';
            default: return contentType;
        }
    };

    return (
        <AppShell>
            <Head title={`Kata Kunci untuk "${topic}" - Generator Konten SEO`} />
            
            <div className="container mx-auto p-6 max-w-6xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Hasil Riset Kata Kunci
                    </h1>
                    <p className="text-gray-600">
                        Ditemukan {keywords.length} kata kunci untuk: <strong>{topic}</strong>
                    </p>
                </div>

                <div className="grid gap-4">
                    {keywords.map((keyword, index) => (
                        <Card key={index} className="hover:shadow-md transition-shadow">
                            <CardHeader>
                                <CardTitle className="text-xl">{keyword.keyword}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                                    <span>📊 {keyword.search_volume.toLocaleString()} pencarian/bulan</span>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCompetitionColor(keyword.competition)}`}>
                                        kompetisi {getCompetitionText(keyword.competition)}
                                    </span>
                                    <span>📄 {getContentTypeText(keyword.content_type)}</span>
                                </div>
                                
                                {keyword.lsi_keywords.length > 0 && (
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-700 mb-2">Kata Kunci LSI:</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {keyword.lsi_keywords.map((lsi, lsiIndex) => (
                                                <span key={lsiIndex} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                                                    {lsi}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AppShell>
    );
}