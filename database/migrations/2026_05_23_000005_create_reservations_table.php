<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();

            $table->string('name');
            $table->string('phone');
            $table->string('email');

            $table->enum('service_type', [
                'package',
                'surf_lesson',
                'room',
                'guiding'
            ]);

            $table->foreignId('package_id')
                ->nullable()
                ->constrained('packages')
                ->nullOnDelete();

            $table->foreignId('surf_lesson_id')
                ->nullable()
                ->constrained('surf_lessons')
                ->nullOnDelete();

            $table->foreignId('room_id')
                ->nullable()
                ->constrained('surf_camp_rooms')
                ->nullOnDelete();

            $table->foreignId('guiding_service_id')
                ->nullable()
                ->constrained('guiding_services')
                ->nullOnDelete();

            $table->integer('number_of_people')->default(1);
            $table->date('check_in');
            $table->date('check_out');

            $table->text('message')->nullable();

            $table->enum('status', [
                'Pending',
                'Confirmed',
                'Cancelled'
            ])->default('Pending');

            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
