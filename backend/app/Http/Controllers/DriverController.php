<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Driver;
use App\Order;
use App\User;
use App\Http\Resources\Driver as DriverResource;
use App\Http\Resources\User as UserResource;
use App\Http\Resources\Order as OrderResource;

class DriverController extends Controller
{

   public function storeOrder(Request $request)
   {
      $order = Order::findOrFail($request->input('order_id'));
      $order->drivers()->attach($request->input('id'));
      $order->status = "entregando";
      $order->save();
      $orders = Driver::find($request->input('id'))->orders()->first();

      return new OrderResource($orders);
   }

   public function getOrder($id)
   {
      $order = Driver::find($id)->orders->first();

      return new OrderResource($order);
   }



   /**
    * Display a listing of the resource.
    *
    * @return \Illuminate\Http\Response
    */
   public function index()
   {
      $drivers = Driver::all();

      return DriverResource::collection($drivers);
   }

   public function addUser(Request $request)
   {
      $driver = Driver::findOrFail($request->id);

      $user_id = $request->input('user_id');

      if ($driver->user()->associate($user_id)->save()) {
         return new DriverResource($driver);
      }
   }

   public function store(Request $request)
   {
        //se existir id_driver retorna existente senão cria novo
      $driver = $request->isMethod('put') ? Driver::findOrFail($request->id) : new Driver;

        //seta os atributos do Driver
      $driver->id = $request->input('id');
      $driver->nome = $request->input('nome');
      $driver->veiculo = $request->input('veiculo');
      $driver->cpf = $request->input('cpf');
      $driver->longitude = $request->input('longitude');
      $driver->latitude = $request->input('latitude');
      $driver->restaurant_id = $request->input('restaurant_id');
      $driver->user_id = $request->input('user_id');

      //liga motorista a usuario
     //$driver->user()->associate($request->input('user_id'))->save();

        //se for salvo com sucesso retorna o recurso
      if ($driver->save()) {
         return new DriverResource($driver);
      }
   }

   public function getRestaurantDrivers($restaurant_id)
   {
      $drivers = Driver::where('restaurant_id', $restaurant_id)->get();

      return DriverResource::collection($drivers);
   }

   /**
    * Display the specified resource.
    *
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */
   public function show($id)
   {
        //pega um unico registro da model
      $driver = Driver::findOrFail($id);

        // Retorna o registro como um recurso
      return new DriverResource($driver);
   }


   /**
    * Retorna motorista da ordem
    *
    * @param  int  $order_id
    * @return \Illuminate\Http\Response
    */
   public function showOrderDriver($order_id)
   {
      $driver = Order::find($order_id)->drivers()->get();

        // Retorna o registro como um recurso
      return new DriverResource($driver);
   }

   public function showUserDriver($user_id)
   {
      $driver = User::find($user_id)->driver()->first();

      return new DriverResource($driver);
   }

   /**
    * Remove the specified resource from storage.
    *
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */
   public function destroy($id)
   {
        //pega um unico registro da model
      $driver = Driver::findOrFail($id);

        //se for deletado com sucesso retorna o recurso
      if ($driver->delete()) {
         return new DriverResource($driver);
      }
   }
}
