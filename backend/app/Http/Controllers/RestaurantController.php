<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use App\Http\Requests;

use App\Restaurant;
use App\Food;
use App\User;
use App\Order;

use App\Http\Resources\Restaurant as RestaurantResource;
use App\Http\Resources\Food as FoodResource;
use App\Http\Resources\Order as OrderResource;

class RestaurantController extends Controller
{


   public function removeRestaurantOrder($id, $order_id)
   {
      $restaurant = Restaurant::findOrFail($id);

      if ($restaurant->orders()->detach($order_id)) {
         $order = Order::findOrFail($order_id);
         $order->status = "pendente";
         $order->save();

         $orders = $restaurant->orders;
         return OrderResource::collection($orders);
      }
   }


   public function removeRestaurantFood($id, $food_id)
   {
      $restaurant = Restaurant::findOrFail($id);

      if ($restaurant->foods()->detach($food_id)) {
         $foods = $restaurant->foods;
         return OrderResource::collection($foods);
      }
   }


   public function index()
   {
      $restaurants = Restaurant::all();

      return RestaurantResource::collection($restaurants);
   }


   public function store(Request $request)
   {
      $restaurant = $request->isMethod('put') ? Restaurant::findOrFail($request->restaurant_id) : new Restaurant;

      $restaurant->id = $request->input('restaurant_id');
      $restaurant->name = $request->input('name');
      $restaurant->email = $request->input('email');
      $restaurant->longitude = $request->input('longitude');
      $restaurant->latitude = $request->input('latitude');
      $restaurant->user_id = $request->input('user_id');

      if ($restaurant->save()) {
         return new RestaurantResource($restaurant);
      }
   }


   public function storeFood(Request $request)
   {
      $food = $request->isMethod('put') ? Food::findOrFail($request->input('id')) : new Food;
      if (Input::has('nome'))
         $food->nome = $request->input('nome');
      if ($food->save()) {

         if ($request->isMethod('put')) {
            $restaurant = Restaurant::find($request->input('restaurant_id'));

            $food = $restaurant->foods->find($request->input('id'));
            $food->pivot->price = $request->input('price');
            $food->pivot->save();

         } else {
            $food->restaurants()->attach(['restaurant_id' => $request->input('restaurant_id')], ['price' => $request->input('price')]);

            $newFood = Restaurant::find($request->input('restaurant_id'))
               ->foods->find($food->id);

            $food = $newFood;
         }
         return new FoodResource($food);
      }
   }

   public function storeOrder(Request $request)
   {
      $order = Order::findOrFail($request->input('order_id'));
      $order->restaurants()->attach($request->input('id'));
      $order->status = "em andamento";
      $order->save();
      $orders = Restaurant::find($request->input('id'))->orders()->get();

      return OrderResource::collection($orders);
   }


   public function show($id)
   {
      $restaurant = Restaurant::findOrFail($id);

      return new RestaurantResource($restaurant);
   }


   public function getUserRestaurant($user_id)
   {
      $restaurant = User::find($user_id)->restaurant;
      return new RestaurantResource($restaurant);
   }


   public function destroy($id)
   {
        //pega um unico registro da model
      $restaurant = Restaurant::findOrFail($id);

        //se for deletado com sucesso retorna o recurso
      if ($restaurant->delete()) {
         return new RestaurantResource($restaurant);
      }
   }

}
