<?php

namespace Modules\MT\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash; 
use Illuminate\Support\Str;

use App\Models\User;
use App\Models\Profile;
use App\Models\Role;
use App\Models\Permission;
use Modules\AC\Models\AcBalance; 
use Modules\MT\Models\MtSetting; 
use Modules\MT\Models\MtTaxonomy;
use Modules\CT\Models\CtTaxonomy;
use Modules\MT\Models\MtProvider; 
use Modules\MT\Models\MtService; 

class MTDatabaseSeeder extends Seeder {
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        Model::unguard();

        // $this->call("OthersTableSeeder");

        $main_account = AcBalance::create([
            'user_id' => 0, 
            'balance' => 0, 
        ]);

     
        $user = User::create([
            'name' => 'Rakibul Hasan',
            'username' => 'therakib7',
            'email' => 'therakib7@gmail.com',
            'password' => Hash::make('only4me'),
            'pin' => Hash::make('1234'),
            'status' => 1,
        ]);

        $profile = Profile::create([
            'user_id' => $user->id, 
        ]); 

        $profile = AcBalance::create([
            'user_id' => $user->id, 
            'balance' => 0, 
        ]);

        MtSetting::create([
            'key' => 'mobile_recharge_com', 
            'value' => '80', 
            'updated_by' => $user->id,  
        ]);

        MtSetting::create([
            'key' => 'mobile_recharge_pl_com', 
            'value' => '80', 
            'updated_by' => $user->id,  
        ]); 

        MtSetting::create([
            'key' => 'mobile_banking_com', 
            'value' => '80', 
            'updated_by' => $user->id,  
        ]); 

        MtSetting::create([
            'key' => 'utility_bill_pay_com', 
            'value' => '80', 
            'updated_by' => $user->id,  
        ]);
        
        $permissions = [ 
            'User' => ['User Role', 'User Permission'], 
            'Media', 
            'Service', 
            'Provider' => ['Provider Taxonomy'], 
            'Banking Provider',
            'Banking Account',
            'Transfer Request',
            'Sim' => ['Sim Balance', 'Sim Balance History'], 
            'Mobile Recharge', 
            'Mobile Banking', 
            'CashOut Banking', 
            'Utility Bill', 
            'Due Amount', 
            'Balance Transfer', 
            'Contact' => ['Contact Taxonomy'], 
            'Utility Contact' => ['Utility Contact Taxonomy'],
            'Message',  
            'Referral',  
            'Package',  
            'Card',  
            'Commission' => ['Commission Custom User'],
            'Help', 
            'Doc', 
            'Notice', 
            'Geo Type', 
            'Geo Location', 
            'Setting' => ['Setting Profile', 'Setting Security', 'Setting Money Transfer', 'Setting Commission', 'Setting Appreance'], 
            'Modem', 
        ];

        $role_permissions = [];
        foreach ($permissions as $key => $value) { 

            if ( is_array( $value ) ) {

                $permission = Permission::create([
                    'name' => Str::plural($key), 
                    'guard_name' => Str::plural( str_slug($key) ),
                    'parent_id' => null,  
                ]);
                $role_permissions[] = $permission->id;

                $sub_per = Permission::create([
                    'name' => $key.' View', 
                    'guard_name' => str_slug($key).'-view',
                    'parent_id' => $permission->id,  
                ]);
                $role_permissions[] = $sub_per->id;

                $sub_per = Permission::create([
                    'name' => $key.' Create', 
                    'guard_name' => str_slug($key).'-create',
                    'parent_id' => $permission->id,  
                ]);
                $role_permissions[] = $sub_per->id;

                $sub_per = Permission::create([
                    'name' => $key.' Edit', 
                    'guard_name' => str_slug($key).'-edit',
                    'parent_id' => $permission->id,  
                ]);
                $role_permissions[] = $sub_per->id;

                $sub_per = Permission::create([
                    'name' => $key.' Delete', 
                    'guard_name' => str_slug($key).'-delete',
                    'parent_id' => $permission->id,  
                ]);
                $role_permissions[] = $sub_per->id;

                $sub_per = Permission::create([
                    'name' => $key.' Super', 
                    'guard_name' => str_slug($key).'-super',
                    'parent_id' => $permission->id,  
                ]);
                $role_permissions[] = $sub_per->id;

                $sub_per = Permission::create([
                    'name' => $key.' Super', 
                    'guard_name' => str_slug($key).'-top-super',
                    'parent_id' => $permission->id,  
                ]);
                $role_permissions[] = $sub_per->id;

                foreach ($value as $sub_key => $sub_value) {
                    
                    $sub_per = Permission::create([
                        'name' => $sub_value.' View', 
                        'guard_name' => str_slug($sub_value).'-view',
                        'parent_id' => $permission->id,  
                    ]);
                    $role_permissions[] = $sub_per->id;

                    $sub_per = Permission::create([
                        'name' => $sub_value.' Create', 
                        'guard_name' => str_slug($sub_value).'-create',
                        'parent_id' => $permission->id,  
                    ]);
                    $role_permissions[] = $sub_per->id;

                    $sub_per = Permission::create([
                        'name' => $sub_value.' Edit', 
                        'guard_name' => str_slug($sub_value).'-edit',
                        'parent_id' => $permission->id,  
                    ]);
                    $role_permissions[] = $sub_per->id;

                    $sub_per = Permission::create([
                        'name' => $sub_value.' Delete', 
                        'guard_name' => str_slug($sub_value).'-delete',
                        'parent_id' => $permission->id,  
                    ]);
                    $role_permissions[] = $sub_per->id;

                    $sub_per = Permission::create([
                        'name' => $sub_value.' Super', 
                        'guard_name' => str_slug($sub_value).'-super',
                        'parent_id' => $permission->id,  
                    ]);
                    $role_permissions[] = $sub_per->id; 

                    $sub_per = Permission::create([
                        'name' => $sub_value.' Super', 
                        'guard_name' => str_slug($sub_value).'-top-super',
                        'parent_id' => $permission->id,  
                    ]);
                    $role_permissions[] = $sub_per->id; 
                }

            } else {

                $permission = Permission::create([
                    'name' => Str::plural($value), 
                    'guard_name' => Str::plural( str_slug($value) ),
                    'parent_id' => null,  
                ]);
                $role_permissions[] = $permission->id;
                
                $sub_per = Permission::create([
                    'name' => $value.' View', 
                    'guard_name' => str_slug($value).'-view',
                    'parent_id' => $permission->id,  
                ]);
                $role_permissions[] = $sub_per->id;

                $sub_per = Permission::create([
                    'name' => $value.' Create', 
                    'guard_name' => str_slug($value).'-create',
                    'parent_id' => $permission->id,  
                ]);
                $role_permissions[] = $sub_per->id;

                $sub_per = Permission::create([
                    'name' => $value.' Edit', 
                    'guard_name' => str_slug($value).'-edit',
                    'parent_id' => $permission->id,  
                ]);
                $role_permissions[] = $sub_per->id;

                $sub_per = Permission::create([
                    'name' => $value.' Delete', 
                    'guard_name' => str_slug($value).'-delete',
                    'parent_id' => $permission->id,  
                ]);
                $role_permissions[] = $sub_per->id;

                $sub_per = Permission::create([
                    'name' => $value.' Super', 
                    'guard_name' => str_slug($value).'-super',
                    'parent_id' => $permission->id,  
                ]);
                $role_permissions[] = $sub_per->id;

                $sub_per = Permission::create([
                    'name' => $value.' Super', 
                    'guard_name' => str_slug($value).'-top-super',
                    'parent_id' => $permission->id,  
                ]);
                $role_permissions[] = $sub_per->id;

            }            
        } 

        $role = Role::create([
            'name' => 'Super Admin', 
            'slug' => 'super-admin', 
            'desc' => 'Who can manage everything',  
            'user_id' => $user->id,  
        ]); 

        Role::create([
            'name' => 'Agent',
            'slug' => 'agent',  
            'desc' => 'Who works in village',  
            'user_id' => $user->id,  
        ]); 

        Role::create([
            'name' => 'Merchant',
            'slug' => 'merchant',  
            'desc' => 'Who is Shopkeeper',  
            'user_id' => $user->id,  
        ]); 

