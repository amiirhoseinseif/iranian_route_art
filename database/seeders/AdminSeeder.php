<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('admins')->insert([
            'first_name' => 'amirhosein',
            'last_name' => 'seif',
            'email' => 'amiirhoseinseif@gmail.com',
            'phone' => '09101006949',
            'password' => Hash::make('Amirhosein@12'),
            'role' => 'super_admin',
            'permissions' => json_encode([
                'manage_users' => true,
                'manage_art_fields' => true,
                'manage_judges' => true,
                'manage_arts' => true,
                'manage_settings' => true,
                'view_statistics' => true,
            ]),
            'is_active' => true,
            'email_verified_at' => now(),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
