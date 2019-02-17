import { StyleSheet } from 'react-native';
import { colors } from '../../styles';

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'stretch',

   },
   logoBox: {
      flex: 2,
      justifyContent: 'flex-end',
      alignItems: 'center',
   },
   infoBox: {
      flex: 5,
      justifyContent: 'center',
      alignItems: 'center',
   },
   infoText: {
      fontSize: 18,
      color: '#ddd',
      textShadowOffset: {
         width: 0.3, height: 0.2
      },
      textShadowColor: colors.cinza,
      fontStyle: 'italic',
      textAlign: 'center',
   },

});

export default styles;
