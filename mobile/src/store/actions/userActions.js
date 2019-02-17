
export function setJwt(jwt) {
   return {
      type: "SET_JWT",
      payload: jwt
   }
}

export function setCoords(coords) {
   return {
      type: "SET_COORDS",
      payload: coords
   }
}

export function setUser(user) {
   return {
      type: "SET_USER",
      payload: user
   }
}

export function setDriver(driver) {
   return {
      type: "SET_DRIVER",
      payload: driver
   }
}

export function logUser(email, password) {
   return {
      type: "ADD_USER",
      payload: {
         request: {
            method: 'POST',
            url: 'api/login',
            data: {
               email,
               password
            }
         }
      }
   }
}

export function addUser(name, email, password, password_confirmation) {
   return {
      type: "ADD_USER",
      payload: {
         request: {
            method: 'POST',
            url: 'api/register',
            data: {
               name,
               email,
               password,
               password_confirmation,
            }
         }
      }
   }
}

export function addDriverUser(name, email, password, password_confirmation) {
   return {
      type: "ADD_DRIVER_USER",
      payload: {
         request: {
            method: 'POST',
            url: 'api/register',
            data: {
               name,
               email,
               password,
               password_confirmation,
            }
         }
      }
   }
}

export function getUser() {
   return {
      type: "GET_USER",
      payload: {
         request: {
            method: 'GET',
            url: 'api/user/',
         }
      }
   }
}

export function updateUser(data) {
   return {
      type: "UPDATE_USER",
      payload: {
         request: {
            method: 'PUT',
            url: 'api/user/',
            data: data,
         }
      }
   }
}

export function updateDriverUser(data) {
   return {
      type: "UPDATE_DRIVER_USER",
      payload: {
         request: {
            method: 'PUT',
            url: 'api/user/',
            data: data,
         }
      }
   }
}

export function deleteUser(id) {
   return {
      type: "DELETE_USER",
      payload: {
         request: {
            method: 'DELETE',
            url: `api/user/${id}`,
         }
      }
   }
}

export function getUserDriver(user_id) {
   return {
      type: "GET_USER_DRIVER",
      payload: {
         request: {
            method: 'GET',
            url: `api/user/${user_id}/driver`,
         }
      }
   }
}
