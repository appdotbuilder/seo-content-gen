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
            <Head title="Dasbor - Generator Konten SEO" />
            
            <div className="container mx-auto p-6 max-w-6xl">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Selamat datang kembali, {auth.user?.name || 'Pengguna'}! 👋
                    </h1>
                    <p className="text-lg text-gray-600">
                        Siap untuk membuat konten berperingkat tinggi?
                    </p>
                </div>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <Card className="hover:shadow-lg transition-shadow border-blue-200">
                        <CardHeader className="text-center pb-4">
                            <div className="text-4xl mb-3">🔍</div>
                            <CardTitle className="text-xl">Riset Kata Kunci</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                            <p className="text-gray-600 mb-4">
                                Buat ide kata kunci dengan volume pencarian dan analisis kompetisi
                            </p>
                            <Link href={route('seo.index')}>
                                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                    Mulai Riset
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow border-green-200">
                        <CardHeader className="text-center pb-4">
                            <div className="text-4xl mb-3">✍️</div>
                            <CardTitle className="text-xl">Buat Artikel</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                            <p className="text-gray-600 mb-4">
                                Mulai artikel baru yang dioptimalkan SEO dengan bantuan AI
                            </p>
                            <Link href={route('articles.create')}>
                                <Button className="w-full bg-green-600 hover:bg-green-700">
                                    Artikel Baru
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow border-purple-200">
                        <CardHeader className="text-center pb-4">
                            <div className="text-4xl mb-3">📚</div>
                            <CardTitle className="text-xl">Artikel Saya</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                            <p className="text-gray-600 mb-4">
                                Lihat, edit, dan kelola konten yang sudah ada
                            </p>
                            <Link href={route('articles.index')}>
                                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                                    Lihat Artikel
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>

                {/* Features Overview */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        🚀 Yang Bisa Anda Lakukan Dengan Generator SEO Kami
                    </h2>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Card className="text-center p-6">
                            <div className="text-3xl mb-3">📊</div>
                            <h3 className="font-semibold mb-2">Analisis SEO Real-time</h3>
                            <p className="text-sm text-gray-600">
                                Dapatkan skor SEO instan dan saran optimasi saat Anda menulis
                            </p>
                        </Card>

                        <Card className="text-center p-6">
                            <div className="text-3xl mb-3">🎯</div>
                            <h3 className="font-semibold mb-2">Optimasi Kata Kunci</h3>
                            <p className="text-sm text-gray-600">
                                Target kata kunci yang tepat dengan kepadatan dan LSI keywords yang sesuai
                            </p>
                        </Card>

                        <Card className="text-center p-6">
                            <div className="text-3xl mb-3">🏷️</div>
                            <h3 className="font-semibold mb-2">Generator Meta & Schema</h3>
                            <p className="text-sm text-gray-600">
                                Buat meta description dan schema JSON-LD secara otomatis
                            </p>
                        </Card>

                        <Card className="text-center p-6">
                            <div className="text-3xl mb-3">🌐</div>
                            <h3 className="font-semibold mb-2">Ekspor Landing Page</h3>
                            <p className="text-sm text-gray-600">
                                Ubah artikel menjadi landing page lengkap dengan CTA
                            </p>
                        </Card>

                        <Card className="text-center p-6">
                            <div className="text-3xl mb-3">🖼️</div>
                            <h3 className="font-semibold mb-2">Optimasi Gambar</h3>
                            <p className="text-sm text-gray-600">
                                Tambahkan gambar dengan teks alt yang dibuat otomatis untuk SEO
                            </p>
                        </Card>

                        <Card className="text-center p-6">
                            <div className="text-3xl mb-3">📝</div>
                            <h3 className="font-semibold mb-2">Asisten Konten AI</h3>
                            <p className="text-sm text-gray-600">
                                Dapatkan bantuan menulis ulang, mengembangkan, dan mengoptimalkan konten
                            </p>
                        </Card>
                    </div>
                </div>

                {/* Getting Started Guide */}
                <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                    <CardHeader>
                        <CardTitle className="text-center text-2xl">
                            🎯 Panduan Memulai Cepat
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-4 gap-6 text-center">
                            <div>
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 text-blue-600 font-bold text-lg">
                                    1
                                </div>
                                <h4 className="font-semibold mb-2">Riset Kata Kunci</h4>
                                <p className="text-sm text-gray-600">
                                    Masukkan topik Anda dan dapatkan saran kata kunci dengan data pencarian
                                </p>
                            </div>

                            <div>
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 text-green-600 font-bold text-lg">
                                    2
                                </div>
                                <h4 className="font-semibold mb-2">Buat Kerangka</h4>
                                <p className="text-sm text-gray-600">
                                    AI membuat struktur artikel yang dioptimalkan berdasarkan kata kunci Anda
                                </p>
                            </div>

                            <div>
                                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 text-purple-600 font-bold text-lg">
                                    3
                                </div>
                                <h4 className="font-semibold mb-2">Tulis & Optimalkan</h4>
                                <p className="text-sm text-gray-600">
                                    Buat konten dengan analisis SEO real-time dan saran
                                </p>
                            </div>

                            <div>
                                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 text-orange-600 font-bold text-lg">
                                    4
                                </div>
                                <h4 className="font-semibold mb-2">Ekspor & Publikasi</h4>
                                <p className="text-sm text-gray-600">
                                    Dapatkan HTML, meta tag, dan landing page lengkap siap digunakan
                                </p>
                            </div>
                        </div>

                        <div className="text-center mt-8">
                            <Link href={route('seo.index')}>
                                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg">
                                    🚀 Mulai Membuat Konten
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}