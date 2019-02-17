<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddedFoodsRestaurants extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //criando a Tabela Comidas_Restaurantes
        Schema::create('foods_restaurants', function( $table ){
            $table->integer('food_id')->unsigned();
            $table->integer('restaurant_id')->unsigned();
            $table->decimal('price', 6,2);
          });

          //Chaves estrangeiras
          Schema::table('foods_restaurants', function (Blueprint $table) {
            $table->foreign('food_id')->references('id')->on('foods')->onDelete('cascade');
            $table->foreign('restaurant_id')->references('id')->on('restaurants')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('foods_restaurants');
    }
}
