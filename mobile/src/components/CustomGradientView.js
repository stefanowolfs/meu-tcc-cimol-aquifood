import React from 'react';

import LinearGradient from 'react-native-linear-gradient';

import { View, StyleSheet, } from 'react-native';

import ContentView from './ContentView';

import { colors } from '../styles'

const CustomGradientView = (props) =>
   <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={[props.degrade.left, props.degrade.right]}
      style={[styles.container, props.style]}
   >
      <ContentView>
         {props.children}
      </ContentView>
   </LinearGradient>;

const styles = StyleSheet.create({

   container: {
      flex: 1,
      backgroundColor: colors.branco,
      justifyContent: 'center',
      alignItems: 'stretch',
   },
});


export default CustomGradientView;

