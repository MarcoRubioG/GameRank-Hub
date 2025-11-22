<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReviewVote extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'review_id',
        'is_upvote',
    ];

    protected $casts = [
        'is_upvote' => 'boolean',
    ];

    // Usuario que votp
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Reseña votada
    public function review()
    {
        return $this->belongsTo(Review::class);
    }
}