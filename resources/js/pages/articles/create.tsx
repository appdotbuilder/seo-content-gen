import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import InputError from '@/components/input-error';

export default function ArticlesCreate() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        topic: '',
        status: 'draft',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('articles.store'));
    };

    return (
        <AppShell>
            <Head title="Create Article - SEO Content Generator" />
            
            <div className="container mx-auto p-6 max-w-4xl">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-4xl">✍️</span>
                        <h1 className="text-3xl font-bold text-gray-900">Create New Article</h1>
                    </div>
                    <p className="text-lg text-gray-600">
                        Start with basic information and we'll help you create SEO-optimized content
                    </p>
                </div>

                {/* Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Article Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Title */}
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                    Article Title *
                                </label>
                                <Input
                                    id="title"
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="Enter a compelling article title..."
                                    className="text-lg"
                                    required
                                />
                                <InputError message={errors.title} className="mt-2" />
                                <p className="text-sm text-gray-500 mt-1">
                                    Make it descriptive and keyword-rich for better SEO
                                </p>
                            </div>

                            {/* Topic */}
                            <div>
                                <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
                                    Main Topic
                                </label>
                                <Input
                                    id="topic"
                                    type="text"
                                    value={data.topic}
                                    onChange={(e) => setData('topic', e.target.value)}
                                    placeholder="What's the main topic or focus keyword?"
                                />
                                <InputError message={errors.topic} className="mt-2" />
                                <p className="text-sm text-gray-500 mt-1">
                                    This helps us generate relevant keywords and optimize your content
                                </p>
                            </div>

                            {/* Status */}
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
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                    <option value="archived">Archived</option>
                                </select>
                                <InputError message={errors.status} className="mt-2" />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-between pt-6 border-t">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => window.history.back()}
                                >
                                    Cancel
                                </Button>
                                
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-600 hover:bg-blue-700"
                                >
                                    {processing ? (
                                        <span className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Creating...
                                        </span>
                                    ) : (
                                        '📄 Create Article'
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Next Steps Info */}
                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <span>🚀</span>
                            What happens next?
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                                    Keyword Research
                                </h4>
                                <p className="text-sm text-gray-600">
                                    Generate keyword ideas with search volume, competition analysis, and LSI keywords
                                </p>
                            </div>
                            
                            <div>
                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                                    AI Outline Generation
                                </h4>
                                <p className="text-sm text-gray-600">
                                    Create optimized article structures based on your selected keywords
                                </p>
                            </div>
                            
                            <div>
                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                                    Content Editor
                                </h4>
                                <p className="text-sm text-gray-600">
                                    Write with AI assistance, real-time SEO analysis, and optimization suggestions
                                </p>
                            </div>
                            
                            <div>
                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">4</span>
                                    Export & Publish
                                </h4>
                                <p className="text-sm text-gray-600">
                                    Get HTML, meta descriptions, schema markup, and landing page generation
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}