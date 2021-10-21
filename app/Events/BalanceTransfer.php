<?php

namespace App\Events;

use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;

class BalanceTransfer implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $bt;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct( $bt ) {
        $this->bt = $bt; 
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn() { 
        return new PrivateChannel('balance-transfer.'.$this->bt->to_user_id); 
    }

    public function broadcastWith() {
        return [
            'data' => $this->bt,
        ];
    }
}
