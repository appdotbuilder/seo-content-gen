<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $title }}</title>
    <meta name="description" content="{{ $metaDescription }}">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body class="bg-gray-50">
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div class="container mx-auto px-6 py-24">
            <div class="text-center">
                <h1 class="text-4xl md:text-6xl font-bold mb-6">{{ $title }}</h1>
                <p class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">{{ $metaDescription }}</p>
                
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    @if($ctaLink)
                        <a href="{{ $ctaLink }}" class="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition duration-300">
                            {{ $ctaText }}
                        </a>
                    @endif
                    
                    @if($whatsappLink)
                        <a href="{{ $whatsappLink }}" target="_blank" class="bg-green-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-600 transition duration-300 flex items-center justify-center gap-2">
                            <i class="fab fa-whatsapp"></i>
                            Contact via WhatsApp
                        </a>
                    @endif
                </div>
            </div>
        </div>
    </section>

    <!-- Main Content -->
    <section class="py-16">
        <div class="container mx-auto px-6 max-w-4xl">
            <div class="bg-white rounded-lg shadow-lg p-8">
                <article class="prose prose-lg max-w-none">
                    {!! $content !!}
                </article>
            </div>
        </div>
    </section>

    <!-- Call to Action Section -->
    <section class="bg-gray-900 text-white py-16">
        <div class="container mx-auto px-6 text-center">
            <h2 class="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p class="text-xl mb-8">Take action today and see the results you've been looking for.</p>
            
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                @if($ctaLink)
                    <a href="{{ $ctaLink }}" class="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-300">
                        {{ $ctaText }}
                    </a>
                @endif
                
                @if($whatsappLink)
                    <a href="{{ $whatsappLink }}" target="_blank" class="bg-green-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-600 transition duration-300 flex items-center justify-center gap-2">
                        <i class="fab fa-whatsapp"></i>
                        Get in Touch
                    </a>
                @endif
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-800 text-gray-300 py-8">
        <div class="container mx-auto px-6 text-center">
            <p>&copy; {{ date('Y') }} All rights reserved.</p>
        </div>
    </footer>
</body>
</html>