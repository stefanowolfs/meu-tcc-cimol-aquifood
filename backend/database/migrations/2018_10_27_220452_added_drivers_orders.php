<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddedDriversOrders extends Migration
{
   /**
    * Run the migrations.
    *
    * @return void
    */
   public function up()
   {
        //criando a Tabela Drivers_Orders
      Schema::create('drivers_orders', function ($table) {
         $table->integer('driver_id')->unsigned();
         $table->integer('order_id')->unsigned();
      });

          //Chaves estrangeiras
      Schema::table('drivers_orders', function (Blueprint $table) {
         $table->foreign('driver_id')->references('id')->on('drivers')->onDelete('cascade');
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
      Schema::dropIfExists('drivers_orders');
   }
}
