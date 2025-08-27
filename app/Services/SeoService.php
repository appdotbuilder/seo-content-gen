<?php

namespace App\Services;

class SeoService
{
    /**
     * Generate keyword ideas for a given topic.
     *
     * @param string $topic
     * @return array
     */
    public function generateKeywords(string $topic): array
    {
        // In a real application, this would integrate with keyword research APIs
        // For now, we'll simulate keyword data
        
        $baseKeywords = [
            'cara ' . $topic,
            'tips ' . $topic,
            'panduan ' . $topic,
            'tutorial ' . $topic,
            'belajar ' . $topic,
            $topic . ' terbaik',
            $topic . ' untuk pemula',
            $topic . ' lengkap',
            'strategi ' . $topic,
            'teknik ' . $topic
        ];

        $keywords = [];
        foreach ($baseKeywords as $index => $keyword) {
            $keywords[] = [
                'keyword' => $keyword,
                'search_volume' => random_int(100, 10000),
                'competition' => ['low', 'medium', 'high'][random_int(0, 2)],
                'content_type' => ['blog post', 'tutorial', 'guide', 'list', 'review'][random_int(0, 4)],
                'lsi_keywords' => $this->generateLsiKeywords($keyword),
                'is_completed' => false,
                'is_selected' => false,
            ];
        }

        return $keywords;
    }

    /**
     * Generate LSI keywords for a given keyword.
     *
     * @param string $keyword
     * @return array
     */
    public function generateLsiKeywords(string $keyword): array
    {
        $lsiSuffixes = [
            'metode',
            'pendekatan',
            'proses',
            'sistem',
            'framework',
            'tools',
            'sumber daya',
            'contoh',
            'manfaat',
            'keuntungan'
        ];

        $lsiKeywords = [];
        $baseWord = explode(' ', $keyword)[0];
        
        for ($i = 0; $i < 5; $i++) {
            $lsiKeywords[] = $baseWord . ' ' . $lsiSuffixes[random_int(0, count($lsiSuffixes) - 1)];
        }

        return array_unique($lsiKeywords);
    }

    /**
     * Generate article outline based on selected keyword.
     *
     * @param string $keyword
     * @return array
     */
    public function generateOutline(string $keyword): array
    {
        return [
            [
                'type' => 'heading',
                'level' => 1,
                'content' => ucfirst($keyword),
                'expanded' => false
            ],
            [
                'type' => 'heading',
                'level' => 2,
                'content' => 'Pengantar',
                'expanded' => false
            ],
            [
                'type' => 'paragraph',
                'content' => 'Pengenalan singkat tentang ' . $keyword,
                'expanded' => false
            ],
            [
                'type' => 'heading',
                'level' => 2,
                'content' => 'Apa itu ' . ucfirst($keyword) . '?',
                'expanded' => false
            ],
            [
                'type' => 'heading',
                'level' => 2,
                'content' => 'Manfaat ' . ucfirst($keyword),
                'expanded' => false
            ],
            [
                'type' => 'heading',
                'level' => 2,
                'content' => 'Panduan Langkah demi Langkah',
                'expanded' => false
            ],
            [
                'type' => 'heading',
                'level' => 2,
                'content' => 'Praktik Terbaik',
                'expanded' => false
            ],
            [
                'type' => 'heading',
                'level' => 2,
                'content' => 'Kesalahan Umum yang Harus Dihindari',
                'expanded' => false
            ],
            [
                'type' => 'heading',
                'level' => 2,
                'content' => 'Kesimpulan',
                'expanded' => false
            ]
        ];
    }

