<?php

use Illuminate\Database\Seeder;

class RestaurantTableSeeder extends Seeder
{
   /**
    * Run the database seeds.
    *
    * @return void
    */
   public function run()
   {
        //cria 5 exemplos da Classe Restaurant no banco
      factory(App\Restaurant::class, 5)->create();
   }
}
