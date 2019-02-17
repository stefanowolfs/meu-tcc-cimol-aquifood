import React, { Component } from 'react';

import { connect } from 'react-redux';

import { TextInputMask } from 'react-native-masked-text';

import { KeyboardAvoidingView, TextInput } from 'react-native';

import {
   Container, Picker, Item, Icon, Text
} from 'native-base';

import styles from './styles';
import { colors } from '../../styles';

import {
   CustomGradientView,
   CustomButton,
} from '../../components';

import { createRestaurantDriver } from '../../store/actions/restaurantActions';
import { setCoords, addDriverUser, updateDriverUser } from '../../store/actions/userActions';
import { updateUserToDriver } from '../../store/actions/driverActions';



class ResCadDriver extends Component {

   static navigationOptions = () => {
      return { header: null };
   }

   state = {
      veiculo: 'moto',
      cpf: '',
      restaurant_id: undefined,
   }

   componentDidMount = () => {
      this.getUserLocation();
   }

   componentDidUpdate = () => {
      if (!!this.props.driver) {
         if (!this.props.driver.conta) {

            const restaurant_id = this.props.restaurant.id;
            const user_id = this.props.driver.id;
            const nome = this.props.driver.name;
            const { latitude, longitude } = this.props.coords;
            const { veiculo, cpf } = this.state;

            newDriver = {
               nome,
               veiculo,
               cpf,
               restaurant_id,
               longitude,
               latitude,
               user_id,
            }

            this.props.updateDriverUser({ user_id: user_id, conta: 'motorista' });

            this.props.createRestaurantDriver(newDriver);

            this.props.navigation.navigate('ResDriverMenu');
         }
      }
   }

   handleCadastrar = () => {
      const userDriver = this.props.navigation.getParam('userDriver', undefined);

      const { name, email, password, password_confirmation } = userDriver

      this.props.addDriverUser(name, email, password, password_confirmation);
   }

   handleCPFChange = () => {
      this.setState({ cpf: this.amountRef.getRawValue() })
      console.log(this.state.cpf);
   }

   getUserLocation = () => {
      navigator.geolocation.getCurrentPosition(
         (position) => {
            this.props.setCoords({
               latitude: position.coords.latitude,
               longitude: position.coords.longitude,
            })
         },
         (error) => console.log(error.message),
      );
   }

   onVeiculoChange = (veiculo) => {
      this.setState({
         veiculo: veiculo
      });
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
                  <Item picker style={styles.pickerContainer}>
                     <Text style={styles.pickerText}>Veiculo:</Text>
                     <Picker
                        note
                        mode="dropdown"
                        iosIcon={<Icon name="ios-arrow-down-outline" />}
                        placeholder="Veiculo"
                        style={styles.picker}
                        selectedValue={this.state.veiculo}
                        onValueChange={this.onVeiculoChange}
                     >
                        <Picker.Item label="Moto" value="moto" />
                        <Picker.Item label="Carro" value="carro" />
                     </Picker>
                  </Item>
                  <TextInputMask
                     placeholder="CPF"
                     customTextInput={TextInput}
                     customTextInputProps={{
                        style: styles.customInput,
                     }}
                     ref={ref => this.amountRef = ref}
                     type="cpf"
                     value={this.state.cpf}
                     onChangeText={
                        this.handleCPFChange
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
      coords: state.userReducer.coords,
      driver: state.userReducer.driver,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      createRestaurantDriver: (driver) => {
         dispatch(createRestaurantDriver(driver));
      },
      setCoords: (coords) => {
         dispatch(setCoords(coords));
      },
      addDriverUser: (name, email, password, password_confirmation) => {
         dispatch(addDriverUser(name, email, password, password_confirmation));
      },
      updateDriverUser: (user) => {
         dispatch(updateDriverUser(user));
      },
      updateUserToDriver: (user) => {
         dispatch(updateUserToDriver(user));
      },
   };
}

export default connect(mapStateToProps, mapDispatchToProps)(ResCadDriver);