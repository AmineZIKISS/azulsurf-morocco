<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('contacts', function (Blueprint $table) {
            $table->id();

            $table->string('full_name');
            $table->string('email');
            $table->string('phone_number')->nullable();

            $table->string('subject');

            $table->enum('selected_service', [
                'Surf Camp',
                'Surf School',
                'Surf Package',
                'Surf Guiding',
                'Other'
            ])->default('Other');

            $table->text('message');

            $table->boolean('is_read')->default(false);

            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('contacts');
    }
};
