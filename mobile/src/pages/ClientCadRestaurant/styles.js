import { StyleSheet } from 'react-native';
import { colors } from '../../styles';

const styles = StyleSheet.create({
   header: {
      backgroundColor: colors.vermelhoFraco
   },
   text: {
      color: colors.branco,
      fontSize: 34,
   },
   infoText: {
      color: colors.amarelo,
      fontSize: 16,
      margin: 6,
   },
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   formContainer: {
      flex: 9,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'stretch'
   }
});

export default styles;
