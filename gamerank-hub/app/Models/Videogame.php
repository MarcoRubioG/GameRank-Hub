<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Videogame extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'cover_image',
        'genre',
        'developer',
        'release_year',
        'average_rating',
        'total_ratings',
    ];

    protected $casts = [
        'release_year' => 'integer',
        'average_rating' => 'decimal:2',
        'total_ratings' => 'integer',
    ];

    // Relaciones

    // Reseñas del videojuego
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    // Listas que incluyen este videojuego
    public function lists()
    {
        return $this->belongsToMany(GameList::class, 'list_videogame')
            ->withPivot('position')
            ->withTimestamps();
    }
}