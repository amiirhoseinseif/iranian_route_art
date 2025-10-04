<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PassportClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create personal access clients for each user provider
        $providers = ['artists', 'admins', 'judges'];
        
        foreach ($providers as $provider) {
            $clientName = ucfirst($provider) . ' Personal Access Client';
            
            // Check if client already exists for this provider
            $existingClient = \DB::table('oauth_clients')
                ->where('provider', $provider)
                ->where('name', $clientName)
                ->first();
            
            if (!$existingClient) {
                $clientId = Str::uuid();
                
                \DB::table('oauth_clients')->insert([
                    'id' => $clientId,
                    'name' => $clientName,
                    'secret' => null,
                    'provider' => $provider,
                    'redirect_uris' => json_encode(['http://localhost']),
                    'grant_types' => json_encode(['personal_access']),
                    'revoked' => false,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
                
                // Create corresponding entry in oauth_personal_access_clients table if it exists
                try {
                    \DB::table('oauth_personal_access_clients')->insert([
                        'id' => Str::uuid(),
                        'client_id' => $clientId,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                } catch (\Exception $e) {
                    // Table might not exist in newer Passport versions, that's okay
                    $this->command->warn("Could not create personal access client entry: " . $e->getMessage());
                }
                    
                $this->command->info("Created personal access client for {$provider}");
            } else {
                $this->command->info("Personal access client for {$provider} already exists");
            }
        }
    }
}
