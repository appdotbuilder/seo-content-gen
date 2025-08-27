import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="SEO Content Generator - AI-Powered Content Creation">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6 text-gray-900 lg:justify-center lg:p-8">
                <header className="mb-6 w-full max-w-[335px] text-sm lg:max-w-6xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <div className="flex gap-4">
                                <Link
                                    href={route('dashboard')}
                                    className="inline-block rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href={route('articles.index')}
                                    className="inline-block rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    My Articles
                                </Link>
                            </div>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-lg border border-transparent px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                                >
                                    Get Started Free
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow">
                    <main className="flex w-full max-w-6xl flex-col items-center text-center">
                        {/* Hero Section */}
                        <div className="mb-16">
                            <div className="mb-6 text-6xl">📝✨</div>
                            <h1 className="mb-6 text-4xl font-bold text-gray-900 lg:text-6xl">
                                AI-Powered SEO Content Generator
                            </h1>
                            <p className="mb-8 text-xl text-gray-600 max-w-3xl mx-auto lg:text-2xl">
                                Create high-ranking content with intelligent keyword research, optimized outlines, 
                                real-time SEO analysis, and automated meta descriptions. From topic to landing page in minutes.
                            </p>
                            
                            {!auth.user ? (
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link
                                        href={route('register')}
                                        className="inline-block rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white hover:bg-blue-700 transition-colors shadow-lg"
                                    >
                                        🚀 Start Creating Content
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="inline-block rounded-lg border-2 border-blue-600 px-8 py-4 text-lg font-semibold text-blue-600 hover:bg-blue-50 transition-colors"
                                    >
                                        Sign In
                                    </Link>
                                </div>
                            ) : (
                                <Link
                                    href={route('articles.create')}
                                    className="inline-block rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white hover:bg-blue-700 transition-colors shadow-lg"
                                >
                                    ✍️ Create New Article
                                </Link>
                            )}
                        </div>

                        {/* Features Grid */}
                        <div className="mb-16 w-full">
                            <h2 className="mb-12 text-3xl font-bold text-gray-900">Everything You Need for SEO Success</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                <div className="rounded-xl bg-white p-8 shadow-lg border border-gray-100">
                                    <div className="mb-4 text-4xl">🔍</div>
                                    <h3 className="mb-3 text-xl font-semibold">Smart Keyword Research</h3>
                                    <p className="text-gray-600">
                                        Get keyword ideas with search volume, competition analysis, content type suggestions, and LSI keywords
                                    </p>
                                </div>
                                
                                <div className="rounded-xl bg-white p-8 shadow-lg border border-gray-100">
                                    <div className="mb-4 text-4xl">📋</div>
                                    <h3 className="mb-3 text-xl font-semibold">AI Article Outlines</h3>
                                    <p className="text-gray-600">
                                        Generate optimized article structures based on your selected keywords and expand sections as needed
                                    </p>
                                </div>
                                
                                <div className="rounded-xl bg-white p-8 shadow-lg border border-gray-100">
                                    <div className="mb-4 text-4xl">📊</div>
                                    <h3 className="mb-3 text-xl font-semibold">Real-time SEO Analysis</h3>
                                    <p className="text-gray-600">
                                        Get live SEO scores and actionable checklists to optimize your content for search engines
                                    </p>
                                </div>
                                
                                <div className="rounded-xl bg-white p-8 shadow-lg border border-gray-100">
                                    <div className="mb-4 text-4xl">🖼️</div>
                                    <h3 className="mb-3 text-xl font-semibold">Image Integration</h3>
                                    <p className="text-gray-600">
                                        Insert images with automatically generated alt text for better accessibility and SEO
                                    </p>
                                </div>
                                
                                <div className="rounded-xl bg-white p-8 shadow-lg border border-gray-100">
                                    <div className="mb-4 text-4xl">🏷️</div>
                                    <h3 className="mb-3 text-xl font-semibold">Meta & Schema Generation</h3>
                                    <p className="text-gray-600">
                                        Auto-generate meta descriptions, WordPress SEO tags, and JSON-LD schema markup
                                    </p>
                                </div>
                                
                                <div className="rounded-xl bg-white p-8 shadow-lg border border-gray-100">
                                    <div className="mb-4 text-4xl">🌐</div>
                                    <h3 className="mb-3 text-xl font-semibold">Landing Page Generator</h3>
                                    <p className="text-gray-600">
                                        Create complete HTML landing pages with hero sections, CTAs, and mobile-responsive design
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Process Steps */}
                        <div className="mb-16 w-full">
                            <h2 className="mb-12 text-3xl font-bold text-gray-900">Simple 4-Step Process</h2>
                            <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
                                <div className="flex flex-col items-center text-center max-w-xs">
                                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-2xl font-bold text-blue-600">1</div>
                                    <h3 className="text-lg font-semibold mb-2">Enter Your Topic</h3>
                                    <p className="text-gray-600">Start with any topic and get intelligent keyword suggestions</p>
                                </div>
                                
                                <div className="hidden lg:block text-gray-300 text-2xl">→</div>
                                
                                <div className="flex flex-col items-center text-center max-w-xs">
                                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-2xl font-bold text-blue-600">2</div>
                                    <h3 className="text-lg font-semibold mb-2">Select Keywords</h3>
                                    <p className="text-gray-600">Choose the best keywords and generate optimized outlines</p>
                                </div>
                                
                                <div className="hidden lg:block text-gray-300 text-2xl">→</div>
                                
                                <div className="flex flex-col items-center text-center max-w-xs">
                                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-2xl font-bold text-blue-600">3</div>
                                    <h3 className="text-lg font-semibold mb-2">Write & Optimize</h3>
                                    <p className="text-gray-600">Create content with real-time SEO analysis and AI assistance</p>
                                </div>
                                
                                <div className="hidden lg:block text-gray-300 text-2xl">→</div>
                                
                                <div className="flex flex-col items-center text-center max-w-xs">
                                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-2xl font-bold text-blue-600">4</div>
                                    <h3 className="text-lg font-semibold mb-2">Publish & Convert</h3>
                                    <p className="text-gray-600">Export as landing pages or get ready-to-use HTML and meta tags</p>
                                </div>
                            </div>
                        </div>

                        {/* CTA Section */}
                        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-12 text-white w-full max-w-4xl">
                            <h2 className="mb-4 text-3xl font-bold">Ready to Create High-Ranking Content?</h2>
                            <p className="mb-8 text-xl opacity-90">
                                Join thousands of content creators using AI to boost their SEO rankings
                            </p>
                            
                            {!auth.user ? (
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link
                                        href={route('register')}
                                        className="inline-block rounded-lg bg-white px-8 py-4 text-lg font-semibold text-blue-600 hover:bg-gray-100 transition-colors"
                                    >
                                        🎯 Start Free Trial
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="inline-block rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold text-white hover:bg-white hover:text-blue-600 transition-colors"
                                    >
                                        Sign In
                                    </Link>
                                </div>
                            ) : (
                                <Link
                                    href={route('articles.create')}
                                    className="inline-block rounded-lg bg-white px-8 py-4 text-lg font-semibold text-blue-600 hover:bg-gray-100 transition-colors"
                                >
                                    🚀 Create Your First Article
                                </Link>
                            )}
                        </div>

                        <footer className="mt-16 text-sm text-gray-500">
                            <p>Built with ❤️ using AI and modern web technologies</p>
                        </footer>
                    </main>
                </div>
            </div>
        </>
    );
}