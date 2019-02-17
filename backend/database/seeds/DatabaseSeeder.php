<?php

use Illuminate\Database\Seeder;

//inserções ao banco com queryes
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
   /**
    * Seed the application's database.
    *
    * @return void
    */
   public function run()
   {
        //criando 10 Foods
      factory(App\Food::class, 10)->create();
        //criando 10 Restaurants que possuem entre 1 a 5 Foods e 1 Driver cada ( Many-to-Many + One-to-Many )
      factory(App\Restaurant::class, 10)->create()->each(function ($restaurant) {
         factory(App\Driver::class, 1)->create(['restaurant_id' => $restaurant->id]);
         $random = rand(1, 5);
         for ($i = 0; $i < $random; $i++) {
            $restaurant->foods()->attach([rand(1, 10), rand(1, 10)], ['price' => rand(5, 20)]);
         }
      });
        //criando 10 Users que possuem entre 1 a 3 Order cada ( One-to-Many )
      factory(App\User::class, 10)->create()->each(function ($user) {
            //cria ordem que pertence a um user e a um driver
         factory(App\Order::class, 1)->create(['user_id' => $user->id])->each(function ($order) use ($user) {
                
                // que pode possuir de 1 a 3 tipos de Foods
            $random = rand(1, 3);
            for ($i = 0; $i < $random; $i++) {
                    //ligação de Order com Foods e a quantidade ( One-to-Many )
               $order->foods()->attach(['food_id' => rand(1, 10)], ['quantity' => rand(1, 3)]);
            }
                
                //ligação de Order com Restaurants ( Many-to-Many )
            $order->restaurants()->attach(rand(1, 10));
            $driver = App\Driver::find(rand(1, 10));
            $driver->orders()->attach(['order_id' => $order->id]);
         });
      });
      //Associa um usuario pra cada motorista
      for ($i = 1; $i <= 10; $i++) {
         App\Driver::find($i)->user()->associate($i)->save();
      }
        //tests
        //$this->call(UsersTableSeeder::class);
        //$this->call(ArticlesTableSeeder::class);
        //$this->call(FoodTableSeeder::class);
        //$this->call(RestaurantTableSeeder::class);
        //$order = App\Order::find(1);
        //$order->foods()->sync(2,['driver_id' => 2]);
   }
}
