<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddedFoodsOrders extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //criando a Tabela Food_Orders
        Schema::create('foods_orders', function( $table ){
            $table->integer('food_id')->unsigned();
            $table->integer('order_id')->unsigned();
            
            // quantidade do produto
            $table->integer('quantity');
          });

          //Chaves estrangeiras
          Schema::table('foods_orders', function (Blueprint $table) {
            $table->foreign('food_id')->references('id')->on('foods')->onDelete('cascade');
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
        Schema::dropIfExists('foods_orders');
    }
}
