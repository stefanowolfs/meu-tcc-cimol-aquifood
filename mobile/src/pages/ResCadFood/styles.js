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
   },
   customInput: {
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

export default styles;
