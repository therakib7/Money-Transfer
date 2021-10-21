<?php

namespace App\Events;

use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;

class MtsUpdated implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $mts;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct( $mts ) {
        $this->mts = $mts; 
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn() { 
        return new PrivateChannel('mts-updated.'.$this->mts['user_id']); 
    }

    public function broadcastWith() {
        return [
            'data' => $this->mts,
        ];
    }
}
