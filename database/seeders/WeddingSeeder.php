<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Wish;

class WeddingSeeder extends Seeder
{
    public function run(): void
    {
        Wish::truncate();

        Wish::create([
            'name' => 'Amit & Sneha Verma',
            'message' => 'May your love grow stronger with each passing day. Heartiest congratulations to Kritagaya and Anuradha on beginning this beautiful journey together!',
            'approved' => true,
        ]);

        Wish::create([
            'name' => 'The Chandel Family',
            'message' => 'Dono parivaaron ko dher saara aashirwad aur shubhkamnayein. Madhav hamesha aap dono ki jodi par kripa banaye rakhein.',
            'approved' => true,
        ]);

        Wish::create([
            'name' => 'Rohan & Neha',
            'message' => 'Can’t wait for the sangeet and wedding madness! Wishing you a lifetime of laughter, joy, and endless adventures together.',
            'approved' => true,
        ]);
    }
}
