import React from 'react';

import { TouchableOpacity, StyleSheet } from 'react-native';

import { Card, CardItem, Text, Icon, Left, Right } from 'native-base';

import { colors } from '../styles';

const BaseCardSimpleText = (props) => {

   const { text } = props;

   return (
      <Card >
         <CardItem style={styles.container}>
            <Left style={styles.left}>
               <Text>{text}</Text>
            </Left>
            <Right style={styles.right}>
               <TouchableOpacity onPress={props.onPress}>
                  <Icon
                     type="FontAwesome"
                     name="check-square"
                     style={styles.icon}
                  />
               </TouchableOpacity>
            </Right>
         </CardItem>
      </Card>
   );
}

const styles = StyleSheet.create({
   container: {
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
   },
   left: {
      flex: 10,
      paddingRight: 2,
      paddingTop: 12,
      paddingBottom: 12,
      justifyContent: 'center',
   },
   right: {
      flex: 2,
      alignSelf: 'stretch',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 0
   },
   icon: {
      color: colors.cinza,
      fontSize: 30
   }
})

export default BaseCardSimpleText;

