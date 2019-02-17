import React, { Component } from 'react';

import { NavigationEvents, withNavigationFocus } from "react-navigation";


import { connect } from 'react-redux';

import { View, StyleSheet, Dimensions, ScrollView, FlatList, TouchableOpacity } from 'react-native';

import { Card, CardItem, Text, Icon, Left, Right } from 'native-base';

import MapView from 'react-native-maps';

import geolib from 'geolib';

import { setCoords } from '../../store/actions/userActions';
import { getNearOrders } from '../../store/actions/orderActions';
import { addRestaurantOrder, getRestaurantOrders } from '../../store/actions/restaurantActions';


import { colors } from '../../styles';

class ResFindOrderMap extends Component {

   state = {
      initialRegion: {
         longitude: -50.7850394821465,
         latitude: -29.64676851079913
      },
      centerRegion: {
         longitude: -50.7850394821465,
         latitude: -29.64676851079913
      },
      orderRegion: undefined,
   }

   atualiza = () => {
      //alert('rerenderizando');
      this.props.getNearOrders(this.state.initialRegion);
   }

   onRegionChange = (region) => {
      console.log(region);
   }

   handleSelectOrderLocation = (order) => {
      const { latitude, longitude } = order;

      this.mapView.animateToCoordinate({
         latitude: Number.parseFloat(latitude),
         longitude: Number.parseFloat(longitude)
      }, 800);
   }

   handleSelectOrderDeliver = (order) => {
      data = {
         id: this.props.restaurant.id,
         order_id: order.id,
      }

      this.props.addRestaurantOrder(data);
      this.props.getNearOrders(this.props.coords);
   }

   render() {
      const { initialRegion } = this.state;

      const orders = this.props.orders ?
         this.props.orders : undefined;

      const initialMapRegion = this.props.coords ?
         this.props.coords :
         initialRegion;

      return (
         <View style={[styles.container, StyleSheet.absoluteFillObject]}>
            <MapView
               initialRegion={{
                  latitude: this.state.initialRegion.latitude,
                  longitude: this.state.initialRegion.longitude,
                  latitudeDelta: 0.0100,
                  longitudeDelta: 0.0100,
               }}
               style={[styles.mapView, StyleSheet.absoluteFillObject]}
               rotateEnabled={true}
               scrollEnabled={true}
               zoomEnabled={true}
               showsPointsOfInterest={false}
               showsBuildings={false}
               onRegionChangeComplete={this.onRegionChange}
               ref={myMap => this.mapView = myMap}
            >
               {
                  orders[0] != null && orders.map((item, index) => (
                     <MapView.Marker
                        key={index}
                        coordinate={{
                           latitude: Number.parseFloat(item.latitude),
                           longitude: Number.parseFloat(item.longitude),
                        }}
                     />
                  ))
               }
            </MapView>
            <ScrollView
               style={[styles.placesContainer]}
               contentContainerStyle={styles.placesContainerInner}
            >
               {
                  !orders ?
                     <View style={styles.place}>
                        <Text>Conectando..</Text>
                     </View> :
                     orders.length !== 0 ?
                        <FlatList
                           style={styles.flatlist}
                           data={orders}
                           keyExtractor={order => order.id.toString()}
                           renderItem={
                              ({ item }) => (
                                 <Card >
                                    <CardItem style={styles.listItem}>
                                       <Left style={styles.left}>
                                          <Text>{
                                             geolib.getDistance(initialMapRegion, {
                                                latitude: item.latitude,
                                                longitude: item.longitude
                                             })
                                          }m</Text>
                                          <Text>{item.foods[0].nome}</Text>
                                       </Left>
                                       <Right style={styles.right}>
                                          <TouchableOpacity
                                             onPress={() => this.handleSelectOrderLocation(item)}
                                          >
                                             <Icon
                                                type="FontAwesome"
                                                name="map-marker"
                                                style={styles.markerIcon}
                                             />
                                          </TouchableOpacity>
                                          <TouchableOpacity
                                             onPress={() => this.handleSelectOrderDeliver(item)}
                                          >
                                             <Icon
                                                type="FontAwesome"
                                                name="truck"
                                                style={styles.truckIcon}
                                             />
                                          </TouchableOpacity>
                                       </Right>
                                    </CardItem>
                                 </Card>
                              )
                           }
                        />
                        :
                        <View style={styles.place}>
                           <Text>procurando...</Text>
                        </View>
               }
               <NavigationEvents
                  onWillFocus={payload => {
                     this.atualiza();
                  }}
               />
            </ScrollView>
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
      backgroundColor: '#222',
   },
   placesContainer: {
      width: '100%',
      maxHeight: 200,
      backgroundColor: colors.vermelhoFraco,
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
   }
})

const { height, width } = Dimensions.get('window')

const mapStateToProps = state => ({
   coords: state.userReducer.coords,
   orders: state.orderReducer.orders,
   restaurant: state.restaurantReducer.restaurant,
});

const mapDispatchToProps = (dispatch) => {
   return {
      setCoords: (coords) => {
         dispatch(setCoords(coords));
      },
      getNearOrders: (coords) => {
         dispatch(getNearOrders(coords));
      },
      addRestaurantOrder: (order) => {
         dispatch(addRestaurantOrder(order));
      },
      getRestaurantOrders: (id) => {
         dispatch(getRestaurantOrders(id));
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResFindOrderMap);
