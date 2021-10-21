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
        <div class="card">
            <div class="card-header">{{ __('Two Factor Authentication') }}</div>

                <form method="POST" action="{{ route('2faVerify') }}" >
                    @csrf
                    <div class="form-group">
                        <div class="outline-group">
                            <input id="one_time_password" type="text" placeholder="one_time_password" class="form-field outline{{ $errors->has('one_time_password') ? ' is-invalid' : '' }}" name="one_time_password" value="{{ old('one_time_password') }}" required autofocus>
                            <label for="one_time_password" class="col-sm-4 col-form-label text-md-right">{{ __('Enter OTP') }}</label>

                            @if ($errors->has('one_time_password'))
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $errors->first('one_time_password') }}</strong>
                                </span>
                            @endif
                        </div>

                        <div class="outline-group">
                            <div class="checkbox">
                                <br />
                                <small>If you save this browser, you won't have to enter a code when you log in from this browser again.</small>
                                <br />
                                <label>
                                    <input type="radio" name="save_device" id="save_device" value="1" checked /> {{ __('Save Browser') }}
                                </label>
                                
                                <label>
                                    <input type="radio" name="save_device" id="save_device" value="0" /> {{ __('Don\'t Save') }}
                                </label> 
                                <br /><br />
                            </div> 
                        </div>

                        <button type="submit" class="btn btn-primary">
                                {{ __('Verify OTP') }}
                        </button>
                    </div><!-- /.form-group -->
                </form>
                <div class="card-footer">
                    <a class="btn btn-link" href="#">
                        {{ __('If lost OTP contact us') }}
                    </a> 
                </div><!--  /.card-footer -->
        </div><!--  /.card -->
    </div><!--  /.main-content -->
    <noscript>It may sound funny, but this soft requires JavaScript to run. Please enable it.</noscript>
</body>
</html>

