<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

// Importando JWT
use Tymon\JWTAuth\Contracts\JWTSubject;

// Extendendo classe de JWT
class User extends Authenticatable implements JWTSubject
{
   use Notifiable;

   /**
    * The attributes that are mass assignable.
    *
    * @var array
    */
   protected $fillable = [
      'name', 'email', 'password',
   ];

   /**
    * The attributes that should be hidden for arrays.
    *
    * @var array
    */
   protected $hidden = [
      'password', 'remember_token',
   ];

   /**
    * Retorna os PEDIDOS do USUARIO.
    */
   public function orders()
   {
      return $this->hasMany('App\Order');
   }
    
    //Função do JWT
   public function getJWTIdentifier()
   {
      return $this->getKey();
   }
   public function getJWTCustomClaims()
   {
      return [];
   }


    // Usuario pode possuir restaurante
   public function restaurant()
   {
      return $this->hasOne('App\Restaurant');
   }

    // Usuario pode possuir restaurante
   public function driver()
   {
      return $this->hasOne('App\Driver');
   }


}
