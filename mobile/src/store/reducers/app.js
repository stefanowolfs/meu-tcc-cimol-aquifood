
const appReducer = (
   state = {
      error: undefined,
   },
   action
) => {
   switch (action.type) {
      case "SET_APP_ERROR":
         state = {
            ...state,
            error: action.payload
         };
         break;

      case "ADD_USER_FAIL":
         state = {
            ...state,
            error: 'usuario ou senha incorretos'
         };
         break;


   }
   return state;
}

export default appReducer;