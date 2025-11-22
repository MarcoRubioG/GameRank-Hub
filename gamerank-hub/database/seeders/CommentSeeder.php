<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Comment;

class CommentSeeder extends Seeder
{
    public function run(): void
    {
        $comments = [
            [
                'user_id' => 3,
                'review_id' => 1,
                'content' => 'Totalmente de acuerdo. Es mi juego favorito de Nintendo.',
            ],
            [
                'user_id' => 4,
                'review_id' => 1,
                'content' => 'La física y las mecánicas son increíbles.',
            ],
            [
                'user_id' => 2,
                'review_id' => 2,
                'content' => '¡Sí! Las misiones secundarias son tan buenas como la principal.',
            ],
            [
                'user_id' => 5,
                'review_id' => 3,
                'content' => 'Me tomó semanas terminarlo, pero valió cada hora.',
            ],
            [
                'user_id' => 2,
                'review_id' => 4,
                'content' => 'La banda sonora de este juego es épica.',
            ],
            [
                'user_id' => 4,
                'review_id' => 5,
                'content' => 'Arthur Morgan es uno de los mejores protagonistas de la historia.',
            ],
        ];

        foreach ($comments as $comment) {
            Comment::create($comment);
        }
    }
}