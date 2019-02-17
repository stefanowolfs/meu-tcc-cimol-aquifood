import React, { Component } from 'react';

import { connect } from 'react-redux';

import { StackActions, NavigationActions } from 'react-navigation';

import {
   setJwt
} from '../../store/actions/userActions';

import LinearGradient from 'react-native-linear-gradient';

import { AsyncStorage, View, Text } from 'react-native';

import { NavigationEvents } from "react-navigation";

import {
   TextLogo,
   ContentView,
} from '../../components';

import styles from './styles';

import { colors } from '../../styles';

class ResHome extends Component {

   navigateToPedido = () => {
      this.props.navigation.navigate('Pedido');
   }

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

   onHandleDeslogar = async () => {
      this.props.setJwt(undefined);

      await AsyncStorage.removeItem('@AquiFood:jwt');

      this.resetApp()
   }

   render() {
      const { left, right } = colors.degrades.midnightCity;

      return (
         this.props.user ?
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[left, right]} style={styles.container}>
               <ContentView transparent>
                  <View style={styles.logoBox}>
                     <TextLogo />
                  </View>
                  <View style={styles.infoBox}>
                     <Text style={styles.infoText}>
                        Bem vindo {this.props.user.name}, muitas pessoas na sua cidade estão esperando um lanche, começe agora suas entregas
                     </Text>
                  </View>
               </ContentView>
               <NavigationEvents
                  onWillFocus={payload => {
                     console.log("will focus", payload);
                  }}
               />
            </LinearGradient>
            :
            <Text>Carregando...</Text>
      );
   }
}

const mapStateToProps = state => ({
   jwt: state.userReducer.jwt,
   user: state.userReducer.user,
});

const mapDispatchToProps = (dispatch) => {
   return {
      setJwt: (jwt) => {
         dispatch(setJwt(jwt));
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResHome);