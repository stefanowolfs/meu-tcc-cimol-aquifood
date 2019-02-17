<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Driver extends JsonResource
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

      return [
         'id' => $this->id,
         'nome' => $this->nome,
         'veiculo' => $this->veiculo,
         'cpf' => $this->cpf,
         'longitude' => $this->longitude,
         'latitude' => $this->latitude,
         'restaurant_id' => $this->restaurant_id,
         'user_id' => $this->user_id,
      ];
   }

   public function with($request)
   {
      return [
         'model' => 'driver',
      ];
   }
}
