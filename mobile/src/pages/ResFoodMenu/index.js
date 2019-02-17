import React, { Component } from 'react';

import { connect } from 'react-redux';

import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

import { CustomButton, } from '../../components';

import { Card, CardItem, Text, Icon, Left, Right } from 'native-base';

import { deleteFood } from '../../store/actions/foodActions';
import { getRestaurantFoods } from '../../store/actions/restaurantActions';

import { colors } from '../../styles';

// import styles from './styles';

class ResFoodMenu extends Component {

   navigateToCadComida = () => {
      this.props.navigation.navigate('ResCadFood');
   }

   handleEditFood = (food) => {
      this.props.navigation.navigate('ResCadFood', { food });
   }

   handleDeleteFood = (id) => {
      const restaurant_id = this.props.restaurant.id;
      this.props.deleteFood(id);
      this.props.getRestaurantFoods(restaurant_id);
   }

   render() {
      const foods = this.props.foods ?
         this.props.foods :
         undefined;

      return (
         <View style={styles.container}>
            <View style={styles.viewTop}>
               {
                  !foods ?
                     <Text>Carregando</Text>
                     :
                     foods.length !== 0 ?
                        <FlatList
                           style={styles.flatlist}
                           data={foods}
                           keyExtractor={food => food.id.toString()}
                           renderItem={
                              ({ item }) => (
                                 <Card >
                                    <CardItem style={styles.listItem}>
                                       <Left style={styles.left}>
                                          <Text>{item.nome}</Text>
                                       </Left>
                                       <Right style={styles.right}>
                                          <TouchableOpacity
                                             onPress={() => this.handleEditFood(item)}
                                          >
                                             <Icon
                                                type="FontAwesome"
                                                name="edit"
                                                style={styles.iconEdit}
                                             />
                                          </TouchableOpacity>
                                          <TouchableOpacity
                                             onPress={() => this.handleDeleteFood(item.id)}
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
                        <Text>Nenhum lanche cadastrado</Text>
               }
            </View>
            <View style={styles.viewBottom}>
               <CustomButton
                  text="Adicionar Lanche"
                  onPress={this.navigateToCadComida}
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
   foods: state.restaurantReducer.foods,
});

const mapDispatchToProps = (dispatch) => {
   return {
      deleteFood: (id) => {
         dispatch(deleteFood(id));
      },
      getRestaurantFoods: (id) => {
         dispatch(getRestaurantFoods(id));
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResFoodMenu);