import React, { Component } from 'react';

import { connect } from 'react-redux';

import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

import { CustomButton, } from '../../components';

import { Card, CardItem, Text, Icon, Left, Right } from 'native-base';

import {
   getRestaurantOrders,
   removeRestaurantOrder
} from '../../store/actions/restaurantActions';

import {
   getNearOrders
} from '../../store/actions/orderActions';

import { colors } from '../../styles';

import { NavigationEvents } from "react-navigation";


class ResOrderMenu extends Component {

   reRenderiza = () => {
      this.forceUpdate()
   }

   navigateToFindOrderMap = () => {
      this.props.navigation.navigate('Buscar Clientes');
   }

   handleDeleteOrder = (id) => {
      const restaurant_id = this.props.restaurant.id;
      const { coords } = this.props;

      this.props.removeRestaurantOrder(restaurant_id, id);
      this.props.getNearOrders(coords);
      this.forceUpdate();
   }

   render() {
      const orders = this.props.orders ?
         this.props.orders : undefined;

      return (
         <View style={styles.container}>
            <NavigationEvents
               onWillFocus={payload => {
                  this.reRenderiza();
               }}
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
                                             onPress={() => this.handleDeleteOrder(item.id)}
                                          >
                                             <Icon
                                                type="FontAwesome"
                                                name="trash"
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
            <View style={styles.viewBottom}>
               <CustomButton
                  text="Encontrar Pedidos"
                  onPress={this.navigateToFindOrderMap}
               />
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
      color: colors.vermelho,
      fontSize: 30,
      marginLeft: 20,
   }
})

const mapStateToProps = state => ({
   orders: state.restaurantReducer.orders,
   restaurant: state.restaurantReducer.restaurant,
   coords: state.userReducer.coords,
});

const mapDispatchToProps = (dispatch) => {
   return {
      getRestaurantOrders: (restaurant_id) => {
         dispatch(getRestaurantOrders(restaurant_id));
      },
      removeRestaurantOrder: (id, order_id) => {
         dispatch(removeRestaurantOrder(id, order_id));
      },
      getNearOrders: (coords) => {
         dispatch(getNearOrders(coords));
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResOrderMenu);
