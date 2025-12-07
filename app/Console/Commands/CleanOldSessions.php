<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class CleanOldSessions extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'session:clean-old {--days=7 : Number of days to keep sessions} {--all : Clear all sessions}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Clean old sessions and remove user_data from sessions to prevent header size issues';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // If --all flag is set, clear all sessions
        if ($this->option('all')) {
            $count = DB::table('sessions')->count();
            DB::table('sessions')->truncate();
            $this->info("Cleared all {$count} sessions successfully!");
            return Command::SUCCESS;
        }
        
        $days = (int) $this->option('days');
        $cutoffTime = now()->subDays($days)->timestamp;
        
        $this->info("Cleaning sessions older than {$days} days...");
        
        // Get all sessions
        $sessions = DB::table('sessions')->get();
        $cleanedCount = 0;
        $deletedCount = 0;
        
        foreach ($sessions as $session) {
            try {
                $payload = unserialize(base64_decode($session->payload));
                
                // Check if session has user_data (old format)
                if (isset($payload['user_data'])) {
                    // Remove user_data from payload
                    unset($payload['user_data']);
                    
                    // Update session with cleaned payload
                    DB::table('sessions')
                        ->where('id', $session->id)
                        ->update([
                            'payload' => base64_encode(serialize($payload))
                        ]);
                    
                    $cleanedCount++;
                }
                
                // Delete very old sessions
                if ($session->last_activity < $cutoffTime) {
                    DB::table('sessions')->where('id', $session->id)->delete();
                    $deletedCount++;
                }
            } catch (\Exception $e) {
                // If session payload is corrupted, delete it
                DB::table('sessions')->where('id', $session->id)->delete();
                $deletedCount++;
            }
        }
        
        $this->info("Cleaned {$cleanedCount} sessions (removed user_data)");
        $this->info("Deleted {$deletedCount} old sessions");
        $this->info("Done!");
        
        return Command::SUCCESS;
    }
}
