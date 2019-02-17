import React, { Component } from 'react';

import MapView from 'react-native-maps';

import { connect } from 'react-redux';

import { StyleSheet } from 'react-native';

import { getOrderDriver, getDriver } from '../../actions/driverActions';

class ClientDeliverMap extends Component {

   state = {
      latitude: 0,
      longitude: 0,
   }

   componentDidMount() {
      this.props.getOrderDriver(this.props.order.id)
      this.loadUserLocation();
   }

   componentDidUpdate = async () => {
      if (this.props.driver) {
         const { driver } = this.props;

         await setTimeout(() => {
            this.updateDriver(driver.id);
         }, 8000);
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
      this.props.getDriver(id);
   }

   render() {

      const { latitude, longitude } = this.state;

      return (
         <MapView
            initialRegion={{
               latitude: latitude,
               longitude: longitude,
               latitudeDelta: 0.0922,
               longitudeDelta: 0.0421,
            }}
            style={styles.mapView}
            rotateEnabled={false}
            scrollEnabled={false}
            zoomEnabled={false}
            showsPointsOfInterest={false}
            showsBuildings={false}
         />
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