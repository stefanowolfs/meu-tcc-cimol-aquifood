<?php

namespace App\Http\Controllers;

use Auth;
use App\User;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Resources\User as UserResource;
use Illuminate\Support\Facades\Input;

// Imports para usar o JWT
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class UserController extends Controller
{
    //##################### METODOS PARA JWT


   /**
    * 
    *  Autentica Login
    * 
    * o metodo tenta logar um usuario
    * e gera um token de autorização 
    * se não existir um no banco
    * 
    * retorna erro se usario nao existir
    * 
    **/
   public function authenticate(Request $request)
   {
      $credentials = $request->only('email', 'password');
        

        //Serie de validações
      try {
            //Se credenciais(email e senha) NAO existirem
         if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'invalid_credentials'], 401);
         }

        //Se ocorrer outro erro
      } catch (JWTException $e) {
         return response()->json(['error' => 'could_not_create_token'], 500);
      }
        
        //Se tudo ocorreu bem retorna o token
      return response()->json(compact('token'));
   }


   /**
    *  
    * Registra Usuario
    * 
    * Metodo valida campos de usuario
    * cria usuario se tudo estiver valido
    * o usuario então é passado no JWTAuth pra gerar
    * um token de acesso e o retorna evitando assim
    * o usuario ter que se logar pra receber o token 
    * 
    */
   public function register(Request $request)
   {

        //Validação de campos do usuario
      $validator = Validator::make($request->all(), [
         'name' => 'required|string|max:255',
         'email' => 'required|string|email|max:255|unique:users',
         'password' => 'required|string|min:6|confirmed',
      ]);

        //Se alguma validaçao falhar
      if ($validator->fails()) {
            //Retorna erros
         return response()->json($validator->errors()->toJson(), 400);
      }

        //Cria novo usuario (if sucess return true)
      $user = User::create([
         'name' => $request->get('name'),
         'email' => $request->get('email'),
         'password' => Hash::make($request->get('password')),
      ]);

        //Retorna token para o usuario
      $token = JWTAuth::fromUser($user);

        //Retorna usuario e token
      return response()->json(compact('user', 'token'), 201);
   }



   /**
    * 
    * Retorna usuario autenticado
    * 
    * Retorna usuario baseado no token que foi passado
    * 
    */
   public function getAuthenticatedUser()
   {
      try {

         if (!$user = JWTAuth::parseToken()->authenticate()) {
            return response()->json(['user_not_found'], 404);
         }

      } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

         return response()->json(['token_expired'], $e->getStatusCode());

      } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

         return response()->json(['token_invalid'], $e->getStatusCode());

      } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {

         return response()->json(['token_absent'], $e->getStatusCode());

      }

      return response()->json(compact('user'));
   }

    //##################### METODOS PADRÕES

   /**
    * Display a listing of the resource.
    *
    * @return \Illuminate\Http\Response
    */
   public function index()
   {
      $users = User::all();

      return UserResource::collection($users);
   }

   /**
    * Store a newly created resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response
    */
   public function store(Request $request)
   {
        //se existir id retorna existente senão cria novo
      $user = $request->isMethod('put') ? User::findOrFail($request->user_id) : new User;

        //seta os atributos da Model
      $user->id = $request->input('user_id');
      if (Input::has('name'))
         $user->name = $request->input('name');
      if (Input::has('conta'))
         $user->conta = $request->input('conta');
      if (Input::has('email'))
         $user->email = $request->input('email');
      if (Input::has('password'))
         $user->password = $request->input('password');    


        //se for salvo com sucesso retorna o recurso
      if ($user->save()) {
         return new UserResource($user);
      }
   }

   /**
    * Display the specified resource.
    *
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */
   public function show($id)
   {
        //pega um unico registro da model
      $user = User::findOrFail($id);

        // Retorna o registro como um recurso
      return new UserResource($user);
   }

   /**
    * Remove the specified resource from storage.
    *
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */
   public function destroy($id)
   {
        //pega um unico registro da model
      $user = User::findOrFail($id);

        //se for deletado com sucesso retorna o recurso
      if ($user->delete()) {
         return new UserResource($user);
      }
   }

}
