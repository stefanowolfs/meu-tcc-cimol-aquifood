<?php

use Faker\Generator as Faker;

$factory->define(App\Food::class, function (Faker $faker) {
    return [
        //tudo que vai ser gerado
        'nome' => $faker->text(10)
    ];
});
