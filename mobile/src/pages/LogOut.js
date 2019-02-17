import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';

import { View, AsyncStorage } from 'react-native';

import {
   setJwt, setUser, setDriver
} from '../store/actions/userActions';

class LogOut extends Component {

   resetApp = () => {
      const { navigate } = this.props.navigation;
      const resetAction = StackActions.reset({
         index: 0,
         actions: [
            NavigationActions.navigate({ routeName: 'Initializing' })
         ],
         key: null
      })
      this.props.navigation.dispatch(resetAction);
   }

   onHandleDeslogar = async () => {
      await AsyncStorage.removeItem('@AquiFood:jwt');
      await this.props.setJwt(undefined);
      await this.props.setUser(undefined);
      await this.props.setDriver(undefined);
      this.resetApp()
   }

   componentDidMount() {
      this.onHandleDeslogar();
   }


   render() {
      return <View />;
   }
}

const mapStateToProps = state => ({
   jwt: state.userReducer.jwt,
   user: state.userReducer.user
});

const mapDispatchToProps = (dispatch) => {
   return {
      setJwt: (jwt) => {
         dispatch(setJwt(jwt));
      },
      setUser: (user) => {
         dispatch(setUser(user));
      },
      setDriver: (driver) => {
         dispatch(setDriver(driver));
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogOut);