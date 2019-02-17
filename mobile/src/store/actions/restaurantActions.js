/**
 * ações que alteram o estado do restaurante
 */

export function createRestaurant(restaurant) {
   const {
      name,
      latitude,
      longitude,
      email,
      user_id
   } = restaurant;
   return {
      type: "CREATE_RESTAURANT",
      payload: {
         request: {
            method: 'post',
            url: `api/restaurant/`,
            data: {
               name: name,
               email: email,
               latitude: latitude,
               longitude: longitude,
               user_id: user_id
            }
         }
      }
   }
}

export function setRestaurant(restaurant) {
   const {
      id,
      name,
      latitude,
      longitude,
      email,
      user_id
   } = restaurant;
   return {
      type: "SET_RESTAURANT",
      payload: {
         id,
         name,
         email,
         latitude,
         longitude,
         user_id,
      }
   }
}

export function getUserRestaurant(user_id) {
   return {
      type: "GET_USER_RESTAURANT",
      payload: {
         request: {
            method: 'get',
            url: `api/user/restaurant/${user_id}`,
         }
      }
   }
}

export function getRestaurant(id) {
   return {
      type: "GET_RESTAURANT",
      payload: {
         request: {
            method: 'get',
            url: `api/restaurant/${id}`,
         }
      }
   }
}

export function listRestaurants(jwt) {
   return {
      type: "LIST_RESTAURANTS",
      payload: {
         request: {
            method: 'get',
            url: 'api/restaurants',
         }
      }
   }
}

export function getRestaurantFoods(id) {
   return {
      type: "GET_RESTAURANT_FOODS",
      payload: {
         request: {
            method: 'get',
            url: `api/restaurant/foods/${id}`,
         }
      }
   }
}

export function getRestaurantDrivers(id) {
   return {
      type: "GET_RESTAURANT_DRIVERS",
      payload: {
         request: {
            method: 'get',
            url: `api/restaurant/drivers/${id}`,
         }
      }
   }
}

export function getRestaurantOrders(restaurant_id) {
   return {
      type: "GET_RESTAURANT_ORDERS",
      payload: {
         request: {
            method: 'get',
            url: `api/restaurant/orders/${restaurant_id}`,
         }
      }
   }
}



export function createRestaurantFood(food) {
   const {
      nome,
      restaurant_id,
      price
   } = food;
   return {
      type: "CREATE_RESTAURANT_FOOD",
      payload: {
         request: {
            method: 'post',
            url: `api/restaurant/food`,
            data: {
               nome,
               restaurant_id,
               price
            }
         }
      }
   }
}

export function createRestaurantDriver(driver) {

   const {
      nome,
      veiculo,
      cpf,
      longitude,
      latitude,
      restaurant_id,
      user_id
   } = driver;

   return {
      type: "CREATE_RESTAURANT_DRIVER",
      payload: {
         request: {
            method: 'post',
            url: `api/driver`,
            data: {
               nome,
               veiculo,
               cpf,
               longitude,
               latitude,
               restaurant_id,
               user_id,
            }
         }
      }
   }
}

export function updateRestaurantFood(data) {
   return {
      type: "UPDATE_RESTAURANT_FOOD",
      payload: {
         request: {
            method: 'PUT',
            url: 'api/restaurant/food',
            data: data,
         }
      }
   }
}

export function updateRestaurantDriver(data) {
   return {
      type: "UPDATE_RESTAURANT_DRIVER",
      payload: {
         request: {
            method: 'PUT',
            url: 'api/driver',
            data: data,
         }
      }
   }
}

export function removeRestaurantOrder(id, order_id) {
   return {
      type: "REMOVE_RESTAURANT_ORDER",
      payload: {
         request: {
            method: 'DELETE',
            url: `api/restaurant/${id}/order/${order_id}`,
         }
      }
   }
}

export function addRestaurantOrder(data) {
   return {
      type: "ADD_RESTAURANT_ORDER",
      payload: {
         request: {
            method: 'PUT',
            url: 'api/restaurant/order',
            data: data,
         }
      }
   }
}


