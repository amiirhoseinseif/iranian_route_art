<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Str;

class CreatePassportClients extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'passport:create-clients';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create personal access clients for all user providers';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        try {
            $providers = ['artists', 'admins', 'judges'];
            
            foreach ($providers as $provider) {
                $clientName = ucfirst($provider) . ' Personal Access Client';
                
                // Check if client exists for this provider
                $existingClient = \DB::table('oauth_clients')
                    ->where('provider', $provider)
                    ->where('name', $clientName)
                    ->first();
                
                if (!$existingClient) {
                    // Create the client
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
                    
                    $this->info("✅ Created personal access client for {$provider}");
                } else {
                    $this->info("ℹ️  Personal access client for {$provider} already exists");
                }
            }
            
            $this->info('🎉 All personal access clients are ready!');
            return 0;
            
        } catch (\Exception $e) {
            $this->error('❌ Error creating OAuth clients: ' . $e->getMessage());
            return 1;
        }
    }
}
