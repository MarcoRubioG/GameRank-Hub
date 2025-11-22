<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GameList extends Model
{
    use HasFactory;

    protected $table = 'lists';

    protected $fillable = [
        'user_id',
        'name',
        'description',
        'is_public',
    ];

    protected $casts = [
        'is_public' => 'boolean',
    ];


    // Usuario que creó la lista
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Videojuegos en la lista
    public function videogames()
    {
        return $this->belongsToMany(Videogame::class, 'list_videogame')
            ->withPivot('position')
            ->withTimestamps()
            ->orderBy('list_videogame.position');
    }
}