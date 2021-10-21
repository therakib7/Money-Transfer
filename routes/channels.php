<?php

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

/* In module route folder channels.php file not working
that's why i added here */
Broadcast::channel('message.{userId}', function ($user, $userId) {
    return $user->id == $userId;
}); 

Broadcast::channel('mts-updated.{userId}', function ($user, $userId) {
    return $user->id == $userId;
}); 

Broadcast::channel('balance-transfer.{userId}', function ($user, $userId) {
    return $user->id == $userId;
}); 