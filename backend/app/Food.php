<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Food extends Model
{
    
    //Busca Restaurantes
   public function restaurants()
   {
      return $this->belongsToMany('App\Restaurant', 'foods_restaurants', 'food_id', 'restaurant_id')->withPivot('price');
   }

    //Busca Ordens
   public function orders()
   {
        
        //withPivot indica um atributo extra existente na tabela Pivot
      return $this->belongsToMany('App\Order', 'foods_orders', 'food_id', 'order_id')->withPivot('quantity');
   }
}
