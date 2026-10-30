<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\WeddingContent;

class WeddingContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $defaults = WeddingContent::getDefaults();

        foreach ($defaults as $section => $data) {
            WeddingContent::updateOrCreate(
                ['section' => $section],
                ['data' => $data]
            );
        }
    }
}
