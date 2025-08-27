import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Keyword {
    keyword: string;
    search_volume: number;
    competition: 'low' | 'medium' | 'high';
    content_type: string;
    lsi_keywords: string[];
    is_completed: boolean;
    is_selected: boolean;
}

interface Props {
    keywords?: Keyword[];
    topic?: string;
    [key: string]: unknown;
}

export default function SeoIndex({ keywords = [], topic = '' }: Props) {
    const [currentTopic, setCurrentTopic] = useState(topic);
    const [isGenerating, setIsGenerating] = useState(false);
    const [currentStep, setCurrentStep] = useState<'topic' | 'keywords' | 'outline' | 'content'>('topic');

    const handleGenerateKeywords = (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentTopic.trim()) return;

        setIsGenerating(true);
        router.post(route('seo.keywords'), 
            { topic: currentTopic },
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    setCurrentStep('keywords');
                    setIsGenerating(false);
                },
                onError: () => {
                    setIsGenerating(false);
                }
            }
        );
    };

    const getCompetitionColor = (competition: string) => {
        switch (competition) {
            case 'low': return 'text-green-600 bg-green-100';
            case 'medium': return 'text-yellow-600 bg-yellow-100';
            case 'high': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    return (
        <AppShell>
            <Head title="SEO Content Generator" />
            
            <div className="container mx-auto p-6 max-w-6xl">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-4xl">📝</span>
                        <h1 className="text-3xl font-bold text-gray-900">SEO Content Generator</h1>
                    </div>
                    <p className="text-lg text-gray-600">
                        Create high-ranking content with AI-powered keyword research and optimization
                    </p>
                </div>

                {/* Progress Steps */}
                <div className="mb-8">
                    <div className="flex items-center justify-between max-w-2xl">
                        <div className={`flex items-center gap-2 ${currentStep === 'topic' ? 'text-blue-600' : 'text-gray-400'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                                currentStep === 'topic' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
                            }`}>1</div>
                            <span className="font-medium">Topic</span>
                        </div>
                        
                        <div className="flex-1 h-0.5 bg-gray-200 mx-4"></div>
                        
                        <div className={`flex items-center gap-2 ${currentStep === 'keywords' ? 'text-blue-600' : 'text-gray-400'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                                currentStep === 'keywords' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
                            }`}>2</div>
                            <span className="font-medium">Keywords</span>
                        </div>
                        
                        <div className="flex-1 h-0.5 bg-gray-200 mx-4"></div>
                        
                        <div className={`flex items-center gap-2 ${currentStep === 'outline' ? 'text-blue-600' : 'text-gray-400'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                                currentStep === 'outline' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
                            }`}>3</div>
                            <span className="font-medium">Outline</span>
                        </div>
                        
                        <div className="flex-1 h-0.5 bg-gray-200 mx-4"></div>
                        
                        <div className={`flex items-center gap-2 ${currentStep === 'content' ? 'text-blue-600' : 'text-gray-400'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                                currentStep === 'content' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
                            }`}>4</div>
                            <span className="font-medium">Content</span>
                        </div>
                    </div>
                </div>

                {/* Step 1: Topic Input */}
                {currentStep === 'topic' && (
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span>🎯</span>
                                Enter Your Topic
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleGenerateKeywords} className="space-y-4">
                                <div>
                                    <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
                                        What topic would you like to create content about?
                                    </label>
                                    <Input
                                        id="topic"
                                        type="text"
                                        value={currentTopic}
                                        onChange={(e) => setCurrentTopic(e.target.value)}
                                        placeholder="e.g., digital marketing, healthy recipes, home fitness..."
                                        className="text-lg"
                                        required
                                    />
                                    <p className="text-sm text-gray-500 mt-1">
                                        Be specific for better keyword suggestions
                                    </p>
                                </div>
                                <Button 
                                    type="submit" 
                                    disabled={isGenerating || !currentTopic.trim()}
                                    className="bg-blue-600 hover:bg-blue-700"
                                >
                                    {isGenerating ? (
                                        <span className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Generating Keywords...
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            🔍 Generate Keywords
                                        </span>
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                )}

                {/* Step 2: Keywords Display */}
                {keywords.length > 0 && (
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span>🔍</span>
                                Keyword Research Results
                                <span className="text-sm font-normal text-gray-500">({keywords.length} keywords found)</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4">
                                {keywords.map((keyword, index) => (
                                    <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-lg text-gray-900 mb-1">
                                                    {keyword.keyword}
                                                </h3>
                                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                                    <span className="flex items-center gap-1">
                                                        📊 {keyword.search_volume.toLocaleString()} searches/month
                                                    </span>
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCompetitionColor(keyword.competition)}`}>
                                                        {keyword.competition} competition
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        📄 {keyword.content_type}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button variant="outline" size="sm">
                                                    Select
                                                </Button>
                                                <Button variant="ghost" size="sm">
                                                    ✓
                                                </Button>
                                            </div>
                                        </div>
                                        
                                        {keyword.lsi_keywords.length > 0 && (
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-700 mb-2">LSI Keywords:</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {keyword.lsi_keywords.map((lsi, lsiIndex) => (
                                                        <span key={lsiIndex} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                                                            {lsi}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            
                            <div className="flex items-center justify-between mt-6 pt-6 border-t">
                                <Button 
                                    variant="outline" 
                                    onClick={() => {
                                        setCurrentStep('topic');
                                        setCurrentTopic('');
                                    }}
                                >
                                    ← Back to Topic
                                </Button>
                                <Button className="bg-blue-600 hover:bg-blue-700">
                                    Generate Outline →
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Getting Started Guide */}
                {currentStep === 'topic' && keywords.length === 0 && (
                    <div className="grid md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <span>💡</span>
                                    How It Works
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold mt-0.5">1</div>
                                    <div>
                                        <h4 className="font-medium">Enter Your Topic</h4>
                                        <p className="text-sm text-gray-600">Start with any topic you want to create content about</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold mt-0.5">2</div>
                                    <div>
                                        <h4 className="font-medium">Get Keyword Ideas</h4>
                                        <p className="text-sm text-gray-600">AI generates relevant keywords with search volume and competition data</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold mt-0.5">3</div>
                                    <div>
                                        <h4 className="font-medium">Create Optimized Content</h4>
                                        <p className="text-sm text-gray-600">Generate outlines, write content, and get real-time SEO analysis</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <span>🎯</span>
                                    Topic Examples
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {[
                                        'Email marketing automation',
                                        'Healthy meal prep ideas',
                                        'Home workout routines',
                                        'Social media strategy',
                                        'Personal finance tips',
                                        'Digital photography basics'
                                    ].map((example, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentTopic(example)}
                                            className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                                        >
                                            <span className="text-blue-600">💼</span> {example}
                                        </button>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </AppShell>
    );
}