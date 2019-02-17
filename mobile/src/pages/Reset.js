import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';

import { View } from 'react-native';

import {
   setJwt
} from '../store/actions/userActions';

class LogOut extends Component {

   resetApp = () => {
      const { navigate } = this.props.navigation
      const resetAction = StackActions.reset({
         index: 0,
         actions: [
            NavigationActions.navigate({ routeName: 'Initializing' })
         ],
         key: null
      })
      this.props.navigation.dispatch(resetAction)
   }

   onHandleResetar = async () => {
      await this.props.setJwt(undefined);

      this.resetApp();
   }

   componentDidMount() {
      this.onHandleResetar();
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
      }
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogOut);