import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Generator Konten SEO - Pembuatan Konten Bertenaga AI">
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
                                    Dasbor
                                </Link>
                                <Link
                                    href={route('articles.index')}
                                    className="inline-block rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    Artikel Saya
                                </Link>
                            </div>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-lg border border-transparent px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                                >
                                    Masuk
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                                >
                                    Mulai Gratis
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
                                Generator Konten SEO Bertenaga AI
                            </h1>
                            <p className="mb-8 text-xl text-gray-600 max-w-3xl mx-auto lg:text-2xl">
                                Ciptakan konten yang merajai ranking dengan riset kata kunci cerdas, kerangka yang dioptimalkan, 
                                analisis SEO real-time, dan deskripsi meta otomatis. Dari topik hingga landing page dalam hitungan menit.
                            </p>
                            
                            {!auth.user ? (
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link
                                        href={route('register')}
                                        className="inline-block rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white hover:bg-blue-700 transition-colors shadow-lg"
                                    >
                                        🚀 Mulai Buat Konten
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="inline-block rounded-lg border-2 border-blue-600 px-8 py-4 text-lg font-semibold text-blue-600 hover:bg-blue-50 transition-colors"
                                    >
                                        Masuk
                                    </Link>
                                </div>
                            ) : (
                                <Link
                                    href={route('articles.create')}
                                    className="inline-block rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white hover:bg-blue-700 transition-colors shadow-lg"
                                >
                                    ✍️ Buat Artikel Baru
                                </Link>
                            )}
                        </div>

                        {/* Features Grid */}
                        <div className="mb-16 w-full">
                            <h2 className="mb-12 text-3xl font-bold text-gray-900">Semua yang Anda Butuhkan untuk Sukses SEO</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                <div className="rounded-xl bg-white p-8 shadow-lg border border-gray-100">
                                    <div className="mb-4 text-4xl">🔍</div>
                                    <h3 className="mb-3 text-xl font-semibold">Riset Kata Kunci Pintar</h3>
                                    <p className="text-gray-600">
                                        Dapatkan ide kata kunci dengan volume pencarian, analisis kompetisi, saran jenis konten, dan LSI keywords
                                    </p>
                                </div>
                                
                                <div className="rounded-xl bg-white p-8 shadow-lg border border-gray-100">
                                    <div className="mb-4 text-4xl">📋</div>
                                    <h3 className="mb-3 text-xl font-semibold">Kerangka Artikel AI</h3>
                                    <p className="text-gray-600">
                                        Buat struktur artikel yang dioptimalkan berdasarkan kata kunci pilihan dan kembangkan bagian sesuai kebutuhan
                                    </p>
                                </div>
                                
                                <div className="rounded-xl bg-white p-8 shadow-lg border border-gray-100">
                                    <div className="mb-4 text-4xl">📊</div>
                                    <h3 className="mb-3 text-xl font-semibold">Analisis SEO Real-time</h3>
                                    <p className="text-gray-600">
                                        Dapatkan skor SEO langsung dan daftar periksa yang dapat ditindaklanjuti untuk mengoptimalkan konten Anda
                                    </p>
                                </div>
                                
                                <div className="rounded-xl bg-white p-8 shadow-lg border border-gray-100">
                                    <div className="mb-4 text-4xl">🖼️</div>
                                    <h3 className="mb-3 text-xl font-semibold">Integrasi Gambar</h3>
                                    <p className="text-gray-600">
                                        Sisipkan gambar dengan teks alt yang dibuat otomatis untuk aksesibilitas dan SEO yang lebih baik
                                    </p>
                                </div>
                                
                                <div className="rounded-xl bg-white p-8 shadow-lg border border-gray-100">
                                    <div className="mb-4 text-4xl">🏷️</div>
                                    <h3 className="mb-3 text-xl font-semibold">Generator Meta & Schema</h3>
                                    <p className="text-gray-600">
                                        Buat meta description otomatis, tag SEO WordPress, dan markup schema JSON-LD
                                    </p>
                                </div>
                                
                                <div className="rounded-xl bg-white p-8 shadow-lg border border-gray-100">
                                    <div className="mb-4 text-4xl">🌐</div>
                                    <h3 className="mb-3 text-xl font-semibold">Generator Landing Page</h3>
                                    <p className="text-gray-600">
                                        Buat halaman landing HTML lengkap dengan hero section, CTA, dan desain responsif mobile
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Process Steps */}
                        <div className="mb-16 w-full">
                            <h2 className="mb-12 text-3xl font-bold text-gray-900">Proses 4 Langkah Sederhana</h2>
                            <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
                                <div className="flex flex-col items-center text-center max-w-xs">
                                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-2xl font-bold text-blue-600">1</div>
                                    <h3 className="text-lg font-semibold mb-2">Masukkan Topik Anda</h3>
                                    <p className="text-gray-600">Mulai dengan topik apa pun dan dapatkan saran kata kunci cerdas</p>
                                </div>
                                
                                <div className="hidden lg:block text-gray-300 text-2xl">→</div>
                                
                                <div className="flex flex-col items-center text-center max-w-xs">
                                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-2xl font-bold text-blue-600">2</div>
                                    <h3 className="text-lg font-semibold mb-2">Pilih Kata Kunci</h3>
                                    <p className="text-gray-600">Pilih kata kunci terbaik dan buat kerangka yang dioptimalkan</p>
                                </div>
                                
                                <div className="hidden lg:block text-gray-300 text-2xl">→</div>
                                
                                <div className="flex flex-col items-center text-center max-w-xs">
                                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-2xl font-bold text-blue-600">3</div>
                                    <h3 className="text-lg font-semibold mb-2">Tulis & Optimalkan</h3>
                                    <p className="text-gray-600">Buat konten dengan analisis SEO real-time dan bantuan AI</p>
                                </div>
                                
                                <div className="hidden lg:block text-gray-300 text-2xl">→</div>
                                
                                <div className="flex flex-col items-center text-center max-w-xs">
                                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-2xl font-bold text-blue-600">4</div>
                                    <h3 className="text-lg font-semibold mb-2">Publikasi & Konversi</h3>
                                    <p className="text-gray-600">Ekspor sebagai landing page atau dapatkan HTML dan meta tag siap pakai</p>
                                </div>
                            </div>
                        </div>

                        {/* CTA Section */}
                        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-12 text-white w-full max-w-4xl">
                            <h2 className="mb-4 text-3xl font-bold">Siap Membuat Konten Berperingkat Tinggi?</h2>
                            <p className="mb-8 text-xl opacity-90">
                                Bergabunglah dengan ribuan pembuat konten yang menggunakan AI untuk meningkatkan peringkat SEO
                            </p>
                            
                            {!auth.user ? (
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link
                                        href={route('register')}
                                        className="inline-block rounded-lg bg-white px-8 py-4 text-lg font-semibold text-blue-600 hover:bg-gray-100 transition-colors"
                                    >
                                        🎯 Mulai Uji Coba Gratis
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="inline-block rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold text-white hover:bg-white hover:text-blue-600 transition-colors"
                                    >
                                        Masuk
                                    </Link>
                                </div>
                            ) : (
                                <Link
                                    href={route('articles.create')}
                                    className="inline-block rounded-lg bg-white px-8 py-4 text-lg font-semibold text-blue-600 hover:bg-gray-100 transition-colors"
                                >
                                    🚀 Buat Artikel Pertama Anda
                                </Link>
                            )}
                        </div>

                        <footer className="mt-16 text-sm text-gray-500">
                            <p>Dibuat dengan ❤️ menggunakan AI dan teknologi web modern</p>
                        </footer>
                    </main>
                </div>
            </div>
        </>
    );
}