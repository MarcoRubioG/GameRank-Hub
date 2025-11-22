<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Review;

class ReviewSeeder extends Seeder
{
    public function run(): void
    {
        $reviews = [
            [
                'user_id' => 2,
                'videogame_id' => 1,
                'title' => 'Una obra maestra del gaming',
                'content' => 'Breath of the Wild redefine lo que significa un juego de mundo abierto. La libertad de exploración es incomparable.',
                'rating' => 9.5,
                'upvotes' => 45,
                'downvotes' => 2,
            ],
            [
                'user_id' => 3,
                'videogame_id' => 2,
                'title' => 'El mejor RPG de la década',
                'content' => 'The Witcher 3 tiene una narrativa increíble, personajes memorables y un mundo vivo. Imprescindible.',
                'rating' => 10.0,
                'upvotes' => 78,
                'downvotes' => 1,
            ],
            [
                'user_id' => 4,
                'videogame_id' => 3,
                'title' => 'Difícil pero gratificante',
                'content' => 'Dark Souls III es desafiante pero justo. Cada victoria se siente como un logro real.',
                'rating' => 9.0,
                'upvotes' => 56,
                'downvotes' => 8,
            ],
            [
                'user_id' => 5,
                'videogame_id' => 4,
                'title' => 'Joya indie imprescindible',
                'content' => 'Hollow Knight es una obra de arte. El diseño de niveles, música y combate son perfectos.',
                'rating' => 9.8,
                'upvotes' => 92,
                'downvotes' => 3,
            ],
            [
                'user_id' => 2,
                'videogame_id' => 5,
                'title' => 'Historia épica del oeste',
                'content' => 'Red Dead Redemption 2 es cine interactivo. La atención al detalle es asombrosa.',
                'rating' => 9.7,
                'upvotes' => 67,
                'downvotes' => 5,
            ],
            [
                'user_id' => 3,
                'videogame_id' => 6,
                'title' => 'Plataformero perfecto',
                'content' => 'Celeste combina jugabilidad precisa con una historia emotiva sobre salud mental.',
                'rating' => 9.4,
                'upvotes' => 81,
                'downvotes' => 2,
            ],
            [
                'user_id' => 4,
                'videogame_id' => 7,
                'title' => 'Roguelike adictivo',
                'content' => 'Hades tiene una narrativa fantástica que se desarrolla con cada muerte. Altamente rejugable.',
                'rating' => 9.6,
                'upvotes' => 103,
                'downvotes' => 4,
            ],
            [
                'user_id' => 5,
                'videogame_id' => 8,
                'title' => 'Reinvención exitosa',
                'content' => 'God of War 2018 es una obra maestra. La relación padre-hijo es conmovedora.',
                'rating' => 9.8,
                'upvotes' => 95,
                'downvotes' => 2,
            ],
        ];

        foreach ($reviews as $review) {
            Review::create($review);
        }
    }
}