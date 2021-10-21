<?php

namespace App\Listeners;

use App\Events\BalanceTransfer;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
//use Modules\MT\Models\MtReferralBalance; 
class BalanceTransferListener
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
     * @param  BalanceTransfer  $event
     * @return void
     */
    public function handle(BalanceTransfer $event)
    {
        //testing is working
        /*MtReferralBalance::create([
            'from_user_id' => 2,   
            'to_user_id' => 2,   
            'amount' => $event->actionId,   
        ]);*/
    }
}
