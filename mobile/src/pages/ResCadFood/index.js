import React, { Component } from 'react';

import { connect } from 'react-redux';

import { View, Text, KeyboardAvoidingView, TextInput } from 'react-native';

import { TextInputMask } from 'react-native-masked-text';

import {
   Container,
   Header, Title, Button, Left, Body, Icon,
} from 'native-base';

import styles from './styles';

import { colors } from '../../styles';

import {
   CustomGradientView,
   CustomTextInput,
   CustomButton,
} from '../../components';

import { createRestaurantFood, updateRestaurantFood } from '../../store/actions/restaurantActions';


class ResCadFood extends Component {
   state = {
      id: undefined,
      nome: '',
      price: 0.00,
   }

   componentDidMount = () => {
      const food = this.props.navigation.getParam('food', undefined);

      if (!!food) {
         const { id, nome, price } = food;
         this.setState({ id, nome, price });
      }

   }

   handleCadastrar = () => {
      const restaurant_id = this.props.restaurant.id;
      const { nome, price, id } = this.state;

      newFood = {
         id,
         nome,
         restaurant_id,
         price,
      }

      this.state.id ?
         this.props.updateRestaurantFood(newFood) :
         this.props.createRestaurantFood(newFood);

      this.props.navigation.goBack();
   }

   handleNomeChange = nome => {
      this.setState({ nome });
   }

   handleMoneyChange = () => {

      this.setState({ price: this.amountRef.getRawValue() })

      //console.log(this.amountRef.getElement())
      //console.log(this.amountRef.isValid())
      //console.log(this.amountRef.getRawValue())
   }

   render() {
      return (
         <Container>
            <CustomGradientView degrade={colors.degrades.default} style={styles.topContainer}>
               <KeyboardAvoidingView
                  contentContainerStyle={styles.formContainer}
                  behavior='height'
                  style={styles.formContainer}
               >
                  <CustomTextInput
                     placeholder="Nome do lanche"
                     value={this.state.nome}
                     onChangeText={this.handleNomeChange}
                  />

                  <TextInputMask
                     customTextInput={TextInput}
                     customTextInputProps={{
                        style: styles.customInput,
                     }}
                     ref={ref => this.amountRef = ref}
                     type="money"
                     value={this.state.price}
                     onChangeText={
                        this.handleMoneyChange
                     }

                  />

                  <CustomButton
                     text="CONCLUIR"
                     onPress={this.handleCadastrar}
                  />
               </KeyboardAvoidingView>
            </CustomGradientView>
         </Container>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      restaurant: state.restaurantReducer.restaurant,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      createRestaurantFood: (food) => {
         dispatch(createRestaurantFood(food));
      },
      updateRestaurantFood: (food) => {
         dispatch(updateRestaurantFood(food));
      },
   };
}

export default connect(mapStateToProps, mapDispatchToProps)(ResCadFood);