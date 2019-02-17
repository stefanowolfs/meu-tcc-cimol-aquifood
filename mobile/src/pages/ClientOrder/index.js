import React, { Component } from 'react';

import { connect } from 'react-redux';

import { FlatList, StyleSheet, Text, View } from 'react-native';

import { BaseListContainer, BaseCardSimpleText } from '../../components';

import { getFoods } from '../../store/actions/foodActions';
import { setOrder } from '../../store/actions/orderActions';


class ClientOrder extends Component {

   static navigationOptions = ({ navigation }) => ({
      title: "Escolha seu lanche",
   });

   state = {
      coords: 1,
   };

   componentDidMount = () => {
      if (this.props.order)
         this.navigateToAwait();

      this.props.getFoods(this.state.coords);
   }

   componentDidUpdate() {
      if (this.state.order)
         this.navigateToAwait();
   }

   navigateToAwait = () => {
      this.props.navigation.navigate('ClientAwait');
   }

   handleOnConfirmaPedido = async (food_id) => {
      if (this.state.coords) {
         const { user } = await this.props;

         this.props.setOrder(user.id, food_id);
         this.navigateToAwait();
      }
   }

   handleFoodPress = (food) => {
      this.props.navigation.navigate('ClientOrderModal', {
         food: food,
         onConfirmaPedido: () => this.handleOnConfirmaPedido(food.id),
      });
   }

   render() {
      const { foods, } = this.props;

      return (
         <BaseListContainer >
            <FlatList
               style={styles.container}
               data={foods}
               keyExtractor={food => food.id.toString()}
               renderItem={
                  ({ item }) => (
                     <BaseCardSimpleText
                        text={item.nome}
                        onPress={() => { this.handleFoodPress(item) }}
                     />
                  )
               }
            />
         </BaseListContainer>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignSelf: 'stretch',
      marginHorizontal: 20,
      marginVertical: 20,
   },
})

const mapStateToProps = state => ({
   foods: state.foodReducer.foods,
   order: state.orderReducer.order,
   user: state.userReducer.user,
});

const mapDispatchToProps = (dispatch) => {
   return {
      getFoods: (coords) => {
         dispatch(getFoods(coords));
      },
      setOrder: (user_id, food_id) => {
         dispatch(setOrder(user_id, food_id));
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientOrder);