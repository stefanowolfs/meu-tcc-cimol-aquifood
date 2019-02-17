import Reactotron from '../services/ReactotronConfig';
import { AsyncStorage } from 'react-native';

import logger from 'redux-logger';

import { combineReducers, applyMiddleware, compose } from 'redux';

import api from '../services/api';

import axiosMiddleware from "redux-axios-middleware";

import {
   userReducer,
   foodReducer,
   orderReducer,
   driverReducer,
   restaurantReducer,
   appReducer,
} from './reducers';

import { setAppError } from './actions/appActions';
import { getDriverOrder } from './actions/driverActions';
import { setJwt, logUser, getUserDriver } from './actions/userActions';
import { getUserOrder } from './actions/orderActions';
import {
   getUserRestaurant,
   setRestaurant,
   getRestaurantFoods,
   getRestaurantDrivers,
   getRestaurantOrders,
} from './actions/restaurantActions';


const reducers = combineReducers({
   userReducer,
   foodReducer,
   orderReducer,
   driverReducer,
   restaurantReducer,
   appReducer,
})

const axiosMiddlewareOptions = {
   returnRejectedPromiseOnError: false,
   interceptors: {
      request: [
         ({ getAction, getState, dispatch }, config) => {
            // se tiver JWT
            if (getState().userReducer.jwt) {
               config.headers['Authorization'] = 'Bearer ' + getState().userReducer.jwt
            }
            return config;
         }
      ],
      response: [{
         success: ({ getAction, getState, dispatch, getSourceAction }, response) => {
            // Faz alguma coisa
            console.log('response:');
            console.log(response);

            const { data } = response;


            if (data.token) {
               if (!getState().userReducer.jwt) {
                  const { token } = data;

                  dispatch(setJwt(token));
                  AsyncStorage.setItem('@AquiFood:jwt', token);
               }
            }

            if (data.user) {
               if (!getState().userReducer.user) {
                  const { id, email } = data.user;

                  AsyncStorage.setItem('@AquiFood:email', email);

                  switch (data.user.conta) {

                     case "motorista": {
                        dispatch(getUserDriver(data.user.id));
                        break;
                     }
                     case "restaurante": {
                        dispatch(getUserRestaurant(id));
                        break;
                     }
                     case "cliente": {
                        dispatch(getUserOrder(id));
                        break;
                     }

                  }
               }
            }

            //res tem status "Token is Expired" ? atualiza token
            if (data.status === 'Token is Expired') {

               //* Refresh Token
            }

            if (data.model) {
               switch (data.model) {

                  case "restaurant": {
                     dispatch(getRestaurantFoods(data.data.id));
                     dispatch(getRestaurantDrivers(data.data.id));
                     dispatch(getRestaurantOrders(data.data.id));
                     dispatch(setRestaurant(data.data));
                     break;
                  }

                  case "driver": {
                     dispatch(getRestaurantOrders(data.data.restaurant_id));
                     dispatch(getDriverOrder(data.data.id));
                  }

               }
            }


            return response;
         },
         error: ({ getAction, getState, dispatch, getSourceAction }, error) => {
            console.log('REQUEST ERROR ON ( ' + error.config.reduxSourceAction.type + ' )');


            // Error Handling
            if (error.response) {
               console.log('############**------ error.response');
               // The request was made and the server responded with a status code
               // that falls out of the range of 2xx
               console.log(error.response.data);
               console.log(error.response.status);
               //console.log(error.response.headers);

               if (error.response.data === 'invalid_credentials')
                  dispatch(setAppError('usuario ou senha invalidos'))

               console.log('########################');
            } else if (error.request) {
               console.log('############**------ error.request');
               // The request was made but no response was received
               // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
               // http.ClientRequest in node.js
               console.log(error.request);
               console.log('########################');
            } else {
               console.log('############**------ error.message');
               // Something happened in setting up the request that triggered an Error
               console.log('Error', error.message);
               console.log('########################');
            }

            //console.log('error.config');
            //console.log(error.config);

            if (!error.response)
               if (!error.status) {
                  console.log('network error!!!!!!!!')
                  dispatch(setAppError('Sem conexão com o servidor...'))
               }
               else
                  dispatch(setAppError(undefined))

            return Promise.reject(error);

         }
      }]
   }
};

const middleware = applyMiddleware(axiosMiddleware(
   api,
   axiosMiddlewareOptions
), logger);

const store = Reactotron.createStore(reducers, {}, compose(middleware));

export default store;