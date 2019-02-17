
const orderReducer = (
   state = {
      order: undefined,
      orders: [],
      error: '',
   },
   action
) => {
   switch (action.type) {

      case "GET_ORDER":
         state = {
            ...state,
         };
         break;
      case "GET_ORDER_SUCCESS":
         state = {
            ...state,
            order: action.payload.data.data,
         };
         break;
      case "GET_ORDER_FAIL":
         state = {
            ...state,
            error: 'Erro ao tentar obter pedido por id'
         };
         break;


      case "GET_USER_ORDER":
         state = {
            ...state
         };
         break;
      case "GET_USER_ORDER_SUCCESS":
         state = {
            ...state,
            order: action.payload.data.data,
         };
         break;
      case "GET_USER_ORDER_FAIL":
         state = {
            ...state,
            error: 'Erro ao retornar pedido',
         };
         break;


      case "SET_ORDER":
         state = {
            ...state
         };
         break;
      case "SET_ORDER_SUCCESS":
         state = {
            ...state,
            order: action.payload.data.data
         };
         break;
      case "SET_ORDER_FAIL":
         state = {
            ...state,
            error: 'Erro ao tentar encontrar pedido'
         };
         break;


      case "DELETE_ORDER":
         state = {
            ...state,
            order: undefined,
         };
         break;
      case "DELETE_ORDER_SUCCESS":
         state = {
            ...state,
            order: undefined,
         };
         break;
      case "DELETE_ORDER_FAIL":
         state = {
            ...state,
            error: 'Erro ao tentar deletar pedido'
         };
         break;

      case "GET_NEAR_ORDERS":
         state = {
            ...state,
            orders: [],
         };
         break;
      case "GET_NEAR_ORDERS_SUCCESS":
         state = {
            ...state,
            orders: action.payload.data.data,
         };
         break;
      case "GET_NEAR_ORDERS_FAIL":
         state = {
            ...state,
            error: 'Erro ao retornar pedidos',
         };
         break;
   }
   return state;
}

export default orderReducer;