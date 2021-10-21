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
            <div class="card-header">{{ __('Login To Your Account') }}</div>

                <form method="POST" action="{{ route('login') }}" aria-label="{{ __('Login') }}">
                    @csrf
                    <div class="form-group">
                        <div class="outline-group">
                            <input id="email" type="text" placeholder="email" class="form-field outline{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ old('email') }}" required autofocus>
                            <label for="email" class="col-sm-4 col-form-label text-md-right">{{ __('Mobile Or Email') }}</label>

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

                                <div class="input-group-append">
                                    <span onclick="showPass()" id="show_pass">Show</span>
                                </div><!-- /.input-group-append -->
                            </div><!-- /.input-group -->

                            @if ($errors->has('password'))
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $errors->first('password') }}</strong>
                                </span>
                            @endif
                        </div>
 
                        <div class="checkbox">
                            <label>
                                <input type="checkbox" name="remember" {{ old('remember') ? 'checked' : '' }}> {{ __('Remember Me') }}
                            </label>
                        </div>

                        <button type="submit" class="btn btn-primary">
                                {{ __('Login') }}
                        </button>
                    </div><!-- /.form-group -->
                </form>
                <div class="card-footer">
                    <a class="btn btn-link" href="{{ route('register') }}">
                        {{ __('Create New Account') }}
                    </a>
                    
                    <a class="btn btn-link pull-right" href="{{ route('password.request') }}">
                        {{ __('Forgot Your Password?') }}
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

