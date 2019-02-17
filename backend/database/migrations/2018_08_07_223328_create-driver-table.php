<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDriverTable extends Migration
{
   /**
    * Run the migrations.
    *
    * @return void
    */
   public function up()
   {
      Schema::create('drivers', function (Blueprint $table) {
         $table->increments('id');
         $table->string('nome');
         $table->enum('veiculo', array('moto', 'carro')); //status da entrega
         $table->string('cpf');
         $table->decimal('longitude', 10, 7);
         $table->decimal('latitude', 10, 7);
         $table->integer('restaurant_id')->unsigned()->index()->nullable();
         $table->integer('user_id')->unsigned()->index()->nullable();
         $table->timestamps();
      });

      Schema::table('drivers', function (Blueprint $table) {

         $table->foreign('restaurant_id')->references('id')->on('restaurants')->onDelete('cascade');

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
      Schema::dropIfExists('drivers');
   }
}
