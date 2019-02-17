<?php

use Faker\Generator as Faker;

$factory->define(App\Order::class, function (Faker $faker) {
   return [
        //Atributos que serão gerados

      'status' => function () {
         switch (rand(1, 4)) {
            case 1:
               $status = 'pendente';
               break;
            case 2:
               $status = 'em andamento';
               break;
            case 3:
               $status = 'entregue';
               break;
            case 4:
               $status = 'cancelado';
               break;
         }
         return $status;
      },
      'latitude' => $faker->latitude($min = -29.648, $max = -29.645),
      'longitude' => $faker->longitude($min = -50.785, $max = -50.780)
   ];
});
