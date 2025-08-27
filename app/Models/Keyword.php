<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Keyword
 *
 * @property int $id
 * @property int $article_id
 * @property string $keyword
 * @property int $search_volume
 * @property string $competition
 * @property string|null $content_type
 * @property array|null $lsi_keywords
 * @property bool $is_completed
 * @property bool $is_selected
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Article $article
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Keyword newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Keyword newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Keyword query()
 * @method static \Illuminate\Database\Eloquent\Builder|Keyword whereArticleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Keyword whereCompetition($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Keyword whereContentType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Keyword whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Keyword whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Keyword whereIsCompleted($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Keyword whereIsSelected($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Keyword whereKeyword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Keyword whereLsiKeywords($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Keyword whereSearchVolume($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Keyword whereUpdatedAt($value)
 * @method static \Database\Factories\KeywordFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Keyword extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'article_id',
        'keyword',
        'search_volume',
        'competition',
        'content_type',
        'lsi_keywords',
        'is_completed',
        'is_selected',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'lsi_keywords' => 'array',
        'is_completed' => 'boolean',
        'is_selected' => 'boolean',
        'search_volume' => 'integer',
    ];

    /**
     * Get the article that owns the keyword.
     */
    public function article(): BelongsTo
    {
        return $this->belongsTo(Article::class);
    }
}