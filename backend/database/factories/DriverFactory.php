<?php

use Faker\Generator as Faker;

$factory->define(App\Driver::class, function (Faker $faker) {
   return [
        //tudo que vai ser gerado
      'nome' => $faker->name(),
      'cpf' => $faker->ean13(),
      'veiculo' => 'carro',
      'latitude' => $faker->latitude($min = -29.648, $max = -29.645),
      'longitude' => $faker->longitude($min = -50.785, $max = -50.780)
   ];
});
