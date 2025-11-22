<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FollowSeeder extends Seeder
{
    public function run(): void
    {
        $follows = [
            ['follower_id' => 2, 'following_id' => 3],
            ['follower_id' => 2, 'following_id' => 4],
            ['follower_id' => 3, 'following_id' => 2],
            ['follower_id' => 3, 'following_id' => 5],
            ['follower_id' => 4, 'following_id' => 2],
            ['follower_id' => 4, 'following_id' => 3],
            ['follower_id' => 5, 'following_id' => 4],
        ];

        foreach ($follows as $follow) {
            DB::table('follows')->insert([
                'follower_id' => $follow['follower_id'],
                'following_id' => $follow['following_id'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}