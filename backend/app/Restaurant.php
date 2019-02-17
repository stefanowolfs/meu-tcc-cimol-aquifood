<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Restaurant extends Model
{
    //Busca Foods
   public function foods()
   {
      return $this->belongsToMany('App\Food', 'foods_restaurants', 'restaurant_id', 'food_id')->withPivot('price');
   }

    //Busca Drivers
   public function drivers()
   {
      return $this->hasMany('App\Driver');
   }

    //Busca Ordens
   public function orders()
   {
      return $this->belongsToMany('App\Order', 'orders_restaurants', 'restaurant_id', 'order_id');
   }


    //Pertence a um usuario
   public function user()
   {
      return $this->belongsTo('App\User');
   }
}
