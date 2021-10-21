<?php

function make_slug($string) {
    return strtolower( preg_replace('/\s+/u', '-', trim($string)) );
}

function auth_can( $string, $match_all = true ) {
    return \App\Models\User::permissions( $string, $match_all );
}

function auth_role( $roles = null, $match_all = true ) {
    return \App\Models\User::auth_role( $roles, $match_all );
}

function role_by_user_id( $id, $roles = null, $match_all = true ) {
    return \App\Models\User::role_by_user_id( $id, $roles, $match_all );
}

if( ! function_exists('unique_random') ){
    /**
     *
     * Generate a unique random string of characters
     * uses str_random() helper for generating the random string
     *
     * @param     $table - name of the table
     * @param     $col - name of the column that needs to be tested
     * @param int $chars - length of the random string
     *
     * @return string
     */
    function unique_random($table, $col, $chars = 16){

        $unique = false;

        // Store tested results in array to not test them again
        $tested = [];

        do {

            // Generate random string of characters
            $random = str_random($chars);

            // Check if it's already testing
            // If so, don't query the database again
            if( in_array($random, $tested) ){
                continue;
            }

            // Check if it is unique in the database
            $count = DB::table($table)->where($col, '=', $random)->count();

            // Store the random character in the tested array
            // To keep track which ones are already tested
            $tested[] = $random;

            // String appears to be unique
            if( $count == 0){
                // Set unique to true to break the loop
                $unique = true;
            }

            // If unique is still false at this point
            // it will just repeat all the steps until
            // it has generated a random string of characters

        }
        while(!$unique);


        return $random;
    }

}