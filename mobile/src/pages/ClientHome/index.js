import React, { Component } from 'react';

import { connect } from 'react-redux';

import { StackActions, NavigationActions } from 'react-navigation';

import {
   setJwt
} from '../../store/actions/userActions';

import LinearGradient from 'react-native-linear-gradient';

import {
   AsyncStorage,
} from 'react-native';

import { Container, Header, Title, Button, Left, Body, Icon, Card, CardItem, Content } from 'native-base';

import {
   CustomButton,
   TextLogo,
   ContentView,
} from '../../components';

import styles from './styles';

import { colors } from '../../styles';

class ClientHome extends Component {

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

   render() {
      const { left, right } = colors.degrades.gray;

      return (
         <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[left, right]} style={styles.container}>
            <Header
               style={styles.header}
               androidStatusBarColor='#000'
            >
               <Left>
                  <Button
                     transparent
                     onPress={() => { this.props.navigation.toggleDrawer() }}
                  >
                     <Icon name='menu' />
                  </Button>
               </Left>
               <Body>
                  <Title>Bon apetit!</Title>
               </Body>
            </Header>
            <ContentView >
               <TextLogo dark />
               <CustomButton
                  text="Fazer pedido"
                  onPress={this.navigateToPedido}
               />
            </ContentView>
         </LinearGradient>
      );
   }
}

const mapStateToProps = state => ({
   jwt: state.userReducer.jwt,
   user: state.userReducer.jwt,
});

const mapDispatchToProps = (dispatch) => {
   return {
      setJwt: (jwt) => {
         dispatch(setJwt(jwt));
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientHome);