<?php

use Illuminate\Http\Request;


//################################### ROTAS JWT
Route::post('register', 'UserController@register');

Route::post('login', 'UserController@authenticate');

Route::get('open', 'DataController@open');

Route::group(['middleware' => ['jwt.verify']], function () {

   Route::get('user', 'UserController@getAuthenticatedUser');
   Route::get('closed', 'DataController@closed');



});


//################################### ROTAS PADRÃO
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

/*

retornando usuario (metodo laravel)

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
 */


// Listar os Users
Route::get('users', 'UserController@index');

// Lista um unico User
Route::get('user/{id}', 'UserController@show');

// Cria um novo User
Route::post('user', 'UserController@store');

// Altera um User existente
Route::put('user', 'UserController@store');

// Deleta um User
Route::delete('user/{id}', 'UserController@destroy');



/***
 * Consumidor User
 */

// Order ->
// Listar as Orders
Route::get('orders', 'OrderController@index');
// Listar as Orders Próximas
Route::get('orders/near', 'OrderController@near');
// Lista uma unica Order
Route::get('order/{id}', 'OrderController@show');
// Mostra Order pertencente a um User que seja pendente
Route::get('order/user/{user_id}', 'OrderController@showUserOrder');
// Cria uma nova Order
Route::post('order', 'OrderController@store');
// Altera uma Order existente
Route::put('order', 'OrderController@store');
// Deleta uma Order
Route::delete('order/{id}', 'OrderController@destroy');

// Pessoa faz pedido

// Adiciona comidas

// E confirma pedido (alter pedido state para ready)

// A ver entregador confirma entrega ( avalia? )


/***
 * Lancheria User
 */

// Food -> listar, criar, excluir, editar
// Listar as Foods
Route::get('foods', 'FoodController@index');
// Listar as Foods Próximas
Route::get('foods/near', 'FoodController@near');
// Lista uma unica Food
Route::get('food/{id}', 'FoodController@show');
// Cria uma nova Food
Route::post('food', 'FoodController@store');
// Altera uma Food existente
Route::put('food', 'FoodController@store');
// Deleta uma Food
Route::delete('food/{id}', 'FoodController@destroy');

// Lista comidas de um restaurante
Route::get('restaurant/foods/{id}', 'FoodController@getRestaurantFoods');

// Lista motoristas de um restaurante
Route::get('restaurant/drivers/{id}', 'DriverController@getRestaurantDrivers');

// Lista pedidos de um restaurante
Route::get('restaurant/orders/{id}', 'OrderController@getRestaurantOrders');

// Remove ordem de um restaurante e retorna lista atual de pedidos
Route::delete('restaurant/{id}/order/{order_id}', 'RestaurantController@removeRestaurantOrder');

// Remove comida de um restaurante e retorna lista atual de comidas
Route::delete('restaurant/{id}/food/{food_id}', 'RestaurantController@removeRestaurantFood');




// Restaurant -> listar, criar, excluir, editar
// Listar os Restaurants
Route::get('restaurants', 'RestaurantController@index');
// Lista um unico Restaurant
Route::get('restaurant/{id}', 'RestaurantController@show');
// Cria um novo Restaurant
Route::post('restaurant', 'RestaurantController@store');
// Altera um Restaurant existente
Route::put('restaurant', 'RestaurantController@store');
// Deleta um Restaurant
Route::delete('restaurant/{id}', 'RestaurantController@destroy');

// Cadastra uma comida do Restaurante
Route::post('restaurant/food', 'RestaurantController@storeFood');

// Atualiza uma comida do Restaurante
Route::put('restaurant/food', 'RestaurantController@storeFood');

// Adiciona um pedido ao Restaurante
Route::put('restaurant/order', 'RestaurantController@storeOrder');

// Adiciona um pedido ao Motorista
Route::put('driver/order', 'DriverController@storeOrder');

// Retorna restaurante de um usuario
Route::get('user/restaurant/{user_id}', 'RestaurantController@getUserRestaurant');

// Listar os Drivers
Route::get('drivers', 'DriverController@index');

// Lista um unico Driver
Route::get('driver/{id}', 'DriverController@show');

// Mostra Motorista que está atendendo Order
Route::get('driver/order/{order_id}', 'DriverController@showOrderDriver');

// Mostra Motorista com user_id
Route::get('user/{user_id}/driver', 'DriverController@showUserDriver');

// Mostra Motorista com user_id
Route::get('driver/{id}/order', 'DriverController@getOrder');

// Cria um novo Driver
Route::post('driver', 'DriverController@store');

// Altera um Driver existente
Route::put('driver', 'DriverController@store');

// Adiciona um Usuario ao Driver existente
Route::put('driver/user', 'DriverController@addUser');

// Deleta um Driver
Route::delete('driver/{id}', 'DriverController@destroy');