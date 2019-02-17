import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Loading } from '../components';

import { View, StyleSheet, AsyncStorage, Text } from 'react-native';

import { setJwt, getUser, setCoords } from '../store/actions/userActions';

class Initializing extends Component {

   async componentDidMount() {

      this.getUserLocation();

      const jwt = await AsyncStorage.getItem('@AquiFood:jwt');

      this.isUserTokenSet(jwt);
      this.temUser();
   }

   getUserLocation = () => {
      navigator.geolocation.getCurrentPosition(
         (position) => {
            this.props.setCoords({
               latitude: position.coords.latitude,
               longitude: position.coords.longitude,
            })
         },
         (error) => console.log(error.message),
      );
   }

   isUserTokenSet = (jwt) => {
      if (!!jwt) {
         this.props.setJwt(jwt);
      } else {
         this.navigateToLogin();
      }
   }

   componentDidUpdate() {
      console.log('componentDidUpdate')
      this.temUser();
   }

   temUser = () => {
      if (this.props.jwt) {
         this.props.user ? this.seTiverUsuario()
            : this.props.getUser();

      } else {
         if (!this.props.user)
            this.navigateToLogin();
      }
   }

   seTiverUsuario = () => {
      const { navigate } = this.props.navigation;
      this.props.user.conta === 'cliente' ?
         navigate('ClientNavigator') :
         this.props.user.conta === 'restaurante' ?
            navigate('ResHome') :
            this.props.user.conta === 'motorista' ?
               navigate('DriverHome') :
               <Text>carregando</Text>;
   }



   navigateToLogin = () => {
      this.props.navigation.navigate('Login');
   }

   render() {
      return (
         <View style={styles.container}>
            <Loading />
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: '#fff'
   }
});

const mapStateToProps = state => ({
   jwt: state.userReducer.jwt,
   user: state.userReducer.user,
   restaurant: state.restaurantReducer.restaurant,
   order: state.orderReducer.order,
   driver: state.driverReducer.driver,
});

const mapDispatchToProps = (dispatch) => {
   return {
      setJwt: (jwt) => {
         dispatch(setJwt(jwt));
      },
      getUser: () => {
         dispatch(getUser());
      },
      setCoords: (coords) => {
         dispatch(setCoords(coords));
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Initializing);