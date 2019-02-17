import React from 'react';

import { View, Text, StyleSheet } from 'react-native';

import { colors } from '../styles';

const Loading = (props) => (
   <View>
      <View style={styles.logoContainer}>
         <Text
            style={props.dark ? styles.textoAquiDark : styles.textoAqui}
         >aqui</Text>
         <Text style={styles.textoFood} >food</Text>
      </View>
   </View>
);

const styles = StyleSheet.create({
   logoContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      marginBottom: 20
   },
   textoAqui: {
      fontSize: 40,
      color: colors.branco
   },
   textoAquiDark: {
      fontSize: 40,
      color: colors.marrom
   },
   textoFood: {
      fontSize: 40,
      color: colors.amarelo
   },
});

export default Loading;

