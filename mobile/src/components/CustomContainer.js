import React from 'react';

import { View, StyleSheet, } from 'react-native';

import ContentView from './ContentView';

import { colors } from '../styles'

const CustomContainer = (props) =>
   <View
      style={[styles.container, props.style]}
   >
      <ContentView>
         {props.children}
      </ContentView>
   </View>;

const styles = StyleSheet.create({

   container: {
      flex: 1,
      backgroundColor: colors.branco,
      justifyContent: 'center',
      alignItems: 'stretch',
   },
});


export default CustomContainer;

