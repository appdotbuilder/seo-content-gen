<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('topic')->nullable();
            $table->json('keywords')->nullable()->comment('Keyword research data');
            $table->json('outline')->nullable()->comment('Article outline structure');
            $table->longText('content')->nullable();
            $table->text('meta_description')->nullable();
            $table->json('seo_tags')->nullable()->comment('WordPress SEO tags');
            $table->json('schema_markup')->nullable()->comment('JSON-LD schema');
            $table->json('seo_analysis')->nullable()->comment('SEO score and checklist');
            $table->string('status')->default('draft')->comment('draft, published, archived');
            $table->integer('seo_score')->default(0);
            $table->timestamps();
            
            // Indexes for performance
            $table->index('user_id');
            $table->index('status');
            $table->index(['user_id', 'status']);
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};