        Role::create([
            'name' => 'Persoanl', 
            'slug' => 'personal',
            'desc' => 'Permissions for all users',  
            'user_id' => $user->id,  
        ]); 

        $insert_permissions = [];
        foreach ($role_permissions as $key => $value) { 
            $insert_permissions[$key]['role_id'] = $role->id;
            $insert_permissions[$key]['permission_id'] = $value;
        }
        
        $role->permissions()->createMany( $insert_permissions );

        $user_role = [
            'user_id' => $user->id, 
            'role_id' => $role->id, 
        ]; 
        $user->roles()->create( $user_role );

        /* Mobile Recharge */
        $flexi_cat = MtTaxonomy::create([
           'name' => 'Mobile Recharge', 
           'slug' => 'mobile-recharge',
           'taxonomy' => 'provider-category',
           'parent_id' => null,  
        ]); 

        $mb_banking_cat = MtTaxonomy::create([
           'name' => 'Mobile Banking', 
           'slug' => 'mobile-banking',
           'taxonomy' => 'provider-category',
           'parent_id' => null,  
        ]); 

        $flexi_banking_cat = MtTaxonomy::create([
           'name' => 'Mobile Recharge Mobile Banking', 
           'slug' => 'mobile-recharge-banking',
           'taxonomy' => 'provider-category',
           'parent_id' => null,  
        ]);

        $flexi_providers = [ 
            [   
                'status' => 1,  
                'name' => 'Grameenphone',  
                'slug' => 'grameenphone',  
                'prefix' => '017:013', 
                'min_number' => '11', 
                'max_number' => '11', 
                'services' => [
                    [
                        'status' => 1,  
                        'name' => 'Prepaid',  
                        'slug' => 'prepaid',  
                        'operator_code' => 'GP',  
                        'co_com' => '2.8',  
                        'user_com' => '2.8',  
                    ], 
                    [
                        'status' => 1,
                        'name' => 'Postpaid',  
                        'slug' => 'postpaid',  
                        'operator_code' => 'GPP', 
                        'co_com' => '2.8',  
                        'user_com' => '2.8', 
                    ],
                ]
            ],
            [   
                'status' => 1,  
                'name' => 'Banglalink',  
                'slug' => 'banglalink',  
                'prefix' => '019:014', 
                'min_number' => '11', 
                'max_number' => '11', 
                'services' => [
                    [
                        'status' => 1,  
                        'name' => 'Prepaid',  
                        'slug' => 'prepaid',  
                        'operator_code' => 'BL', 
                        'co_com' => '2.8',  
                        'user_com' => '2.8',  
                    ], 
                    [
                        'status' => 1,
                        'name' => 'Postpaid',  
                        'slug' => 'postpaid',  
                        'operator_code' => 'BLP',
                        'co_com' => '2.8',  
                        'user_com' => '2.8',  
                    ],
                ]
            ],
            [   
                'status' => 1,  
                'name' => 'Robi',  
                'slug' => 'robi',  
                'prefix' => '018', 
                'min_number' => '11', 
                'max_number' => '11', 
                'services' => [
                    [
                        'status' => 1,  
                        'name' => 'Prepaid',  
                        'slug' => 'prepaid',  
                        'operator_code' => 'RB', 
                        'co_com' => '2.8',  
                        'user_com' => '2.8',  
                    ], 
                    [
                        'status' => 1,
                        'name' => 'Postpaid',  
                        'slug' => 'postpaid',  
                        'operator_code' => 'RBP',
                        'co_com' => '2.8',  
                        'user_com' => '2.8',  
                    ],
                ]
            ],
            [   
                'status' => 1,  
                'name' => 'Airtel',  
                'slug' => 'airtel',  
                'prefix' => '016', 
                'min_number' => '11', 
                'max_number' => '11', 
                'services' => [
                    [
                        'status' => 1,  
                        'name' => 'Prepaid',  
                        'slug' => 'prepaid',  
                        'operator_code' => 'AT', 
                        'co_com' => '2.8',  
                        'user_com' => '2.8',  
                    ], 
                    [
                        'status' => 1,
                        'name' => 'Postpaid',  
                        'slug' => 'postpaid',  
                        'operator_code' => 'ATP',
                        'co_com' => '2.8',  
                        'user_com' => '2.8',  
                    ],
                ]
            ],
            [   
                'status' => 1,  
                'name' => 'Teletalk',  
                'slug' => 'teletalk',  
                'prefix' => '015', 
                'min_number' => '11', 
                'max_number' => '11', 
                'services' => [
                    [
                        'status' => 1,  
                        'name' => 'Prepaid',  
                        'slug' => 'prepaid',  
                        'operator_code' => 'TT',
                        'co_com' => '2.8',  
                        'user_com' => '2.8',   
                    ], 
                    [
                        'status' => 1,
                        'name' => 'Postpaid',  
                        'slug' => 'postpaid',  
                        'operator_code' => 'TTP', 
                        'co_com' => '2.8',  
                        'user_com' => '2.8', 
                    ],
                ]
            ],
        ];
 
