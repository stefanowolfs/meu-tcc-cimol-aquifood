import React, { Component } from 'react';

import MapView from 'react-native-maps';

import { connect } from 'react-redux';

import { View, Text, StyleSheet } from 'react-native';

import { getOrderDriver, getDriver } from '../../store/actions/driverActions';

class ClientDeliverMap extends Component {

   state = {
      latitude: '-29.80',
      longitude: '50.75',
      error: null,
      coords: [],
      x: 'false',
      cordLatitude: "-29.80",
      cordLongitude: "50.75",
   }

   componentDidMount() {
      this.loadUserLocation();
      this.props.getOrderDriver(this.props.order.id);
      navigator.geolocation.getCurrentPosition(
         (position) => {
            console.log("wokeeey");
            console.log(position);
            this.setState({
               latitude: position.coords.latitude,
               longitude: position.coords.longitude,
               error: null,
            });
         },
         (error) => this.setState({ error: error.message }),
         { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
      );
   }

   componentDidUpdate = async () => {
      if (this.props.driver) {
         const { driver } = this.props;

         await setTimeout(() => {
            this.updateDriver(driver.id);
         }, 8000);
      }
   }

   async getDirections(startLoc, destinationLoc) {

      try {
         let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}`)
         let respJson = await resp.json();
         let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
         let coords = points.map((point, index) => {
            return {
               latitude: point[0],
               longitude: point[1]
            }
         })
         this.setState({ coords: coords })
         return coords
      } catch (error) {
         alert(error)
         return error
      }
   }

   mergeLot() {
      if (this.state.latitude != null && this.state.longitude != null) {
         let concatLot = this.state.latitude + "," + this.state.longitude
         this.setState({
            concat: concatLot
         }, () => {
            this.getDirections(concatLot, "-6.270565,106.759550");
         });
      }

   }

   // ! implementar este metodo
   loadUserLocation = async () => {
      await navigator.geolocation.getCurrentPosition(position => {
         this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
         });

      }, error => console.log(error));
   }

   updateDriver = (id) => {
      this.props.getDriver(id)
   }

   render() {

      const { latitude, longitude } = this.state;

      return (
         <MapView
            initialRegion={{
               latitude: -29.80,
               longitude: 50.75,
               latitudeDelta: 0.0922,
               longitudeDelta: 0.0421,
            }}
            style={styles.mapView}

         >
            {!!this.state.latitude && !!this.state.longitude && this.state.x == 'true' &&
               <MapView.Polyline
                  coordinates={this.state.coords}
                  strokeWidth={2}
                  strokeColor="red"
               />
            }
            {!!this.state.latitude && !!this.state.longitude && this.state.x == 'error' &&
               <MapView.Polyline
                  coordinates={[
                     { latitude: this.state.latitude, longitude: this.state.longitude },
                  ]}
                  strokeWidth={2}
                  strokeColor="red"
               />
            }
         </MapView>
      );
   }
}

const mapStateToProps = state => ({
   order: state.orderReducer.order,
   user: state.userReducer.user,
   driver: state.driverReducer.driver,
});

const mapDispatchToProps = (dispatch) => {
   return {
      getOrderDriver: (order_id) => {
         dispatch(getOrderDriver(order_id));
      },
      getDriver: (id) => {
         dispatch(getDriver(id));
      },
   };
};

const styles = StyleSheet.create({
   mapView: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
   },
})

export default connect(mapStateToProps, mapDispatchToProps)(ClientDeliverMap);