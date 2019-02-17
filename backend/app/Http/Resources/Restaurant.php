<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Restaurant extends JsonResource
{
   /**
    * Transform the resource into an array.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return array
    */
   public function toArray($request)
   {
        //return parent::toArray($request);
        //https://medium.com/@dinotedesco/using-laravel-5-5-resources-to-create-your-own-json-api-formatted-api-2c6af5e4d0e8

      return [
         'id' => $this->id,
         'name' => $this->name,
         'user_id' => $this->user_id,
         'email' => $this->email,
         'longitude' => $this->longitude,
         'latitude' => $this->latitude,
      ];
   }

    // Adicionando mais informações no request
    // para funcionar tudo precisa estar embrulhado no data
   public function with($request)
   {
      return [
         'model' => 'restaurant',
      ];
   }
}
