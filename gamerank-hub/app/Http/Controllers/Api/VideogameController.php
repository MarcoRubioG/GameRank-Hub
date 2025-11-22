<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Videogame;
use App\Http\Requests\StoreVideogameRequest;
use App\Http\Requests\UpdateVideogameRequest;
use Illuminate\Support\Str;

class VideogameController extends Controller
{
    // Listar todos los videojuegos
    public function index()
    {
        $videogames = Videogame::with('reviews')->paginate(10);
        
        return response()->json([
            'message' => 'Lista de videojuegos',
            'data' => $videogames
        ]);
    }

    // Crear un nuevo videojuego
    public function store(StoreVideogameRequest $request)
    {
        $videogame = Videogame::create([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'description' => $request->description,
            'genre' => $request->genre,
            'developer' => $request->developer,
            'release_year' => $request->release_year,
            'cover_image' => $request->cover_image,
        ]);

        return response()->json([
            'message' => 'Videojuego creado exitosamente',
            'data' => $videogame
        ], 201);
    }

    // Mostrar un videojuego específico
    public function show($id)
    {
        $videogame = Videogame::with(['reviews.user', 'reviews.comments'])->find($id);

        if (!$videogame) {
            return response()->json([
                'message' => 'Videojuego no encontrado'
            ], 404);
        }

        return response()->json([
            'message' => 'Detalle del videojuego',
            'data' => $videogame
        ]);
    }

    // Actualizar un videojuego
    public function update(UpdateVideogameRequest $request, $id)
    {
        $videogame = Videogame::find($id);

        if (!$videogame) {
            return response()->json([
                'message' => 'Videojuego no encontrado'
            ], 404);
        }

        $videogame->update($request->validated());

        if ($request->has('title')) {
            $videogame->slug = Str::slug($request->title);
            $videogame->save();
        }

        return response()->json([
            'message' => 'Videojuego actualizado exitosamente',
            'data' => $videogame
        ]);
    }

    // Eliminar un videojuego
    public function destroy($id)
    {
        $videogame = Videogame::find($id);

        if (!$videogame) {
            return response()->json([
                'message' => 'Videojuego no encontrado'
            ], 404);
        }

        $videogame->delete();

        return response()->json([
            'message' => 'Videojuego eliminado exitosamente'
        ]);
    }
}