import { StyleSheet } from 'react-native';
import { colors } from '../../styles';

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'stretch',

   },
   text: {
      color: colors.amarelo,
      fontSize: 34,
   },
   topMenu: {
      backgroundColor: '#AA5F5F',
      flexShrink: 1,
      justifyContent: 'center',
      alignItems: 'center'
   },
   topSubMenu: {
      alignSelf: 'stretch',
      flexDirection: 'row',
   },
   menu: {
      flexShrink: 1,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
   },
   menuIcon: {
      fontSize: 40,
      color: '#eaeaea',
      margin: 8,
   },
   header: {
      backgroundColor: colors.vermelhoFraco
   },
});

export default styles;