    /**
     * Analyze content for SEO score.
     *
     * @param string $content
     * @param string $keyword
     * @return array
     */
    public function analyzeSeo(string $content, string $keyword = ''): array
    {
        $score = 0;
        $checklist = [];

        // Word count check
        $wordCount = str_word_count($content);
        if ($wordCount >= 300) {
            $score += 20;
            $checklist[] = ['item' => 'Panjang konten (300+ kata)', 'passed' => true];
        } else {
            $checklist[] = ['item' => 'Panjang konten (300+ kata)', 'passed' => false];
        }

        // Keyword density check
        if (!empty($keyword)) {
            $keywordCount = substr_count(strtolower($content), strtolower($keyword));
            $density = ($keywordCount / $wordCount) * 100;
            
            if ($density >= 1 && $density <= 3) {
                $score += 20;
                $checklist[] = ['item' => 'Kepadatan kata kunci (1-3%)', 'passed' => true];
            } else {
                $checklist[] = ['item' => 'Kepadatan kata kunci (1-3%)', 'passed' => false];
            }
        }

        // Heading structure check
        $headingCount = preg_match_all('/<h[1-6]/', $content);
        if ($headingCount >= 3) {
            $score += 15;
            $checklist[] = ['item' => 'Struktur heading yang tepat', 'passed' => true];
        } else {
            $checklist[] = ['item' => 'Struktur heading yang tepat', 'passed' => false];
        }

        // Image alt text check
        $imagesWithAlt = preg_match_all('/<img[^>]*alt=["\'][^"\']*["\'][^>]*>/', $content);
        $totalImages = preg_match_all('/<img/', $content);
        
        if ($totalImages === 0 || $imagesWithAlt === $totalImages) {
            $score += 15;
            $checklist[] = ['item' => 'Gambar memiliki teks alt', 'passed' => true];
        } else {
            $checklist[] = ['item' => 'Gambar memiliki teks alt', 'passed' => false];
        }

        // Internal/external links check
        $linkCount = preg_match_all('/<a\s+[^>]*href=["\'][^"\']*["\'][^>]*>/', $content);
        if ($linkCount >= 2) {
            $score += 10;
            $checklist[] = ['item' => 'Berisi tautan (2+)', 'passed' => true];
        } else {
            $checklist[] = ['item' => 'Berisi tautan (2+)', 'passed' => false];
        }

        // Meta description check (passed separately)
        $score += 20; // Assume meta description is provided
        $checklist[] = ['item' => 'Meta description tersedia', 'passed' => true];

        return [
            'score' => min($score, 100),
            'checklist' => $checklist
        ];
    }

    /**
     * Generate meta descriptions for content.
     *
     * @param string $content
     * @param string $keyword
     * @return array
     */
    public function generateMetaDescriptions(string $content, string $keyword = ''): array
    {
        $descriptions = [];
        $contentSnippet = substr(strip_tags($content), 0, 100);
        
        if (!empty($keyword)) {
            $descriptions[] = "Pelajari semua tentang {$keyword} dalam panduan lengkap ini. {$contentSnippet}...";
            $descriptions[] = "Temukan teknik dan strategi {$keyword} terbaik. {$contentSnippet}...";
            $descriptions[] = "Kuasai {$keyword} dengan panduan langkah demi langkah kami. {$contentSnippet}...";
        } else {
            $descriptions[] = substr($contentSnippet, 0, 150) . '...';
            $descriptions[] = "Panduan lengkap yang mencakup semua aspek. {$contentSnippet}...";
        }

        return array_map(function($desc) {
            return substr($desc, 0, 160);
        }, $descriptions);
    }

    /**
     * Generate SEO tags for WordPress.
     *
     * @param string $keyword
     * @param array $lsiKeywords
     * @return array
     */
    public function generateSeoTags(string $keyword, array $lsiKeywords = []): array
    {
        $tags = [$keyword];
        
        // Add LSI keywords as tags
        foreach ($lsiKeywords as $lsi) {
            if (count($tags) < 10) { // Limit to 10 tags
                $tags[] = $lsi;
            }
        }

        return array_unique($tags);
    }

    /**
     * Generate JSON-LD schema markup.
     *
     * @param string $title
     * @param string $content
     * @param string $metaDescription
     * @return array
     */
    public function generateSchema(string $title, string $content, string $metaDescription = ''): array
    {
        return [
            '@context' => 'https://schema.org',
            '@type' => 'Article',
            'headline' => $title,
            'description' => $metaDescription ?: substr(strip_tags($content), 0, 160),
            'author' => [
                '@type' => 'Person',
                'name' => 'Nama Penulis'
            ],
            'datePublished' => now()->toISOString(),
            'dateModified' => now()->toISOString(),
            'wordCount' => str_word_count($content),
            'articleBody' => strip_tags($content)
        ];
    }

    /**
     * Generate complete HTML landing page.
     *
     * @param array $article
     * @param array $options
     * @return string
     */
    public function generateLandingPage(array $article, array $options = []): string
    {
        $title = $article['title'] ?? 'Judul Artikel';
        $content = $article['content'] ?? '';
        $metaDescription = $article['meta_description'] ?? '';
        $whatsappLink = $options['whatsapp_link'] ?? '';
        $ctaLink = $options['cta_link'] ?? '';
        $ctaText = $options['cta_text'] ?? 'Mulai Sekarang';

        return view('landing-page', compact(
            'title',
            'content',
            'metaDescription',
            'whatsappLink',
            'ctaLink',
            'ctaText'
        ))->render();
    }
}