import { StyleSheet, Dimensions } from 'react-native';

import { colors } from '../../styles';

const { height, width } = Dimensions.get('window')

export const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
   },
   mapView: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      backgroundColor: '#222',
   },
   fakeMapView: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#222',
      paddingVertical: 20,
   },
   placesContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      maxHeight: 150,
      backgroundColor: colors.branco,
      minHeight: 100,
   },
   placesContainerInner: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 8,
   },
   place: {
      width: width - 40,
      maxHeight: 200,
      backgroundColor: '#fff',
      marginHorizontal: 20,
      marginVertical: 12,
      height: 60,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'stretch',
   }, flatlist: {
      flex: 1,
      alignSelf: 'stretch',
      marginHorizontal: 20,
      marginVertical: 20,
   },
   listItem: {
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
      flex: 5,
      flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'space-around',
      alignItems: 'center',
      margin: 0,
      paddingHorizontal: 20,
   },
   markerIcon: {
      color: '#E0CA3C',
      fontSize: 30,
      marginLeft: 20,
   },
   truckIcon: {
      color: '#138A36',
      fontSize: 30,
      marginLeft: 20,
   },
   text: {
      color: '#fff',
      marginVertical: 8,
   }
});