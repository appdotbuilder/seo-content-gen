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
        Schema::create('keywords', function (Blueprint $table) {
            $table->id();
            $table->foreignId('article_id')->constrained()->onDelete('cascade');
            $table->string('keyword');
            $table->integer('search_volume')->default(0);
            $table->enum('competition', ['low', 'medium', 'high'])->default('medium');
            $table->string('content_type')->nullable();
            $table->json('lsi_keywords')->nullable()->comment('Latent Semantic Indexing keywords');
            $table->boolean('is_completed')->default(false);
            $table->boolean('is_selected')->default(false);
            $table->timestamps();
            
            // Indexes for performance
            $table->index('article_id');
            $table->index('keyword');
            $table->index(['article_id', 'is_completed']);
            $table->index(['article_id', 'is_selected']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('keywords');
    }
};