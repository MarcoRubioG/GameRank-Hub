<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Videogame;
use Illuminate\Support\Str;

class VideogameSeeder extends Seeder
{
    public function run(): void
    {
        $videogames = [
            [
                'title' => 'The Legend of Zelda: Breath of the Wild',
                'description' => 'Un juego de aventuras y acción en un mundo abierto masivo donde exploras Hyrule.',
                'genre' => 'Aventura',
                'developer' => 'Nintendo',
                'release_year' => 2017,
                'cover_image' => 'https://images.igdb.com/igdb/image/upload/t_cover_big/co3p2d.jpg',
            ],
            [
                'title' => 'The Witcher 3: Wild Hunt',
                'description' => 'RPG de mundo abierto donde juegas como Geralt de Rivia, un cazador de monstruos.',
                'genre' => 'RPG',
                'developer' => 'CD Projekt Red',
                'release_year' => 2015,
                'cover_image' => 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.jpg',
            ],
            [
                'title' => 'Dark Souls III',
                'description' => 'Un desafiante juego de rol de acción conocido por su dificultad y atmósfera oscura.',
                'genre' => 'Action RPG',
                'developer' => 'FromSoftware',
                'release_year' => 2016,
                'cover_image' => 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1vcf.jpg',
            ],
            [
                'title' => 'Hollow Knight',
                'description' => 'Metroidvania de plataformas 2D con un mundo interconectado y combate desafiante.',
                'genre' => 'Metroidvania',
                'developer' => 'Team Cherry',
                'release_year' => 2017,
                'cover_image' => 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1rgi.jpg',
            ],
            [
                'title' => 'Red Dead Redemption 2',
                'description' => 'Aventura épica del salvaje oeste con una historia profunda y mundo detallado.',
                'genre' => 'Acción-Aventura',
                'developer' => 'Rockstar Games',
                'release_year' => 2018,
                'cover_image' => 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1q1f.jpg',
            ],
            [
                'title' => 'Celeste',
                'description' => 'Juego de plataformas preciso sobre escalar una montaña con una historia emotiva.',
                'genre' => 'Plataformas',
                'developer' => 'Maddy Makes Games',
                'release_year' => 2018,
                'cover_image' => 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1rft.jpg',
            ],
            [
                'title' => 'Hades',
                'description' => 'Roguelike de acción donde escapas del inframundo griego en repetidas carreras.',
                'genre' => 'Roguelike',
                'developer' => 'Supergiant Games',
                'release_year' => 2020,
                'cover_image' => 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2i0b.jpg',
            ],
            [
                'title' => 'God of War',
                'description' => 'Reinvención de la saga con Kratos y su hijo Atreus en la mitología nórdica.',
                'genre' => 'Acción-Aventura',
                'developer' => 'Santa Monica Studio',
                'release_year' => 2018,
                'cover_image' => 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1tmu.jpg',
            ],
            [
                'title' => 'Stardew Valley',
                'description' => 'Simulador de granja relajante donde construyes tu vida en el campo.',
                'genre' => 'Simulación',
                'developer' => 'ConcernedApe',
                'release_year' => 2016,
                'cover_image' => 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1xdk.jpg',
            ],
            [
                'title' => 'Elden Ring',
                'description' => 'Action RPG de mundo abierto creado por FromSoftware y George R.R. Martin.',
                'genre' => 'Action RPG',
                'developer' => 'FromSoftware',
                'release_year' => 2022,
                'cover_image' => 'https://images.igdb.com/igdb/image/upload/t_cover_big/co4jni.jpg',
            ],
        ];

        foreach ($videogames as $game) {
            Videogame::create([
                'title' => $game['title'],
                'slug' => Str::slug($game['title']),
                'description' => $game['description'],
                'genre' => $game['genre'],
                'developer' => $game['developer'],
                'release_year' => $game['release_year'],
                'cover_image' => $game['cover_image'],
            ]);
        }
    }
}