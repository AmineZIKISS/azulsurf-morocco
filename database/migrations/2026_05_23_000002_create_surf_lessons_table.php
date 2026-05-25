<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('surf_lessons', function (Blueprint $table) {
            $table->id();

            $table->json('level');
            $table->string('slug')->unique();
            $table->json('description');

            $table->string('duration');
            $table->decimal('price', 10, 2);

            $table->string('image')->nullable();

            $table->boolean('is_active')->default(true);

            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('surf_lessons');
    }
};