        foreach ($flexi_providers as $provider) {                 
            $provider_id = MtProvider::create([
                'status' => $provider['status'],  
                'name' => $provider['name'],  
                'slug' => $provider['slug'],        
                'prefix' => $provider['prefix'],   
                'min_number' => $provider['min_number'], 
                'max_number' => $provider['max_number'],  
                'user_id' =>  $user->id, 
            ]);

            $provider_id->categories()->attach( [ $flexi_cat->id, $flexi_banking_cat->id ] );    

            foreach ( $provider['services'] as $service ) {
                $service = MtService::create([
                    'status' => $service['status'],  
                    'provider_id' => $provider_id->id,  
                    'name' => $service['name'],  
                    'slug' => $service['slug'],    
                    'operator_code' => $service['operator_code'],      
                    'co_com' => $service['co_com'],      
                    'user_com' => $service['user_com'],      
                    'min_amount' => 1, 
                    'max_amount' => 1000, 
                    'user_id' =>  $user->id, 
                ]); 
            }  
        }
        
        /* Mobile Banking */ 
        $mb_banking_providers = [ 
            [   
                'status' => 1,  
                'name' => 'Bkash',  
                'slug' => 'bkash',  
                'prefix' => '', 
                'min_number' => '11', 
                'max_number' => '11', 
                'services' => [
                    [
                        'status' => 1,  
                        'name' => 'Cash In',  
                        'slug' => 'cash-in',  
                        'operator_code' => 'BKCI',  
                        'co_com' => '0.4',  
                        'user_com' => '0.3', 
                    ],  
                ]
            ],
            [   
                'status' => 1,  
                'name' => 'Rocket',  
                'slug' => 'rocket',  
                'prefix' => '', 
                'min_number' => '12', 
                'max_number' => '12', 
                'services' => [
                    [
                        'status' => 1,  
                        'name' => 'Cash In',  
                        'slug' => 'cash-in',  
                        'operator_code' => 'RKCI', 
                        'co_com' => '0.4',  
                        'user_com' => '0.3',  
                    ],  
                ]
            ], 
        ];
 
        foreach ($mb_banking_providers as $provider) {                 
            $provider_id = MtProvider::create([
                'status' => $provider['status'],  
                'name' => $provider['name'],  
                'slug' => $provider['slug'],        
                'prefix' => $provider['prefix'],   
                'min_number' => $provider['min_number'], 
                'max_number' => $provider['max_number'],  
                'user_id' =>  $user->id, 
            ]);   

            $provider_id->categories()->attach( [ $mb_banking_cat->id, $flexi_banking_cat->id ] );

            foreach ( $provider['services'] as $service ) {
                $service = MtService::create([
                    'status' => $service['status'],  
                    'provider_id' => $provider_id->id,  
                    'name' => $service['name'],  
                    'slug' => $service['slug'],    
                    'operator_code' => $service['operator_code'],  
                    'co_com' => $service['co_com'],      
                    'user_com' => $service['user_com'],    
                    'min_amount' => 10, 
                    'max_amount' => 20000, 
                    'user_id' =>  $user->id, 
                ]); 
            }  
        }

        /* Utility Bill */

        /* Electricity */
        $electricity_cat = MtTaxonomy::create([
           'name' => 'Electricity', 
           'slug' => 'electricity',
           'taxonomy' => 'provider-category',
           'parent_id' => null,  
        ]);   

