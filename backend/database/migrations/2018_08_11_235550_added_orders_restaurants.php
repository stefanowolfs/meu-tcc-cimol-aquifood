<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddedOrdersRestaurants extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //criando a Tabela Orders_Restaurants
        Schema::create('orders_restaurants', function( $table ){
            $table->integer('restaurant_id')->unsigned();
            $table->integer('order_id')->unsigned();
          });

          //Chaves estrangeiras
          Schema::table('orders_restaurants', function (Blueprint $table) {
            $table->foreign('restaurant_id')->references('id')->on('restaurants')->onDelete('cascade');
            $table->foreign('order_id')->references('id')->on('orders')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders_restaurants');
    }
}
