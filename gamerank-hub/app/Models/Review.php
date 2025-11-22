<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Review extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'videogame_id',
        'title',
        'content',
        'rating',
        'upvotes',
        'downvotes',
    ];

    protected $casts = [
        'rating' => 'decimal:2',
        'upvotes' => 'integer',
        'downvotes' => 'integer',
    ];

   
    // Usuario que escribió la reseña
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Videojuego reseñad
    public function videogame()
    {
        return $this->belongsTo(Videogame::class);
    }

    // Comentarios reseña
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    // Votos  reseña
    public function votes()
    {
        return $this->hasMany(ReviewVote::class);
    }
}