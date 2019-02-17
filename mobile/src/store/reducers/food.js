
const foodReducer = (
   state = {
      foods: [],
      error: '',
   },
   action
) => {
   switch (action.type) {
      case "GET_FOODS":
         state = {
            ...state
         };
         break;
      case "GET_FOODS_SUCCESS":
         state = {
            ...state,
            foods: action.payload.data.data,
         };
         break;
      case "GET_FOODS_FAIL":
         state = {
            ...state,
            error: 'Erro ao retornar lanches',
         };
         break;

      case "DELETE_FOOD":
         state = {
            ...state,
            foods: [],
         };
         break;
      case "DELETE_FOOD_SUCCESS":
         state = {
            ...state,
            foods: action.payload.data.data,
         };
         break;
      case "DELETE_FOOD_FAIL":
         state = {
            ...state,
            error: 'Erro ao deletar comida',
         };
         break;

   }
   return state;
}

export default foodReducer;