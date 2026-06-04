<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Package;

class PackageSeeder extends Seeder
{
    /**
     * Seed the 7 Azul Surf packages into the database.
     */
    public function run(): void
    {
        // Truncate first to avoid duplicates on re-seeding
        Package::withTrashed()->forceDelete();

        $packages = [
            [
                'title'             => ['fr' => 'Surf Lessons Only', 'en' => 'Surf Lessons Only'],
                'slug'              => 'surf-lessons-only',
                'description'       => [
                    'fr' => 'Cours de surf encadrés par nos moniteurs certifiés, pour tous niveaux.',
                    'en' => 'Surf lessons led by our certified instructors, for all levels.',
                ],
                'duration'          => '1 session (2h)',
                'price'             => 35.00,
                'included_services' => [
                    'Cours de surf (2h)',
                    'Matériel (planche + combinaison)',
                    'Encadrement moniteur certifié',
                ],
                'image'     => null,
                'is_active' => true,
            ],
            [
                'title'             => ['fr' => 'Chambre Privée (Hébergement Seul)', 'en' => 'Private Room (Accommodation Only)'],
                'slug'              => 'chambre-privee',
                'description'       => [
                    'fr' => 'Hébergement en chambre privée dans notre surf house avec vue sur l\'océan.',
                    'en' => 'Accommodation in a private room at our surf house with ocean view.',
                ],
                'duration'          => 'Par nuit',
                'price'             => 45.00,
                'included_services' => [
                    'Chambre privée',
                    'Petit-déjeuner inclus',
                    'Wi-Fi',
                    'Accès terrasse',
                ],
                'image'     => null,
                'is_active' => true,
            ],
            [
                'title'             => ['fr' => 'Chambre Partagée (Hébergement Seul)', 'en' => 'Shared Room (Accommodation Only)'],
                'slug'              => 'chambre-partagee',
                'description'       => [
                    'fr' => 'Hébergement en dortoir dans notre surf house, ambiance conviviale garantie.',
                    'en' => 'Dormitory accommodation in our surf house, great social atmosphere guaranteed.',
                ],
                'duration'          => 'Par nuit',
                'price'             => 25.00,
                'included_services' => [
                    'Lit en chambre partagée',
                    'Petit-déjeuner inclus',
                    'Wi-Fi',
                    'Accès terrasse',
                ],
                'image'     => null,
                'is_active' => true,
            ],
            [
                'title'             => ['fr' => 'Free Surf Stay', 'en' => 'Free Surf Stay'],
                'slug'              => 'free-surf-stay',
                'description'       => [
                    'fr' => 'Hébergement + accès libre au matériel de surf pour les surfeurs autonomes.',
                    'en' => 'Accommodation + free access to surf equipment for independent surfers.',
                ],
                'duration'          => 'Par nuit',
                'price'             => 55.00,
                'included_services' => [
                    'Hébergement (chambre au choix)',
                    'Petit-déjeuner inclus',
                    'Location matériel illimitée',
                    'Wi-Fi',
                ],
                'image'     => null,
                'is_active' => true,
            ],
            [
                'title'             => ['fr' => 'Surf Package (Sans Transfert)', 'en' => 'Surf Package (Without Transfer)'],
                'slug'              => 'surf-package-sans-transfert',
                'description'       => [
                    'fr' => 'Hébergement + cours de surf quotidiens, sans transfert aéroport.',
                    'en' => 'Accommodation + daily surf lessons, without airport transfer.',
                ],
                'duration'          => '7 nuits',
                'price'             => 420.00,
                'included_services' => [
                    'Hébergement (7 nuits)',
                    'Petit-déjeuner & dîner',
                    'Cours de surf quotidiens',
                    'Matériel de surf',
                    'Wi-Fi',
                ],
                'image'     => null,
                'is_active' => true,
            ],
            [
                'title'             => ['fr' => 'Surf Guiding Package', 'en' => 'Surf Guiding Package'],
                'slug'              => 'surf-guiding-package',
                'description'       => [
                    'fr' => 'Hébergement + guidage surf personnalisé pour découvrir les meilleurs spots de Mirleft.',
                    'en' => 'Accommodation + personalized surf guiding to discover the best spots in Mirleft.',
                ],
                'duration'          => '7 nuits',
                'price'             => 490.00,
                'included_services' => [
                    'Hébergement (7 nuits)',
                    'Petit-déjeuner & dîner',
                    'Surf guiding quotidien',
                    'Matériel de surf',
                    'Transport vers les spots',
                    'Wi-Fi',
                ],
                'image'     => null,
                'is_active' => true,
            ],
            [
                'title'             => ['fr' => 'Full Surf Package', 'en' => 'Full Surf Package'],
                'slug'              => 'full-surf-package',
                'description'       => [
                    'fr' => 'Notre formule tout inclus : hébergement, cours, guiding et transfert aéroport.',
                    'en' => 'Our all-inclusive formula: accommodation, lessons, guiding and airport transfer.',
                ],
                'duration'          => '7 nuits',
                'price'             => 590.00,
                'included_services' => [
                    'Transfert aéroport aller-retour',
                    'Hébergement (7 nuits)',
                    'Petit-déjeuner & dîner',
                    'Cours de surf quotidiens',
                    'Surf guiding',
                    'Matériel de surf',
                    'Wi-Fi',
                ],
                'image'     => null,
                'is_active' => true,
            ],
        ];

        foreach ($packages as $data) {
            Package::create($data);
        }

        $this->command->info('✅ 7 packages seeded successfully.');
    }
}
