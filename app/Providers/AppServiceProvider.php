<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Eloquent\Relations\Relation;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        /* This is to force https */
        if ( $this->app->environment('production') ) {
            \URL::forceScheme('https');
        }

        Relation::morphMap([  
            'provider' => 'Modules\MT\Models\MtProvider', 
            'help' => 'Modules\MT\Models\MtHelp',    
        ]);
        // custom: this is for older version of mysql
        Schema::defaultStringLength(191);

    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
