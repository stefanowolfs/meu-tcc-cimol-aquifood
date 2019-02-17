import React, { Component } from 'react';

import { connect } from 'react-redux';

import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

import { CustomButton, } from '../../components';

import { Card, CardItem, Text, Icon, Left, Right } from 'native-base';

import { deleteDriver } from '../../store/actions/driverActions';
import { getRestaurantDrivers } from '../../store/actions/restaurantActions';

import { colors } from '../../styles';

class ResDriverMenu extends Component {

   navigateToCadDriver = () => {
      this.props.navigation.navigate('ResCadDriverUser');
   }

   handleDeleteDriver = (id) => {
      const restaurant_id = this.props.restaurant.id;
      this.props.deleteDriver(id);
      this.props.getRestaurantDrivers(restaurant_id);
   }


   render() {
      const drivers = this.props.drivers ?
         this.props.drivers : undefined;

      return (
         <View style={styles.container}>
            <View style={styles.viewTop}>
               {
                  !drivers ?
                     <Text>Carregando</Text>
                     :
                     drivers.length !== 0 ?
                        <FlatList
                           style={styles.flatlist}
                           data={drivers}
                           keyExtractor={driver => driver.id.toString()}
                           renderItem={
                              ({ item }) => (
                                 <Card >
                                    <CardItem style={styles.listItem}>
                                       <Left style={styles.left}>
                                          <Text>{item.nome}</Text>
                                       </Left>
                                       <Right style={styles.right}>
                                          <TouchableOpacity
                                             onPress={() => this.handleDeleteDriver(item.id)}
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
                        <Text>Nenhum motorista cadastrado</Text>
               }
            </View>
            <View style={styles.viewBottom}>
               <CustomButton
                  text="Adicionar Motorista"
                  onPress={this.navigateToCadDriver}
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
   restaurant: state.restaurantReducer.restaurant,
   drivers: state.restaurantReducer.drivers,
});

const mapDispatchToProps = (dispatch) => {
   return {
      deleteDriver: (id) => {
         dispatch(deleteDriver(id));
      },
      getRestaurantDrivers: (id) => {
         dispatch(getRestaurantDrivers(id));
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResDriverMenu);