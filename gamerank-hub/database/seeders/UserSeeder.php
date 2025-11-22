<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        //Lider de todos
        User::create([
            'name' => 'Admin GameRank',
            'email' => 'admin@gamerank.com',
            'password' => Hash::make('password123'),
            'avatar' => 'https://ui-avatars.com/api/?name=Admin+GameRank&background=4F46E5&color=fff',
            'bio' => 'Administrador principal de GameRank Hub',
            'reputation' => 1000,
            'is_admin' => true,
            'email_verified_at' => now(),
        ]);

        // Usuario Normal1
        User::create([
            'name' => 'Carlos Gamer',
            'email' => 'carlos@gmail.com',
            'password' => Hash::make('password123'),
            'avatar' => 'https://ui-avatars.com/api/?name=Carlos+Gamer&background=10B981&color=fff',
            'bio' => 'Fanático de los RPGs y juegos de estrategia',
            'reputation' => 250,
            'is_admin' => false,
            'email_verified_at' => now(),
        ]);

        // Usuario Normal2
        User::create([
            'name' => 'Ana López',
            'email' => 'ana@gmail.com',
            'password' => Hash::make('password123'),
            'avatar' => 'https://ui-avatars.com/api/?name=Ana+Lopez&background=F59E0B&color=fff',
            'bio' => 'Amante de los juegos indie y aventuras',
            'reputation' => 180,
            'is_admin' => false,
            'email_verified_at' => now(),
        ]);

        // Usuario Normal3
        User::create([
            'name' => 'Miguel Torres',
            'email' => 'miguel@gmail.com',
            'password' => Hash::make('password123'),
            'avatar' => 'https://ui-avatars.com/api/?name=Miguel+Torres&background=EF4444&color=fff',
            'bio' => 'Competitivo de shooters y MOBAs',
            'reputation' => 320,
            'is_admin' => false,
            'email_verified_at' => now(),
        ]);

        // Usuario Normal4
        User::create([
            'name' => 'Laura Martínez',
            'email' => 'laura@gmail.com',
            'password' => Hash::make('password123'),
            'avatar' => 'https://ui-avatars.com/api/?name=Laura+Martinez&background=8B5CF6&color=fff',
            'bio' => 'Fan de plataformeros y juegos retro',
            'reputation' => 150,
            'is_admin' => false,
            'email_verified_at' => now(),
        ]);
    }
}