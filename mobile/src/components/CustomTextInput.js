
import React from 'react';

import {
   StyleSheet
} from 'react-native';

import { TextInput, } from 'react-native';

import { colors } from '../styles';

const CustomTextInput = (props) => {
   const isPassword = props.secureTextEntry ? true : false;
   return (
      <TextInput
         style={styles.input}
         placeholder={props.placeholder}
         value={props.value}
         onChangeText={props.onChangeText}
         returnKeyType="next"
         onSubmitEditing={() => { }}
         autoCapitalize="none"
         autoCorrect={false}
         secureTextEntry={isPassword}
      />
   );
}

const styles = StyleSheet.create({

   input: {
      borderWidth: 1,
      borderColor: colors.bege,
      backgroundColor: colors.bege,
      borderRadius: 5,
      height: 44,
      paddingHorizontal: 15,
      alignSelf: "stretch",
      marginTop: 20,
      fontSize: 16,
      paddingHorizontal: 22,
   },

});

export default CustomTextInput;
