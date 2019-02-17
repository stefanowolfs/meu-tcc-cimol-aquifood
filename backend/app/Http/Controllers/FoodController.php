<?php

namespace App\Http\Controllers;

use App\Food;
use App\Restaurant;


use Illuminate\Http\Request;
use App\Http\Requests;

use App\Http\Resources\Food as FoodResource;

use Illuminate\Support\Facades\Input;
//inserções ao banco com queryes
use Illuminate\Support\Facades\DB;


class FoodController extends Controller
{

   public function index()
   {
      $foods = Food::all();

      return FoodResource::collection($foods);
   }

   public function near()
   {
      $limit = 0.03;
        //$limit = 0.05;

      $foods = DB::table('foods_restaurants AS fr')
         ->join('foods', 'fr.food_id', 'foods.id')
         ->join('restaurants AS r', 'r.id', 'fr.restaurant_id')
         ->select('foods.*')
         ->where('r.latitude', '>', (((float)Input::get('latitude')) - $limit))
         ->where('r.latitude', '<', (((float)Input::get('latitude')) + $limit))
         ->where('r.longitude', '>', (((float)Input::get('longitude')) - $limit))
         ->where('r.longitude', '<', (((float)Input::get('longitude')) + $limit))
         ->distinct()->orderByRaw('foods.nome')->get();
        
        //return $foods;
      return FoodResource::collection($foods);
   }



   public function getRestaurantFoods($restaurant_id)
   {
      $foods = Restaurant::find($restaurant_id)->foods;

      return FoodResource::collection($foods);
   }



   public function store(Request $request)
   {
        //se existir id retorna existente senão cria novo
      $food = $request->isMethod('put') ? Food::findOrFail($request->food_id) : new Food;

        //seta os atributos de Food
      $food->id = $request->input('food_id');
      $food->nome = $request->input('nome');

        //se for salvo com sucesso retorna o recurso
      if ($food->save()) {
         return new FoodResource($food);
      }
   }



   public function show($id)
   {
        //pega um unico registro da model
      $food = Food::findOrFail($id);

        // Retorna o registro como um recurso
      return new FoodResource($food);
   }

   public function destroy($id)
   {
        //pega um unico registro da model
      $food = Food::findOrFail($id);

        //se for deletado com sucesso retorna o recurso
      if ($food->delete()) {
         return new FoodResource($food);
      }
   }
}
