import React from 'react';

import { View, StyleSheet } from 'react-native';

import { colors } from '../styles';
import { Text, Spinner } from 'native-base';
import TextLogo from './TextLogo'

const Loading = () => (
   <View style={styles.container}>
      <TextLogo dark />
      <Spinner color='red' />
   </View>

);

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: "stretch"
   },
   text: {
      fontSize: 25,
      color: colors.amarelo
   },
});

export default Loading;

