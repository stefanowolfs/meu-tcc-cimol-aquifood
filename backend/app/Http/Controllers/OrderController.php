<?php

namespace App\Http\Controllers;

use App\Order;
use App\Restaurant;

use Illuminate\Http\Request;
use App\Http\Requests;

use App\Http\Resources\Order as OrderResource;

use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{

   public function near()
   {
      $limit = 10.03;
        //$limit = 0.05;

      $orders = Order::with(['user', 'foods'])->where('latitude', '>', (((float)Input::get('latitude')) - $limit))
         ->where('status', 'pendente')
         ->where('latitude', '<', (((float)Input::get('latitude')) + $limit))
         ->where('longitude', '>', (((float)Input::get('longitude')) - $limit))
         ->where('longitude', '<', (((float)Input::get('longitude')) + $limit))
         ->distinct()->orderByRaw(
            (float)(((float)'longitude' - (float)Input::get('longitude'))
               + (float)((float)'latitude' - (float)Input::get('latitude')))
         )->get();

         /*
         ->orderByRaw(
            (('longitude' - (float)Input::get('longitude'))
               - ('latitude' - (float)Input::get('latitude')))
         )
       */
         //->orderByRaw('r.nome')
        
        //return $foods;
      return OrderResource::collection($orders);
   }


   /**
    * Display a listing of the resource.
    *
    * @return \Illuminate\Http\Response
    */
   public function index()
   {
      $orders = Order::all();

      return OrderResource::collection($orders);
   }

   /**
    * Store a newly created resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response
    */
   public function store(Request $request)
   {
        //se existir id retorna existente senão cria novo
      $order = $request->isMethod('put') ? Order::findOrFail($request->order_id) : new Order;

        //seta os atributos da Model
      $order->status = $request->input('status');
      $order->user_id = $request->input('user_id');
      $order->latitude = $request->input('latitude');
      $order->longitude = $request->input('longitude');

        //se for salvo com sucesso retorna o recurso
      if ($order->save()) {
            //adiciono comida ao pedido
         $order->foods()->attach(['food_id' => $request->input('food_id')], ['quantity' => $request->input('quantity')]);
         return new OrderResource($order);
      }
   }

   public function getRestaurantOrders($restaurant_id)
   {
      $orders = Restaurant::find($restaurant_id)->orders->where('status', 'em andamento');

      return OrderResource::collection($orders);
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
      $order = Order::findOrFail($id);

        // Retorna o registro como um recurso
      return new OrderResource($order);
   }


   /**
    * Retorna ordem em aberto pertencente ao usuario
    *
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */
   public function showUserOrder($user_id)
   {
        //pega um unico registro da model
        /*
        $order = Order::where(['user_id'=>$user_id,'status'=>'pendente'])
        ->orderBy('updated_at','DESC')
        ->first();
       */

        /*
        $order = Order::where(function ($query) use ($user_id) {
            $query->where(['user_id'=>$user_id,'status'=>'pendente'])
                  ->orWhere(['user_id'=>$user_id,'status'=>'em andamento']);
        })
        ->orderBy('updated_at','DESC')
        ->first();

       */

        /*
        $order = Order::where(function ($query) use ($user_id) {
         $query->where(['user_id'=>$user_id,'status'=>'pendente'])
               ->orWhere(['user_id'=>$user_id,'status'=>'em andamento']);
         })
         ->orderBy('updated_at','DESC')
         ->first();
       */

      $order = Order::where(['user_id' => $user_id])->orderBy('updated_at', 'DESC')->first();


        // Retorna o registro como um recurso
      return new OrderResource($order);
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
      $order = Order::findOrFail($id);

        //se for deletado com sucesso retorna o recurso
      if ($order->delete()) {
         return new OrderResource($order);
      }
   }
}