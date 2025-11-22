<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Comment extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'review_id',
        'content',
    ];

    // Relaciones

    // Usuario que escribió el comentario
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Reseña a la que pertenece el comentario
    public function review()
    {
        return $this->belongsTo(Review::class);
    }
}