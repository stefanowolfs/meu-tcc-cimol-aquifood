<?php

use Illuminate\Database\Seeder;

class FoodTableSeeder extends Seeder
{
   /**
    * Run the database seeds.
    *
    * @return void
    */
   public function run()
   {
        //cria 10 exemplos da classe Food
      factory(App\Food::class, 10)->create();
   }
}
