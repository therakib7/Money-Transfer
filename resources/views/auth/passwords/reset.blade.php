<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">  

    <title>Money Transfer | Oxyzone</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600" rel="stylesheet">      
    <!-- Styles -->
    <link href="{{ asset('css/auth.css') }}" rel="stylesheet"> 
 
</head>
<body>
    <div class="main-content">
        <div class="card card-reg">
            <div class="card-header">{{ __('Reset Password') }}
            </div>
            <form method="POST" action="{{ route('password.request') }}" aria-label="{{ __('Reset Password') }}">
                @csrf 

                <input type="hidden" name="token" value="{{ $token }}">

                <div class="form-group">  

                    <div class="outline-group">
                        <input id="email" type="text"  placeholder="email" class="form-field outline{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ $email ?? old('email') }}" required>
                        <label for="email" class="col-md-4 col-form-label text-md-right">{{ __('Email') }}</label>

                        @if ($errors->has('email'))
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $errors->first('email') }}</strong>
                            </span>
                        @endif
                    </div>  

                    <div class="outline-group">

                        <div class="input-group">
                            
                            <input id="password" type="password" placeholder="password" class="form-field outline{{ $errors->has('password') ? ' is-invalid' : '' }}" name="password" required>
                            <label for="password" class="col-md-4 col-form-label text-md-right">{{ __('Password') }}</label>
                            <small>Password must contain at least one number, latters and minimum 8 character</small><br />

                            <div class="input-group-append">
                                <span onclick="showPass()" id="show_pass">Show</span>
                            </div><!-- /.input-group-append -->
                        </div><!-- /.input-group -->

                        @if ($errors->has('password'))
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $errors->first('password') }}</strong>
                            </span>
                        @endif

                        <div class="outline-group-inside">
                            <div class="input-group">
                                <input id="password-confirm" placeholder="password-confirm" type="password" class="form-field outline" name="password_confirmation" required>
                                <label for="password-confirm" class="col-md-4 col-form-label text-md-right">{{ __('Confirm Password') }}</label>

                                <div class="input-group-append">
                                    <span onclick="confirmShowPass()" id="confirm_show_pass">Show</span>
                                </div><!-- /.input-group-append -->
                            </div><!-- /.input-group -->
                            
                        </div>
                    </div> 

                </div>  

                <div class="form-group ">
                    @if ($errors->any())
                        <div class="alert alert-danger">
                            <ul>
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif
                </div>  

                <div class="form-group">
                    <div class="col-md-6 offset-md-4">
                        <button type="submit" class="btn btn-primary">
                            {{ __('Reset Password') }}
                        </button>
                    </div>
                </div>
            </form>
            <div class="card-footer">
                <a class="btn btn-link" href="{{ route('login') }}">
                    {{ __('Already Have Password?') }}
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

        function confirmShowPass() {
          var password = document.getElementById("password-confirm");
          if (password.type === "password") {
            password.type = "text";
          } else {
            password.type = "password";
          }

          var show_pass = document.getElementById("confirm_show_pass");
          if (show_pass.innerHTML == "Show") {
            show_pass.innerHTML = "Hide";
          } else {
            show_pass.innerHTML = "Show";
          }
          
        }
    </script>
    
</body>
</html> 
