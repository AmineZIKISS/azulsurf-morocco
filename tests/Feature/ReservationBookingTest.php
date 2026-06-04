<?php

namespace Tests\Feature;

use App\Models\Reservation;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ReservationBookingTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test that a reservation code is automatically generated on creation.
     */
    public function test_reservation_code_is_generated_on_creation(): void
    {
        $reservation = Reservation::create([
            'name' => 'John Doe',
            'phone' => '+212600000000',
            'email' => 'john@example.com',
            'service_type' => 'package',
            'number_of_people' => 2,
            'check_in' => '2026-07-01',
            'check_out' => '2026-07-08',
            'status' => 'Pending',
        ]);

        $this->assertNotNull($reservation->reservation_code);
        $this->assertStringStartsWith('AZUL-', $reservation->reservation_code);
        $this->assertEquals(11, strlen($reservation->reservation_code)); // 'AZUL-' (5) + 6 random chars
    }

    /**
     * Test that booked-dates endpoint only returns dates for Confirmed/Confirmé/Blocked/Bloqué.
     */
    public function test_booked_dates_endpoint_filters_by_status(): void
    {
        // 1. Create a Pending reservation
        Reservation::create([
            'name' => 'Pending User',
            'phone' => '111111111',
            'email' => 'pending@example.com',
            'service_type' => 'room',
            'number_of_people' => 1,
            'check_in' => '2026-08-01',
            'check_out' => '2026-08-02',
            'status' => 'Pending',
        ]);

        // 2. Create a Confirmed reservation
        Reservation::create([
            'name' => 'Confirmed User',
            'phone' => '222222222',
            'email' => 'confirmed@example.com',
            'service_type' => 'room',
            'number_of_people' => 1,
            'check_in' => '2026-08-10',
            'check_out' => '2026-08-11',
            'status' => 'Confirmed',
        ]);

        // 3. Create a Bloqué reservation
        Reservation::create([
            'name' => 'Blocked User',
            'phone' => '333333333',
            'email' => 'blocked@example.com',
            'service_type' => 'room',
            'number_of_people' => 1,
            'check_in' => '2026-08-20',
            'check_out' => '2026-08-21',
            'status' => 'Bloqué',
        ]);

        // Hit /api/booked-dates
        $response = $this->getJson('/api/booked-dates');

        $response->assertStatus(200);
        $bookedDates = $response->json('booked_dates');

        // Confirmed dates should be present
        $this->assertContains('2026-08-10', $bookedDates);
        $this->assertContains('2026-08-11', $bookedDates);

        // Bloqué dates should be present
        $this->assertContains('2026-08-20', $bookedDates);
        $this->assertContains('2026-08-21', $bookedDates);

        // Pending dates should NOT be present
        $this->assertNotContains('2026-08-01', $bookedDates);
        $this->assertNotContains('2026-08-02', $bookedDates);
    }
}
