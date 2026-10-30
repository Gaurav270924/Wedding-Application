<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create or update default wedding administrator
        User::updateOrCreate(
            ['email' => 'admin@wedding.com'],
            [
                'name' => 'Wedding Admin',
                'password' => Hash::make('password123'),
                'email_verified_at' => now(),
            ]
        );

        $this->call([
            WeddingSeeder::class,
            WeddingContentSeeder::class,
        ]);
    }
}
