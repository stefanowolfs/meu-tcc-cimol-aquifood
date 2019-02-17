import React, { Component } from 'react';

import { connect } from 'react-redux';

import { NavigationEvents } from 'react-navigation';

import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

import { Card, CardItem, Text, Icon, Left, Right } from 'native-base';

import {
   getRestaurantOrders,
} from '../../store/actions/restaurantActions';

import {
   addDriverOrder,
   getDriverOrder,
} from '../../store/actions/driverActions';

import { colors } from '../../styles';

class DriverMenuOrder extends Component {

   atualiza = () => {
      this.onHaveOrder();
      const { navigate } = this.props.navigation;

      this.props.getDriverOrder(this.props.driver.id);
      this.props.order ?
         navigate('DriverDeliverMap') :
         this.props.getRestaurantOrders(this.props.driver.restaurant_id);
   }

   componentDidUpdate = () => {
      this.onHaveOrder();
   }

   onHaveOrder = () => {
      const { navigate } = this.props.navigation;

      if (this.props.order)
         navigate('DriverDeliverMap');
   }

   handleDeliverOrder = (id) => {
      this.props.addDriverOrder({
         order_id: id,
         id: this.props.driver.id,
      });
      const { navigate } = this.props.navigation;
      navigate('DriverDeliverMap');
   }

   render() {
      const orders = this.props.orders ?
         this.props.orders : undefined;

      return (
         <View style={styles.container}>
            <NavigationEvents
               onWillFocus={payload => this.atualiza()}
            />
            <View style={styles.viewTop}>
               {
                  !orders ?
                     <Text>Carregando</Text>
                     :
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
                                          <Text>{item.id}</Text>
                                       </Left>
                                       <Right style={styles.right}>
                                          <TouchableOpacity
                                             onPress={() => this.handleDeliverOrder(item.id)}
                                          >
                                             <Icon
                                                type="FontAwesome"
                                                name="truck"
                                                style={styles.iconDelete}
                                             />
                                          </TouchableOpacity>
                                       </Right>
                                    </CardItem>
                                 </Card>
                              )
                           }
                        />
                        :
                        <Text>Nenhum pedido cadastrado</Text>
               }
            </View>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
   },
   viewTop: {
      flex: 10,
      justifyContent: 'flex-start',
      alignItems: 'center',
   },
   viewBottom: {
      flex: 2,
      backgroundColor: '#c0c0c0',
   },
   flatlist: {
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
   iconEdit: {
      color: colors.amarelo,
      fontSize: 30,
      marginLeft: 20,
   },
   iconDelete: {
      color: '#138A36',
      fontSize: 30,
      marginLeft: 20,
   }
})

const mapStateToProps = state => ({
   orders: state.restaurantReducer.orders,
   driver: state.driverReducer.driver,
   coords: state.userReducer.coords,
   order: state.driverReducer.order,
});

const mapDispatchToProps = (dispatch) => {
   return {
      getRestaurantOrders: (restaurant_id) => {
         dispatch(getRestaurantOrders(restaurant_id));
      },
      addDriverOrder: (data) => {
         dispatch(addDriverOrder(data));
      },
      getDriverOrder: (id) => {
         dispatch(getDriverOrder(id));
      },
   };
}

export default connect(mapStateToProps, mapDispatchToProps)(DriverMenuOrder);
