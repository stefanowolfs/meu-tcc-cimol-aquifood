import React, { Component } from 'react';

import { connect } from 'react-redux';

import { View, StyleSheet, Dimensions, ScrollView, FlatList, TouchableOpacity } from 'react-native';

import { Card, CardItem, Text, Icon, Left, Right } from 'native-base';

import MapView from 'react-native-maps';

import geolib from 'geolib';

import { setCoords } from '../../store/actions/userActions';
import { getNearOrders } from '../../store/actions/orderActions';
import { addRestaurantOrder } from '../../store/actions/restaurantActions';


import { colors } from '../../styles';

class MapTestLayout extends Component {

   state = {
      initialRegion: {
         longitude: -50.7850394821465,
         latitude: -29.64676851079913
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

   componentDidMount = () => {
      this.props.getNearOrders(this.state.initialRegion);
   }

   onRegionChange = (region) => {
      console.log(region);
   }

   handleSelectOrderLocation = (order) => {
      const { latitude, longitude } = order;
      alert('latitude: ' + latitude + '\nlongitude: ' + longitude);

      //animate to coords...
   }

   handleSelectOrderDeliver = (order) => {
      order_id = order.id;
      //restaurant_id = this.props.restaurant.id;
      ;
      data = {
         id: 2,
         order_id: order.id,
      }

      this.props.addRestaurantOrder(data);

      /*
      fazer tela de pedidos existentes do restaurante igual ao menu de gerenciamento dos drivers e foods

      mostrar lista de orders do restaurante na tela dos motoristas 

      iniciar rota quando motorista clicar

      implementar mapas
      
       */




   }

   render() {
      const { initialRegion, orderRegion, driverRegion } = this.state;

      const orders = this.props.orders ?
         this.props.orders : undefined;

      return (
         <View style={styles.container}>
            <View style={styles.mapView}>
            </View>
            <ScrollView
               style={styles.placesContainer}
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
                                             geolib.getDistance(initialRegion, {
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
                           <Text>Nenhum pedido encontrado</Text>
                        </View>
               }
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
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapTestLayout);