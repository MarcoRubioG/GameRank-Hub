<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('videogame_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->text('content');
            $table->decimal('rating', 4, 2);
            $table->integer('upvotes')->default(0);
            $table->integer('downvotes')->default(0);
            $table->timestamps();
            $table->softDeletes();
            
            $table->unique(['user_id', 'videogame_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};