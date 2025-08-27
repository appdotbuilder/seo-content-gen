import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type SharedData } from '@/types';

export default function Dashboard() {
    const { auth } = usePage<SharedData>().props;

    return (
        <AppShell>
            <Head title="Dashboard - SEO Content Generator" />
            
            <div className="container mx-auto p-6 max-w-6xl">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Welcome back, {auth.user?.name || 'User'}! 👋
                    </h1>
                    <p className="text-lg text-gray-600">
                        Ready to create some high-ranking content?
                    </p>
                </div>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <Card className="hover:shadow-lg transition-shadow border-blue-200">
                        <CardHeader className="text-center pb-4">
                            <div className="text-4xl mb-3">🔍</div>
                            <CardTitle className="text-xl">Keyword Research</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                            <p className="text-gray-600 mb-4">
                                Generate keyword ideas with search volume and competition analysis
                            </p>
                            <Link href={route('seo.index')}>
                                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                    Start Research
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow border-green-200">
                        <CardHeader className="text-center pb-4">
                            <div className="text-4xl mb-3">✍️</div>
                            <CardTitle className="text-xl">Create Article</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                            <p className="text-gray-600 mb-4">
                                Start a new SEO-optimized article with AI assistance
                            </p>
                            <Link href={route('articles.create')}>
                                <Button className="w-full bg-green-600 hover:bg-green-700">
                                    New Article
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow border-purple-200">
                        <CardHeader className="text-center pb-4">
                            <div className="text-4xl mb-3">📚</div>
                            <CardTitle className="text-xl">My Articles</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                            <p className="text-gray-600 mb-4">
                                View, edit, and manage your existing content
                            </p>
                            <Link href={route('articles.index')}>
                                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                                    View Articles
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>

                {/* Features Overview */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        🚀 What You Can Do With Our SEO Generator
                    </h2>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Card className="text-center p-6">
                            <div className="text-3xl mb-3">📊</div>
                            <h3 className="font-semibold mb-2">Real-time SEO Analysis</h3>
                            <p className="text-sm text-gray-600">
                                Get instant SEO scores and optimization suggestions as you write
                            </p>
                        </Card>

                        <Card className="text-center p-6">
                            <div className="text-3xl mb-3">🎯</div>
                            <h3 className="font-semibold mb-2">Keyword Optimization</h3>
                            <p className="text-sm text-gray-600">
                                Target the right keywords with proper density and LSI keywords
                            </p>
                        </Card>

                        <Card className="text-center p-6">
                            <div className="text-3xl mb-3">🏷️</div>
                            <h3 className="font-semibold mb-2">Meta & Schema Generation</h3>
                            <p className="text-sm text-gray-600">
                                Automatically generate meta descriptions and JSON-LD schema
                            </p>
                        </Card>

                        <Card className="text-center p-6">
                            <div className="text-3xl mb-3">🌐</div>
                            <h3 className="font-semibold mb-2">Landing Page Export</h3>
                            <p className="text-sm text-gray-600">
                                Convert articles into complete landing pages with CTAs
                            </p>
                        </Card>

                        <Card className="text-center p-6">
                            <div className="text-3xl mb-3">🖼️</div>
                            <h3 className="font-semibold mb-2">Image Optimization</h3>
                            <p className="text-sm text-gray-600">
                                Add images with automatically generated alt text for SEO
                            </p>
                        </Card>

                        <Card className="text-center p-6">
                            <div className="text-3xl mb-3">📝</div>
                            <h3 className="font-semibold mb-2">AI Content Assistant</h3>
                            <p className="text-sm text-gray-600">
                                Get help rewriting, expanding, and optimizing your content
                            </p>
                        </Card>
                    </div>
                </div>

                {/* Getting Started Guide */}
                <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                    <CardHeader>
                        <CardTitle className="text-center text-2xl">
                            🎯 Quick Start Guide
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-4 gap-6 text-center">
                            <div>
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 text-blue-600 font-bold text-lg">
                                    1
                                </div>
                                <h4 className="font-semibold mb-2">Research Keywords</h4>
                                <p className="text-sm text-gray-600">
                                    Enter your topic and get keyword suggestions with search data
                                </p>
                            </div>

                            <div>
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 text-green-600 font-bold text-lg">
                                    2
                                </div>
                                <h4 className="font-semibold mb-2">Generate Outline</h4>
                                <p className="text-sm text-gray-600">
                                    AI creates optimized article structure based on your keywords
                                </p>
                            </div>

                            <div>
                                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 text-purple-600 font-bold text-lg">
                                    3
                                </div>
                                <h4 className="font-semibold mb-2">Write & Optimize</h4>
                                <p className="text-sm text-gray-600">
                                    Create content with real-time SEO analysis and suggestions
                                </p>
                            </div>

                            <div>
                                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 text-orange-600 font-bold text-lg">
                                    4
                                </div>
                                <h4 className="font-semibold mb-2">Export & Publish</h4>
                                <p className="text-sm text-gray-600">
                                    Get HTML, meta tags, and complete landing pages ready to use
                                </p>
                            </div>
                        </div>

                        <div className="text-center mt-8">
                            <Link href={route('seo.index')}>
                                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg">
                                    🚀 Start Creating Content
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}