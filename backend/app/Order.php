<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    // Usuario a qual pertence
    public function user()
    {
        return $this->belongsTo('App\User');
    }

    //Busca Foods
    public function foods(){
        
        //withPivot indica um atributo extra existente na tabela Pivot
        return $this->belongsToMany( 'App\Food', 'foods_orders', 'order_id', 'food_id' )->withPivot('quantity');
    }

    //Busca Restaurants
    public function restaurants(){
        return $this->belongsToMany( 'App\Restaurant', 'orders_restaurants', 'order_id', 'restaurant_id' );
    }

    //Busca Drivers
    public function drivers(){
        return $this->belongsToMany( 'App\Driver', 'drivers_orders', 'order_id', 'driver_id' );
    }
}
