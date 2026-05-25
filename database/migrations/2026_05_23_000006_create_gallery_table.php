<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('gallery', function (Blueprint $table) {
            $table->id();

            $table->json('title')->nullable();

            $table->enum('category', [
                'Surf',
                'Camp',
                'Activities',
                'Trips',
                'Food'
            ]);

            $table->string('image_path');

            $table->boolean('is_active')->default(true);

            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('gallery');
    }
};
