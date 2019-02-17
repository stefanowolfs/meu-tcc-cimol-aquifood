import React, { Component } from 'react';

import { StackActions, NavigationActions } from 'react-navigation';

import LinearGradient from 'react-native-linear-gradient';

import {
   CustomButton,
   ContentView,
} from '../../components';

import styles from './styles';

import { colors } from '../../styles';

export default class ResConfigurations extends Component {
   static navigationOptions = ({ navigation, navigationOptions, screenProps }) => {
      return {
         header: null
      };
   }

   navigateToCadFood = () => {
      this.props.navigation.navigate('ResFoodMenu');
   }

   navigateToCadDriver = () => {
      this.props.navigation.navigate('ResDriverMenu');
   }

   handlelogOut = () => {
      /*
      this.props.navigation.dispatch(
         {
            type: 'Navigation/NAVIGATE',
            routeName: 'RootNavigator',
            action: {
               type: 'Navigation/NAVIGATE',
               routeName: 'LogOut',
            }
         }
      );
      */
      const { navigate } = this.props.navigation
      const resetAction = StackActions.reset({
         index: 0,
         actions: [
            NavigationActions.navigate({ routeName: 'LogOut' })
         ],
         key: null
      })
      this.props.navigation.dispatch(resetAction)
   }

   render() {
      const { left, right } = colors.degrades.midnightCity;

      return (
         <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[left, right]} style={styles.container}>
            <ContentView transparent>
               <CustomButton
                  text="Gerenciar Lanches"
                  onPress={this.navigateToCadFood}
               />
               <CustomButton
                  text="Gerenciar Entregadores"
                  onPress={this.navigateToCadDriver}
               />
               <CustomButton
                  text="Sair"
                  onPress={this.handlelogOut}
               />
            </ContentView>
         </LinearGradient>
      );
   }
}
