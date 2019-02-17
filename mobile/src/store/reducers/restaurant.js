
/**
 * Reducer que lida com restaurantes
 */

const restaurantReducer = (state = {
   restaurant: undefined,
   restaurants: [],
   foods: [],
   drivers: [],
   orders: [],
   error: '',
}, action) => {
   switch (action.type) {

      case "GET_RESTAURANT":
         state = {
            ...state
         };
         break;
      case "GET_RESTAURANT_SUCCESS":
         state = {
            ...state,
            restaurant: action.payload.data.data
         };
         break;
      case "GET_RESTAURANT_FAIL":
         state = {
            ...state,
            error: 'Erro ao retornar restaurante'
         };
         break;
      case "GET_RESTAURANT_FOODS":
         state = {
            ...state
         };
         break;
      case "GET_RESTAURANT_FOODS_SUCCESS":
         state = {
            ...state,
            foods: action.payload.data.data
         };
         break;
      case "GET_RESTAURANT_FOODS_FAIL":
         state = {
            ...state,
            error: 'Erro ao retornar comidas de restaurante'
         };
         break;
      case "GET_USER_RESTAURANT":
         state = {
            ...state
         };
         break;
      case "GET_USER_RESTAURANT_SUCCESS":
         state = {
            ...state,
            restaurant: action.payload.data.data
         };
         break;
      case "GET_USER_RESTAURANT_FAIL":
         state = {
            ...state,
            error: 'Erro ao retornar restaurante'
         };
         break;
      case "LIST_RESTAURANTS":
         state = {
            ...state
         };
         break;
      case "LIST_RESTAURANTS_SUCCESS":
         state = {
            ...state,
            restaurants: action.payload.data.data
         };
         break;
      case "LIST_RESTAURANTS_FAIL":
         state = {
            ...state,
            error: 'Erro ao retornar restaurantes'
         };
         break;
      case "SET_RESTAURANT":
         state = {
            ...state
         };
         break;
      case "CREATE_RESTAURANT":
         state = {
            ...state,
            restaurant: action.payload
         };
         break;
      case "CREATE_RESTAURANT_SUCCESS":
         state = {
            ...state,
            restaurant: action.payload.data.data
         };
         break;
      case "CREATE_RESTAURANT_FAIL":
         state = {
            ...state,
            error: 'Erro ao cadastrar restaurante'
         };
         break;

      case "CREATE_RESTAURANT_FOOD":
         state = {
            ...state,
         };
         break;
      case "CREATE_RESTAURANT_FOOD_SUCCESS":
         state = {
            ...state,
            foods: [...state.foods, action.payload.data.data]
         };
         break;
      case "CREATE_RESTAURANT_FOOD_FAIL":
         state = {
            ...state,
            error: 'Erro ao cadastrar lanche'
         };
         break;

      case "UPDATE_RESTAURANT_FOOD":
         state = {
            ...state,
         };
         break;
      case "UPDATE_RESTAURANT_FOOD_SUCCESS":
         state = {
            ...state,
            foods: state.foods.map(
               food => (
                  food.id === action.payload.data.data.id ?
                     action.payload.data.data :
                     food
               )
            )
         };
         break;
      case "UPDATE_RESTAURANT_FOOD_FAIL":
         state = {
            ...state,
            error: 'Erro ao atualizar lanche'
         };
         break;

      case "GET_RESTAURANT_DRIVERS":
         state = {
            ...state
         };
         break;
      case "GET_RESTAURANT_DRIVERS_SUCCESS":
         state = {
            ...state,
            drivers: action.payload.data.data
         };
         break;
      case "GET_RESTAURANT_DRIVERS_FAIL":
         state = {
            ...state,
            error: 'Erro ao retornar motoristas de restaurante'
         };
         break;


      case "GET_RESTAURANT_ORDERS":
         state = {
            ...state
         };
         break;
      case "GET_RESTAURANT_ORDERS_SUCCESS":
         state = {
            ...state,
            orders: action.payload.data.data
         };
         break;
      case "GET_RESTAURANT_ORDERS_FAIL":
         state = {
            ...state,
            error: 'Erro ao retornar pedidos de restaurante',
         };


      case "UPDATE_RESTAURANT_DRIVER":
         state = {
            ...state,
         };
         break;
      case "UPDATE_RESTAURANT_DRIVER_SUCCESS":
         state = {
            ...state,
            drivers: state.drivers.map(
               driver => (
                  driver.id === action.payload.data.data.id ?
                     action.payload.data.data :
                     driver
               )
            )
         };
         break;
      case "UPDATE_RESTAURANT_DRIVER_FAIL":
         state = {
            ...state,
            error: 'Erro ao atualizar motorista'
         };
         break;


      case "CREATE_RESTAURANT_DRIVER":
         state = {
            ...state,
         };
         break;
      case "CREATE_RESTAURANT_DRIVER_SUCCESS":
         state = {
            ...state,
            drivers: [...state.drivers, action.payload.data.data]
         };
         break;
      case "CREATE_RESTAURANT_DRIVER_FAIL":
         state = {
            ...state,
            error: 'Erro ao cadastrar motorista'
         };
         break;


      case "ADD_RESTAURANT_ORDER":
         state = {
            ...state,
            orders: [],
         };
         break;
      case "ADD_RESTAURANT_ORDER_SUCCESS":
         state = {
            ...state,
            orders: action.payload.data.data
         };
         break;
      case "ADD_RESTAURANT_ORDER_FAIL":
         state = {
            ...state,
            error: 'Erro ao adicionar pedido no restaurante'
         };
         break;

      case "REMOVE_RESTAURANT_ORDER":
         state = {
            ...state,
         };
         break;
      case "REMOVE_RESTAURANT_ORDER_SUCCESS":
         state = {
            ...state,
            orders: action.payload.data.data
         };
         break;
      case "REMOVE_RESTAURANT_ORDER_FAIL":
         state = {
            ...state,
            error: 'Erro ao remover pedido do restaurante'
         };
         break;


   }
   return state;
};

export default restaurantReducer;