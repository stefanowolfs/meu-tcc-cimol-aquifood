import { StyleSheet } from 'react-native';

import { colors } from '../../styles';

const styles = StyleSheet.create({

   container: {
      flex: 1,
      backgroundColor: colors.branco
   },

   content: {
      flex: 1,
      justifyContent: "center",
      alignItems: "stretch",
      padding: 30,
   },

   sectionA: {
      flex: 3,
      justifyContent: 'flex-end',
   },

   sectionB: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-end',
   },

   bigTextContainer: {
      marginLeft: 10,
   },

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

   button: {
      height: 44,
      alignSelf: "stretch",
      marginTop: 20,
      backgroundColor: colors.marrom,
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center",
      padding: 25,
   },

   buttonText: {
      color: colors.amarelo,
      fontSize: 23,
      fontWeight: "bold",
   },

   text: {
      color: colors.branco,
      marginBottom: 2,
   },

   bigText: {
      color: colors.amarelo,
      fontSize: 18,
   },
   error: {
      color: '#fff',
      alignSelf: 'center',
      fontSize: 12,
   }
});

export { styles };