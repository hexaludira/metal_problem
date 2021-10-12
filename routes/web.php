<?php

use Illuminate\Support\Facades\Route;

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

Route::resource('blog',BlogController::class);

Route::get('halo', function(){
	return "Ini view baru";
});

Route::get('report', 'ReportController@index');

Route::get('/{any}', function(){
	return view('metal.metal');
})->where('any','.*');
// Route::get('/', function () {
//     return view('welcome');
// });
