<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Food extends JsonResource
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

      if (isset($this->pivot->price)) {
         $result = [
            'id' => $this->id,
            'nome' => $this->nome,
            'price' => $this->pivot->price
         ];
      } else {
         $result = [
            'id' => $this->id,
            'nome' => $this->nome
         ];
      };

      return $result;

      /*
      return [
         'id' => $this->id,
         'nome' => $this->nome
      ];
       */

   }
}
