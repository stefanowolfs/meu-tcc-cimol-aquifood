# aquifood-backend

Este projeto faz parte do meu TCC e é uma aplicação back-end que fornece API's para outra aplicação de entrega de alimentos. :)
------------------------------------------------------------------------------------------------
######
######
######  DIARIO DE BORDO:
##
##  Dia 1 - 04/08/2018

Hoje estudei sobre resources do laravel, e criei uma api teste para Artigos, instalei o postman e testei os end points.

Tudo funcionou corretamente.

Agora vou tentar realizar o deploy no heroku (obs: to aprendendo a usar o heroku xD )

Consegui fazer o deploy o site funciona perfeitamente, mas tive problemas ao rodar "heroku run php artisan db:seed"...

encontrei a solução:

    1. dentro de composer.json "fzaninotto/faker" of "require-dev" for "require".
    2. git push heroku masteR
    3. heroku run bash
    4. composer install
    5. php artisan db:seed
    obs: Repetir etapas 3 até 5 toda vez que for fazer db:seed
    

##  Dia 2 - 08/08/2018

Hoje tive pouco tempo pra trabalhar no projeto, mas já criei algumas migrations que vão ser utilizadas futuramente pelo aplicativo mobile. 


## Dia 3 - 11/08/2018

Após estudar mais sobre como funcionam os relacionamentos One-to-One, One-to-Many e Many-to-Many dentro das Migrations e do Eloquent comecei a trabalhar em cima das Migrations, Models, Factories e Seeders afim de criar o banco de dados e já poder popular ele com dados falsos para testar a aplicação futuramente.


## Dia 4 - 20/08/2018

Aprendi muito sobre o uso do faker para geração de fake data e popular o banco de forma facil sempre que eu precisar. Hoje conclui todos as Models e Controllers nescessários.


## Dia 5 - 26/08/2018

Hoje implementei o uso de resources e criei as rotas de API para o CRUD de cada entidade.


## Dia 6 - 01/09/2018

Hoje vou estudar sobre JWT para autenticação de usuarios e filtragem das rotas no Laravel.


## Dia 7 - 28/10/2018

Devido alguns contratempos não tive muito tempo para atualizar o diario seguidamente, consegui realizar algumas alterações importantes durante este periodo implementei o JTW e aprimorei algumas rotas de API e também reformulei as Seeds que vão popular a base de dados com dados falsos para fins de teste.


## Dia 8 - 02/11/2018

Foram implementadas uma rota para obter todas as comidas dos restaurantes existentes nas proximidades do pedido realizado, e outra para obter o ultimo pedido feito pelo cliente, assim como as respectivas ações em seus controlers.