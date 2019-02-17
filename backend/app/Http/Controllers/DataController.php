<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

/**
 * Classe de sandbox para testar o JWT de usuarios
 */
class DataController extends Controller
{
    public function open() {
        $data = "This data is open and can be accessed without the client being authenticated";
        return response()->json(compact('data'),200);

    }

    public function closed() {
        $data = "Only authorized users can see this";
        return response()->json(compact('data'),200);
    }
}
