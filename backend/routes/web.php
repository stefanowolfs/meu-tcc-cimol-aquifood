<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


// rotina de limpar o cache
Route::get('/clear-cache', function() {
   $exitCode = Artisan::call('config:clear');
   $exitCode = Artisan::call('cache:clear');
   $exitCode = Artisan::call('config:cache');
   return 'DONE'; //Return anything
});