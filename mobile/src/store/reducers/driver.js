
const driverReducer = (
   state = {
      driver: undefined,
      order: undefined,
   },
   action
) => {
   switch (action.type) {



      case "RESET_DRIVER": {
         state = {
            driver: undefined,
            order: undefined,
         };
         break;
      }


      case "GET_ORDER_DRIVER": {
         state = {
            ...state
         };
         break;
      }

      case "GET_ORDER_DRIVER_SUCCESS": {
         state = {
            ...state,
            driver: action.payload.data.data[0],
         };
         break;
      }

      case "GET_ORDER_DRIVER_FAIL": {
         state = {
            ...state,
            driver: undefined,
         };
         break;
      }

      case "GET_DRIVER": {
         state = {
            ...state
         };
         break;
      }

      case "GET_DRIVER_SUCCESS": {
         state = {
            ...state,
            driver: action.payload.data.data,
         };
         break;
      }

      case "GET_DRIVER_FAIL": {
         state = {
            ...state,
            driver: undefined,
         };
         break;
      }


      case "DELETE_DRIVER": {
         state = {
            ...state,
            drivers: [],
         };
         break;
      }

      case "DELETE_DRIVER_SUCCESS": {
         state = {
            ...state,
            drivers: action.payload.data.data,
         };
         break;
      }

      case "DELETE_DRIVER_FAIL": {
         state = {
            ...state,
            error: 'Erro ao deletar comida',
         };
         break;
      }

      case "UPDATE_USER_TO_DRIVER": {
         state = {
            ...state
         };
         break;
      }

      case "UPDATE_USER_TO_DRIVER_SUCCESS": {
         state = {
            ...state,
            driver: action.payload.data.data,
         };
         break;
      }

      case "UPDATE_USER_TO_DRIVER_FAIL": {
         state = {
            ...state,
            driver: undefined,
         };
         break;
      }

      case "ADD_DRIVER_ORDER":
         state = {
            ...state,
            order: undefined,
         };
         break;
      case "ADD_DRIVER_ORDER_SUCCESS":
         state = {
            ...state,
            order: action.payload.data.data
         };
         break;
      case "ADD_DRIVER_ORDER_FAIL":
         state = {
            ...state,
            error: 'Erro ao adicionar pedido em motorista'
         };
         break;

      case "GET_DRIVER_ORDER":
         state = {
            ...state,
            order: undefined,
         };
         break;
      case "GET_DRIVER_ORDER_SUCCESS":
         state = {
            ...state,
            order: action.payload.data.data
         };
         break;
      case "GET_DRIVER_ORDER_FAIL":
         state = {
            ...state,
            error: 'Erro ao retornar pedido de motorista'
         };
         break;


      case "GET_USER_DRIVER":
         state = {
            ...state,
            driver: undefined,
         };
         break;
      case "GET_USER_DRIVER_SUCCESS":
         state = {
            ...state,
            driver: action.payload.data.data
         };
         break;
      case "GET_USER_DRIVER_FAIL":
         state = {
            ...state,
            error: 'Erro ao retornar motorista'
         };
         break;

   }

   return state;
}

export default driverReducer;