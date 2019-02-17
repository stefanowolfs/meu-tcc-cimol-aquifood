export function getFoods(coords) {
   return {
      type: "GET_FOODS",
      payload: {
         request: {
            method: 'get',
            url: 'api/foods/near',
            params: {
               latitude: -29.6246924,
               longitude: -50.8324672,
            }
         }
      }
   }
}

export function deleteFood(id) {
   return {
      type: "DELETE_FOOD",
      payload: {
         request: {
            method: 'DELETE',
            url: 'api/food/' + id,
         }
      }
   }
}