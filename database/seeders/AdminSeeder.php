<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\User;
use App\Models\Reservation;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@azulsurf.com'],
            [
                'name' => 'Aziz Admin',
                'password' => Hash::make('password123'),
                'role' => 'admin',
            ]
        );

        Reservation::updateOrCreate(
            ['email' => 'guest1@example.com', 'check_in' => '2026-06-15'],
            [
                'name' => 'Alice Martin',
                'phone' => '+33 6 12 34 56 78',
                'service_type' => 'package',
                'number_of_people' => 2,
                'check_out' => '2026-06-22',
                'message' => 'Looking forward to the surf lessons!',
                'status' => 'Pending',
            ]
        );

        Reservation::updateOrCreate(
            ['email' => 'guest2@example.com', 'check_in' => '2026-07-01'],
            [
                'name' => 'Marc Dupont',
                'phone' => '+33 6 98 76 54 32',
                'service_type' => 'room',
                'number_of_people' => 1,
                'check_out' => '2026-07-08',
                'message' => 'Ocean view room preferred.',
                'status' => 'Confirmed',
            ]
        );

        Reservation::updateOrCreate(
            ['email' => 'guest3@example.com', 'check_in' => '2026-05-20'],
            [
                'name' => 'Sarah Connor',
                'phone' => '+1 555 1234',
                'service_type' => 'guiding',
                'number_of_people' => 4,
                'check_out' => '2026-05-27',
                'message' => 'Need guide for advanced point breaks.',
                'status' => 'Cancelled',
            ]
        );
    }
}
