import React from 'react';

import { View, StyleSheet, } from 'react-native';

import { colors } from '../styles'

const ContentView = (props) =>
   <View style={
      [
         styles.content, props.style, props.dark ?
            { backgroundColor: '#333', marginHorizontal: 0 } :
            props.transparent ? { backgroundColor: 'transparent' } :
               ''
      ]
   }>
      {props.children}
   </View>;


const styles = StyleSheet.create({
   content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 30,
   },
});


export default ContentView;

