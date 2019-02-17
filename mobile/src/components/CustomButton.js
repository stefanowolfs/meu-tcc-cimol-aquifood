import React from 'react';

import { TouchableOpacity, StyleSheet, Text } from 'react-native';

import { Button } from 'native-base';

import { colors } from '../styles'

const CustomButton = (props) => {

   const dark = props.dark ? true : false;

   const customStyle = props.style ? props.style : {};

   return <Button
      block
      onPress={props.onPress}
      style={

         [dark ? styles.buttonDark : styles.button, customStyle]
      }
   >
      <Text style={styles.text}> {props.text} </Text>
   </Button>;
}


const styles = StyleSheet.create({
   button: {
      paddingHorizontal: 20,
      marginHorizontal: 20,
      marginVertical: 12,
      backgroundColor: colors.vermelhoFraco,
   },
   buttonDark: {
      paddingHorizontal: 20,
      marginHorizontal: 20,
      marginVertical: 12,
      backgroundColor: colors.marrom,
   },
   text: {
      fontSize: 20,
      color: colors.branco,
   }
});


export default CustomButton;

