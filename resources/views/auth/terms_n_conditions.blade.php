<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1"> 

    <title>Money Transfer | Oxyzone</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600" rel="stylesheet">   
    <!-- Styles -->
    <link href="{{ asset('css/auth.css') }}" rel="stylesheet">

</head>
<body>
    <div class="main-content">
        <div class="card">
            <div class="card-header">{{ __('Terms and conditions') }}</div>

                <div class="form-group">
                    <div class="outline-group">
                        <p>Terms and conditions of this service</p>
                    </div> 
 
                </div><!-- /.form-group -->
                <div class="card-footer">
                    <a class="btn btn-link" href="{{ route('register') }}">
                        {{ __('Go to Register') }}
                    </a>

                    <a class="btn btn-link pull-right" href="{{ route('privacy_policy') }}">
                        {{ __('Privacy and Policy') }}
                    </a> 
                     
                </div><!--  /.card-footer -->
        </div><!--  /.card -->
    </div><!--  /.main-content -->
    <noscript>It may sound funny, but this soft requires JavaScript to run. Please enable it.</noscript>
    <script>
        function showPass() {
          var password = document.getElementById("password");
          if (password.type === "password") {
            password.type = "text";
          } else {
            password.type = "password";
          }

          var show_pass = document.getElementById("show_pass");
          if (show_pass.innerHTML == "Show") {
            show_pass.innerHTML = "Hide";
          } else {
            show_pass.innerHTML = "Show";
          }
          
        }
    </script>
</body>
</html>