        $gas_cat = MtTaxonomy::create([
           'name' => 'Gas', 
           'slug' => 'gas',
           'taxonomy' => 'provider-category',
           'parent_id' => null,  
        ]); 

        $water_cat = MtTaxonomy::create([
           'name' => 'Gas', 
           'slug' => 'gas',
           'taxonomy' => 'provider-category',
           'parent_id' => null,  
        ]);

        $utility_cat = MtTaxonomy::create([
           'name' => 'Utility', 
           'slug' => 'utility',
           'taxonomy' => 'provider-category',
           'parent_id' => null,  
        ]);

        $electricity_providers = [ 
            [   
                'status' => 1,  
                'name' => 'Palli Bidyut',  
                'slug' => 'palli-bidyut',  
                'prefix' => '', 
                'min_number' => '5', 
                'max_number' => '20', 
                'services' => [
                    [
                        'status' => 1,  
                        'name' => 'Postpaid',  
                        'slug' => 'postpaid', 
                        'operator_code' => 'REBP',  
                        'co_com' => '0',  
                        'user_com' => '0', 
                    ],  
                ]
            ], 
            [   
                'status' => 1,  
                'name' => 'BPDB',  
                'slug' => 'bpdb',  
                'prefix' => '', 
                'min_number' => '5', 
                'max_number' => '20', 
                'services' => [
                    [
                        'status' => 1,  
                        'name' => 'Postpaid',  
                        'slug' => 'postpaid', 
                        'operator_code' => 'BPDBP',  
                        'co_com' => '0',  
                        'user_com' => '0', 
                    ],  
                    [
                        'status' => 1,  
                        'name' => 'Prepaid',  
                        'slug' => 'prepaid', 
                        'operator_code' => 'BPDB',  
                        'co_com' => '0',  
                        'user_com' => '0', 
                    ],
                ]
            ],
        ];
        
        foreach ($electricity_providers as $provider) {                 
            $provider_id = MtProvider::create([
                'status' => $provider['status'],  
                'name' => $provider['name'],  
                'slug' => $provider['slug'],        
                'prefix' => $provider['prefix'],   
                'min_number' => $provider['min_number'], 
                'max_number' => $provider['max_number'],  
                'user_id' =>  $user->id, 
            ]);   

            $provider_id->categories()->attach( [ $electricity_cat->id, $utility_cat->id ] );

            foreach ( $provider['services'] as $service ) {
                $service = MtService::create([
                    'status' => $service['status'],  
                    'provider_id' => $provider_id->id,  
                    'name' => $service['name'],  
                    'slug' => $service['slug'],    
                    'operator_code' => $service['operator_code'],  
                    'co_com' => $service['co_com'],      
                    'user_com' => $service['user_com'],    
                    'min_amount' => 10, 
                    'max_amount' => 20000, 
                    'user_id' =>  $user->id, 
                ]); 
            }  
        }

        /* Gas */ 
        $gas_providers = [ 
            [   
                'status' => 1,  
                'name' => 'TITAS',  
                'slug' => 'titas',  
                'prefix' => '', 
                'min_number' => '5', 
                'max_number' => '20', 
                'services' => [
                    [
                        'status' => 1,  
                        'name' => 'Postpaid',  
                        'slug' => 'postpaid', 
                        'operator_code' => 'TITASP',  
                        'co_com' => '0',  
                        'user_com' => '0', 
                    ],  
                ]
            ], 
            [   
                'status' => 1,  
                'name' => 'Bakhrabad Gas',  
                'slug' => 'bakhrabad-gas', 
                'prefix' => '', 
                'min_number' => '5', 
                'max_number' => '20', 
                'services' => [
                    [
                        'status' => 1,  
                        'name' => 'Postpaid',  
                        'slug' => 'postpaid', 
                        'operator_code' => 'BGSLP',  
                        'co_com' => '0',  
                        'user_com' => '0', 
                    ],  
                    [
                        'status' => 1,  
                        'name' => 'Prepaid',  
                        'slug' => 'prepaid', 
                        'operator_code' => 'BGSL',  
                        'co_com' => '0',  
                        'user_com' => '0', 
                    ],
                ]
            ],
        ];
        
