<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrderTable extends Migration
{
   /**
    * Run the migrations.
    *
    * @return void
    */
   public function up()
   {
      Schema::create('orders', function (Blueprint $table) {
         $table->increments('id');
         $table->enum('status', array('pendente', 'em andamento', 'entregue', 'cancelado', 'entregando'));
         $table->integer('user_id')->unsigned()->index()->nullable();
         $table->decimal('longitude', 10, 7);
         $table->decimal('latitude', 10, 7);
         $table->timestamps();
      });

      Schema::table('orders', function (Blueprint $table) {
         $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
      });
   }

   /**
    * Reverse the migrations.
    *
    * @return void
    */
   public function down()
   {
      Schema::dropIfExists('orders');
   }
}
