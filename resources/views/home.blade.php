<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}"> 
    
    @if ( auth()->user() ) 
        <meta name="permission" content="{{ auth()->user()->permissions() }}">  
        <meta name="auth_id" content="{{ auth()->id() }}"> 

        <meta name="name" content="{{ $auth_name }}"> 
        <meta name="image" content="{{ $auth_image }}"> 
        <meta name="role" content="{{ $auth_role }}"> 
        <meta name="since" content="{{ $auth_since }}"> 
        <meta name="balance" content="{{ $auth_balance }}"> 
    @endif

    <title>Money Transfer | Oxyzone</title>

    <link rel="shortcut icon" type="image/png" href="/images/favicon.png"/>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600" rel="stylesheet">  

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">

    <style>
        .main-container {  background: rgb(30, 40, 44); }
        .pre-main { background: #ecf0f5; height: 100vh; position: relative; }
        .pre-sidebar-left { width: 250px; background: rgb(30, 40, 44); height: 100vh; z-index: 9; position: absolute; }
        .pre-header { background: #fff; position: absolute; top: 0; width: 100%; z-index: 8; height: 50px; box-shadow: rgba(0, 0, 0, 0.1) 1px 1px 3px; }
        .pre-loading { position: absolute; top: 50px; left: 260px; }
        
        @media (max-width: 800px) {
            .pre-sidebar-left {display: none; } .pre-loading { left: 20px; } 
        }  
    </style>
    
</head>
<body>
    <div id="app" class="main-container">  
        <div class="pre-main" v-if="!$data">
            <div class="pre-sidebar-left"> 
            </div><!--  /.pre-sidebar-left -->
            <div class="pre-main-content"> 
                <div class="pre-header"> 
                </div><!--  /.pre-header --> 
                <div class="pre-loading">
                    Loading...
                </div><!--  /.pre-loading --> 
            </div><!--  /.pre-main-content -->
        </div><!-- /.pre-main -->  
        <app></app> 
    </div><!--  /.main-container --> 

    <noscript>It may sound funny, but this soft requires JavaScript to run. Please enable it.</noscript>

    <script src="{{ asset('js/app.js') }}"></script> 
</body>
</html>
