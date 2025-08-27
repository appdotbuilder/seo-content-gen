<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

/**
 * App\Models\Article
 *
 * @property int $id
 * @property int $user_id
 * @property string $title
 * @property string $slug
 * @property string|null $topic
 * @property array|null $keywords
 * @property array|null $outline
 * @property string|null $content
 * @property string|null $meta_description
 * @property array|null $seo_tags
 * @property array|null $schema_markup
 * @property array|null $seo_analysis
 * @property string $status
 * @property int $seo_score
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Keyword> $articleKeywords
 * @property-read int|null $article_keywords_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Article newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Article newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Article query()
 * @method static \Illuminate\Database\Eloquent\Builder|Article whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Article whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Article whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Article whereKeywords($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Article whereMetaDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Article whereOutline($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Article whereSchemaMarkup($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Article whereSeoAnalysis($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Article whereSeoScore($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Article whereSeoTags($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Article whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Article whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Article whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Article whereTopic($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Article whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Article whereUserId($value)
 * @method static \Database\Factories\ArticleFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Article extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'title',
        'slug',
        'topic',
        'keywords',
        'outline',
        'content',
        'meta_description',
        'seo_tags',
        'schema_markup',
        'seo_analysis',
        'status',
        'seo_score',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'keywords' => 'array',
        'outline' => 'array',
        'seo_tags' => 'array',
        'schema_markup' => 'array',
        'seo_analysis' => 'array',
        'seo_score' => 'integer',
    ];

    /**
     * Boot the model.
     */
    protected static function boot(): void
    {
        parent::boot();

        static::creating(function ($article) {
            if (empty($article->slug)) {
                $article->slug = Str::slug($article->title);
            }
        });
    }

    /**
     * Get the user that owns the article.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the keywords for the article.
     */
    public function articleKeywords(): HasMany
    {
        return $this->hasMany(Keyword::class);
    }
}