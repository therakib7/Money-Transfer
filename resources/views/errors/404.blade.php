

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">  

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
        .main-container .col-12 {
            text-align: center;
            color: #fff;
        }
        .main-container .col-12 h2 {
            font-weight: 600;
            font-size: 75px;
            margin-bottom: 42px;
            line-height: 0;
        }
        .main-container .col-12 p {
            font-size: 20px;
        }
        .main-container .content-center .button {
            font-weight: 600;
            color: #ffffff;
            padding: 10px 45px;
            border-radius: 5px;
            text-transform: capitalize;
            margin: auto;
            display: table;
            -webkit-transition: all 0.15s ease-in-out;
            transition: all 0.15s ease-in-out;
            background: #291a7b61;
            text-decoration: none;
        }
        .main-container .content-center .button:hover {
            background: #291a7ba1;
        }
        @media only screen and (max-width: 320px) {
        	.main-container .col-12 h2 {
        	    font-size: 45px;
        	}
        	.main-container .col-12 p {
        	    font-size: 15px;
        	}
        } 
    </style>
    
</head>
<body>
    <div id="app" class="main-container"> 
        <div class="row">
            <div class="col-12">
                <div class="content-center">
                    <h2>{{ $exception->getMessage() }}</h2>
                    <h2>404</h2>
                    <p>Sorry! The page you are looking for is not found.</p> 
                    <a href="/admin/home" class="button">Go to Home</a>
                </div><!--  /.content-center -->
            </div>
        </div>
    </div><!--  /.main-container --> 
</body>
</html> 
