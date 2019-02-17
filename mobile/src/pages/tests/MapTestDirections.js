import React, { Component } from 'react';

import { connect } from 'react-redux';

import { View, Text, StyleSheet, Dimensions } from 'react-native';

import MapView from 'react-native-maps';

import MapViewDirections from 'react-native-maps-directions';

import { setCoords } from '../../store/actions/userActions';

class MapTest extends Component {

   state = {
      initialRegion: {
         longitude: -50.7820394821465,
         latitude: -29.64876851079913
      },
      orderRegion: {
         longitude: -50.78132836148143,
         latitude: -29.646732327979397
      },
      driverRegion: {
         longitude: -50.78437803313136,
         latitude: -29.64990342882432
      }
   }

   onRegionChange = (region) => {
      console.log(region);
   }

   render() {
      const GOOGLE_MAPS_APIKEY = 'AIzaSyA7M8PSTU9LJCKMPMTr1mt-pDr-_2hMx4s'

      const { initialRegion, orderRegion, driverRegion } = this.state;

      return (
         <View style={styles.container}>
            <MapView
               initialRegion={{
                  latitude: initialRegion.latitude,
                  longitude: initialRegion.longitude,
                  latitudeDelta: 0.0050,
                  longitudeDelta: 0.0050,
               }}
               style={styles.mapView}
               rotateEnabled={true}
               scrollEnabled={true}
               zoomEnabled={true}
               showsPointsOfInterest={false}
               showsBuildings={false}
               onRegionChangeComplete={this.onRegionChange}
            >
               <MapView.Marker
                  coordinate={{
                     latitude: orderRegion.latitude,
                     longitude: orderRegion.longitude,
                  }}
               />
               <MapView.Marker
                  coordinate={{
                     latitude: driverRegion.latitude,
                     longitude: driverRegion.longitude,
                  }}
               />
               <MapViewDirections
                  origin={orderRegion}
                  destination={driverRegion}
                  apikey={GOOGLE_MAPS_APIKEY}
                  strokeWidth={3}
                  strokeColor="hotpink"
               />
            </MapView>
            <View style={styles.placesContainer}>
               <Text style={styles.place}>Container...</Text>
            </View>
         </View>
      );
   }
}

const styles = StyleSheet.create({
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
   },
   placesContainer: {
      width: '100%',
      maxHeight: 200,
   },
   place: {
      width: width - 40,
      maxHeight: 200,
      backgroundColor: '#fff',
      marginHorizontal: 20,
   },
})

const { height, width } = Dimensions.get('window')

const mapStateToProps = state => ({
   coords: state.userReducer.coords,
});

const mapDispatchToProps = (dispatch) => {
   return {
      setCoords: (coords) => {
         setCoords(setCoords(coords));
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapTest);