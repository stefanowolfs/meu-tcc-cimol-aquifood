<?php

use Faker\Generator as Faker;

$factory->define(App\Restaurant::class, function (Faker $faker) {
   return [
        //Atributos que serão gerados
      'name' => $faker->company(),
      'email' => $faker->email(),
      'latitude' => $faker->latitude($min = -29.648, $max = -29.645),
      'longitude' => $faker->longitude($min = -50.785, $max = -50.780)
   ];
});