        foreach ($gas_providers as $provider) {                 
            $provider_id = MtProvider::create([
                'status' => $provider['status'],  
                'name' => $provider['name'],  
                'slug' => $provider['slug'],        
                'prefix' => $provider['prefix'],   
                'min_number' => $provider['min_number'], 
                'max_number' => $provider['max_number'],  
                'user_id' =>  $user->id, 
            ]);   

            $provider_id->categories()->attach( [ $gas_cat->id, $utility_cat->id ] );

            foreach ( $provider['services'] as $service ) {
                $service = MtService::create([
                    'status' => $service['status'],  
                    'provider_id' => $provider_id->id,  
                    'name' => $service['name'],  
                    'slug' => $service['slug'],    
                    'operator_code' => $service['operator_code'],  
                    'co_com' => $service['co_com'],      
                    'user_com' => $service['user_com'],    
                    'min_amount' => 10, 
                    'max_amount' => 20000, 
                    'user_id' =>  $user->id, 
                ]); 
            }  
        }

        /* Water */ 
        $water_providers = [ 
            [   
                'status' => 1,  
                'name' => 'DWASA',  
                'slug' => 'dwasa',  
                'prefix' => '', 
                'min_number' => '5', 
                'max_number' => '20', 
                'services' => [
                    [
                        'status' => 1,  
                        'name' => 'Postpaid',  
                        'slug' => 'postpaid', 
                        'operator_code' => 'DWASAP',  
                        'co_com' => '0',  
                        'user_com' => '0', 
                    ],  
                ]
            ], 
            [   
                'status' => 1,  
                'name' => 'CWASA',  
                'slug' => 'cwasa',  
                'prefix' => '', 
                'min_number' => '5', 
                'max_number' => '20', 
                'services' => [
                    [
                        'status' => 1,  
                        'name' => 'Postpaid',  
                        'slug' => 'postpaid', 
                        'operator_code' => 'CWASAP',  
                        'co_com' => '0',  
                        'user_com' => '0', 
                    ],  
                ]
            ], 
        ];
        
        foreach ($water_providers as $provider) {                 
            $provider_id = MtProvider::create([
                'status' => $provider['status'],  
                'name' => $provider['name'],  
                'slug' => $provider['slug'],        
                'prefix' => $provider['prefix'],   
                'min_number' => $provider['min_number'], 
                'max_number' => $provider['max_number'],  
                'user_id' =>  $user->id, 
            ]);   

            $provider_id->categories()->attach( [ $water_cat->id, $utility_cat->id ] );

            foreach ( $provider['services'] as $service ) {
                $service = MtService::create([
                    'status' => $service['status'],  
                    'provider_id' => $provider_id->id,  
                    'name' => $service['name'],  
                    'slug' => $service['slug'],    
                    'operator_code' => $service['operator_code'],  
                    'co_com' => $service['co_com'],      
                    'user_com' => $service['user_com'],    
                    'min_amount' => 10, 
                    'max_amount' => 20000, 
                    'user_id' =>  $user->id, 
                ]); 
            }  
        }

        /* Default Contact Category */
        CtTaxonomy::create([
           'name' => 'Mobile Recharge', 
           'slug' => 'mobile-recharge',
           'taxonomy' => 'contact-category',
           'parent_id' => null,
           'user_id' => 0,  
        ]); 
        
        CtTaxonomy::create([
           'name' => 'Mobile Banking', 
           'slug' => 'mobile-banking',
           'taxonomy' => 'contact-category',
           'parent_id' => null,
           'user_id' => 0,  
        ]); 

        CtTaxonomy::create([
           'name' => 'Electricity', 
           'slug' => 'electricity',
           'taxonomy' => 'contact-category',
           'parent_id' => null,
           'user_id' => 0,  
        ]); 

        CtTaxonomy::create([
           'name' => 'Gas', 
           'slug' => 'gas',
           'taxonomy' => 'contact-category',
           'parent_id' => null,
           'user_id' => 0,  
        ]);

        CtTaxonomy::create([
           'name' => 'Water', 
           'slug' => 'water',
           'taxonomy' => 'contact-category',
           'parent_id' => null,
           'user_id' => 0,  
        ]);

    } // end public run
} // end class
