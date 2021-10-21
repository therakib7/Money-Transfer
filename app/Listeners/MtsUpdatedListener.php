<?php

namespace App\Listeners;

use App\Events\MtsUpdated;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
//use Modules\MT\Models\MtReferralBalance; 
class MtsUpdatedListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  MtsUpdated  $event
     * @return void
     */
    public function handle(MtsUpdated $event)
    {
        //testing is working
        /*MtReferralBalance::create([
            'from_user_id' => 2,   
            'to_user_id' => 2,   
            'amount' => $event->actionId,   
        ]);*/
    }
}
