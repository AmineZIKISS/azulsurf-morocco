<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('surf_camp_rooms', function (Blueprint $table) {
            $table->id();

            $table->json('room_type');
            $table->string('slug')->unique();
            $table->json('description');

            $table->integer('capacity');
            $table->decimal('price_per_night', 10, 2);

            $table->string('image')->nullable();

            $table->boolean('is_active')->default(true);

            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('surf_camp_rooms');
    }
};
