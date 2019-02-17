
export function getOrderDriver(order_id) {
   return {
      type: "GET_ORDER_DRIVER",
      payload: {
         request: {
            method: 'GET',
            url: 'api/driver/order/' + order_id,
         }
      }
   }
}

export function getDriver(id) {
   return {
      type: "GET_DRIVER",
      payload: {
         request: {
            method: 'GET',
            url: 'api/driver/' + id,
         }
      }
   }
}

export function deleteDriver(id) {
   return {
      type: "DELETE_DRIVER",
      payload: {
         request: {
            method: 'DELETE',
            url: 'api/driver/' + id,
         }
      }
   }
}

export function updateUserToDriver(data) {
   return {
      type: "UPDATE_USER_TO_DRIVER",
      payload: {
         request: {
            method: 'PUT',
            url: 'api/driver/user',
            data: data,
         }
      }
   }
}

export function addDriverOrder(data) {
   return {
      type: "ADD_DRIVER_ORDER",
      payload: {
         request: {
            method: 'PUT',
            url: 'api/driver/order',
            data: data,
         }
      }
   }
}

export function getDriverOrder(id) {
   return {
      type: "GET_DRIVER_ORDER",
      payload: {
         request: {
            method: 'GET',
            url: `api/driver/${id}/order`,
         }
      }
   }
}

export function resetDriver() {
   return {
      type: "RESET_DRIVER",
      payload: {
         tipo: 'resetando'
      }
   }
}