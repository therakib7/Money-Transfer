<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1"> 

    <title>Money Transfer | {{ config('app.name') }}</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600" rel="stylesheet">   

    <style>
        body {
            background: #6A62D2;
            font-family: 'Source Sans Pro';
        }
        .main-container .content-center {
             position: absolute;
             top: 30%;
             left: 50%;
             transform: translate(-50%,-50%);
        }
         @media only screen and (min-width: 768px) {
            .main-container .content-center { 
                width: 700px;
            }
         }
         @media only screen and (max-width: 767px) {
            .main-container .content-center { 
                width: 300px;
            }
         }
         @media only screen and (max-width: 300px) {
            .main-container .content-center { 
                width: 230px;
            }
         }
        .main-container .col-12 {
            text-align: center;
            color: #fff;
        }
        .main-container .col-12 ul {
            padding: 0;
        }
        .main-container .col-12 h1 {
            font-weight: 600;
        }
        @media only screen and (max-width: 375px) {
            .main-container .col-12 h1 {
                font-size: 20px;
            }
        }
        .main-container .col-12 ul li {
            list-style: none;
            font-size: 20px;
            line-height: 30px;
            display: inline;
            padding: 15px;
            position: relative;
        }
        .main-container .col-12 ul li:after {
            content: "";
            background: #ddd;
            width: 2px;
            height: 16px;
            position: absolute;
            left: -2px;
            top: 22px;
        }
        .main-container .col-12 ul li:first-child:after {
            content: "";
            width: 0px;
            height: 0;
        }
        .main-container .col-12 ul li a {
            text-decoration: none;
            color: #fff;
        }
        @media only screen and (max-width: 320px) {
            .main-container .content-center{
                top: 40%;
            }
            .main-container .col-12 ul li {
                font-size: 16px; 
            }
            .main-container .col-12 ul li:after {
                height: 14px;
                left: -2px;
                top: 20px;
            }
        }
    </style>

    <?php
        //header("Location: https:/mt.oxyzone.net/admin/home");
        //die();
    ?>
    
</head>
<body>
    <div id="app" class="main-container"> 
        <div class="row">
            <div class="col-12">
                <div class="content-center">
                    <h1>Welcome to Oxyzone Money Transfer</h1>
                    <ul class="list-inline"> 
                        @guest
                            <li>
                                <a href="{{ route('login') }}">{{ __('Login') }}</a>
                            </li>
                            <li>
                                <a href="{{ route('register') }}">{{ __('Register') }}</a>
                            </li>
                        @else
                            <li>
                                <a href="/admin/home">Go to Home</a>
                            </li>
                            <li>
                                <a href="{{ route('logout') }}"
                                   onclick="event.preventDefault();
                                                 document.getElementById('logout-form').submit();">
                                    {{ __('Logout') }}
                                </a>

                                <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                    @csrf
                                </form>
                            </li> 
                        @endguest
                    </ul>
                </div><!--  /.content-center -->
            </div>
        </div>
    </div><!--  /.main-container --> 
    <noscript>It may sound funny, but this soft requires JavaScript to run. Please enable it.</noscript>

     
</body>
</html> 
