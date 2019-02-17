<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Article extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        // isto é o comando padrão que retorna tudo
        //return parent::toArray($request);


        // abaixo vou customizar a forma como o resource é entregue
        // ditando os atributos um a um que quero mostrar
        return[
            'id' => $this->id,
            'title' => $this->title,
            'body' => $this->body
        ];

    }

    // Adicionando mais informações no request
    // para funcionar tudo precisa estar embrulhado no data
    public function with($request){
        return [
            'version' => '1.0.0',
            'author_url' => url('http://codandocafe.esy.es')
        ];
    }


}
