let mix = require('laravel-mix');


/* Alias: Custom Added */
let src_path = 'resources/assets/js/admin/';
mix.webpackConfig({
  resolve: {
    alias: {
    	//'@src': path.resolve(__dirname, src_path),
    	'@components': path.resolve(__dirname, src_path + 'components/'),
    	'@views': path.resolve(__dirname, src_path + 'views/'),
    	'@admin': path.resolve( __dirname, src_path ),
    }
  }
});
/* Alias End: Custom Added */

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/assets/js/admin/app.js', 'public/js')
   .sass('resources/assets/sass/app.scss', 'public/css');

mix.browserSync('http://localhost:8080');
