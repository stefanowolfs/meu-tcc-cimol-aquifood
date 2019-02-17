<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Driver extends Model
{
    
    // Restaurant ao qual pertence
   public function restaurant()
   {
      return $this->belongsTo('App\Restaurant');
   }

   public function user()
   {
      return $this->belongsTo('App\User');
   }

    //Busca Orders
   public function orders()
   {
      return $this->belongsToMany('App\Order', 'drivers_orders', 'driver_id', 'order_id');
   }
}
