const userReducer = (
   state = {
      user: undefined,
      jwt: undefined,
      coords: undefined,
      driver: undefined,
   },
   action
) => {
   switch (action.type) {

      case "SET_USER": {
         state = {
            ...state,
            user: action.payload
         };
         break;
      }

      case "SET_JWT": {
         state = {
            ...state,
            jwt: action.payload
         };
         break;
      }

      case "GET_USER": {
         state = {
            ...state
         };
         break;
      }

      case "GET_USER_SUCCESS": {
         state = {
            ...state,
            user: action.payload.data.user,
         };
         break;
      }

      case "GET_USER_FAIL": {
         state = {
            ...state,
            user: undefined,
         };
         break;
      }

      case "DELETE_USER": {
         state = {
            ...state
         };
         break;
      }

      case "DELETE_USER_SUCCESS": {
         state = {
            ...state,
            user: undefined,
         };
         break;
      }

      case "DELETE_USER_FAIL": {
         state = {
            ...state,
         };
         break;
      }

      case "UPDATE_USER": {
         state = {
            ...state
         };
         break;
      }

      case "UPDATE_USER_SUCCESS": {
         state = {
            ...state,
            user: action.payload.data,
         };
         break;
      }

      case "UPDATE_USER_FAIL": {
         state = {
            ...state,
         };
         break;
      }

      case "UPDATE_DRIVER_USER": {
         state = {
            ...state
         };
         break;
      }

      case "UPDATE_DRIVER_USER_SUCCESS": {
         state = {
            ...state,
            driver: action.payload.data.data,
         };
         break;
      }

      case "UPDATE_DRIVER_USER_FAIL": {
         state = {
            ...state,
         };
         break;
      }


      case "SET_DRIVER": {
         state = {
            ...state,
            driver: action.payload,
         };
         break;
      }

      case "ADD_USER": {
         state = {
            ...state
         };
         break;
      }

      case "ADD_USER_SUCCESS": {
         state = {
            ...state,
            user: action.payload.data.user,
         };
         break;
      }

      case "ADD_USER_FAIL": {
         state = {
            ...state,
         };
         break;
      }

      case "SET_COORDS": {
         state = {
            ...state,
            coords: action.payload,
         };
         break;
      }


      case "ADD_DRIVER_USER": {
         state = {
            ...state
         };
         break;
      }

      case "ADD_DRIVER_USER_SUCCESS": {
         state = {
            ...state,
            driver: action.payload.data.user,
         };
         break;
      }

      case "ADD_DRIVER_USER_FAIL": {
         state = {
            ...state,
         };
         break;
      }



   }

   return state;
}

export default userReducer;