
export function setOrder(user_id, food_id) {
   return {
      type: "SET_ORDER",
      payload: {
         request: {
            method: 'POST',
            url: 'api/order',
            data: {
               status: 'pendente',
               user_id: user_id,
               food_id: food_id,
               quantity: 1,
               latitude: -29.6246924,
               longitude: -50.8324672,
            }
         }
      }
   }
}

export function deleteOrder(id) {
   return {
      type: "DELETE_ORDER",
      payload: {
         request: {
            method: 'DELETE',
            url: 'api/order/' + id,
         }
      }
   }
}

export function getUserOrder(user_id) {
   return {
      type: "GET_USER_ORDER",
      payload: {
         request: {
            method: 'GET',
            url: 'api/order/user/' + user_id,
         }
      }
   }
}

export function getOrder(id) {
   return {
      type: "GET_ORDER",
      payload: {
         request: {
            method: 'GET',
            url: 'api/order/' + id,
         }
      }
   }
}

export function getNearOrders(coords) {
   const { latitude, longitude } = coords;
   return {
      type: "GET_NEAR_ORDERS",
      payload: {
         request: {
            method: 'get',
            url: 'api/orders/near',
            params: {
               latitude,
               longitude,
            }
         }
      }
   }
}
