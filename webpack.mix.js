const mix = require('laravel-mix');

mix.js('resources/js/app.js', 'public/assets/js')
   .sass('resources/sass/app.scss', 'public/assets/css')
   .sass('node_modules/bootstrap/scss/bootstrap.scss', 'public/assets/css');
