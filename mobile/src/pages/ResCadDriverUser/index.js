import React, { Component } from 'react';

import { connect } from 'react-redux';

import { KeyboardAvoidingView, } from 'react-native';

import {
   Container,
} from 'native-base';

import styles from './styles';
import { colors } from '../../styles';

import {
   CustomGradientView,
   CustomTextInput,
   CustomButton,
} from '../../components';

import { setCoords, } from '../../store/actions/userActions';


class ResCadDriverUser extends Component {

   static navigationOptions = () => {
      return { header: null };
   }

   state = {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
   }

   componentDidMount = () => {
      this.getUserLocation();
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

   handleNameChange = name => {
      this.setState({ name });
   }

   handleEmailChange = email => {
      this.setState({ email });
   }

   handlePasswordChange = password => {
      this.setState({ password });
   }

   handleConfirmPasswordChange = password_confirmation => {
      this.setState({ password_confirmation });
   }

   handleCadDriver = () => {

      const { name, email, password, password_confirmation } = this.state;

      const userDriver = {
         name, email, password, password_confirmation,
      }

      this.props.navigation.navigate('ResCadDriver', { userDriver });
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
                     placeholder="Nome do Motorista"
                     value={this.state.name}
                     onChangeText={this.handleNameChange}
                  />
                  <CustomTextInput
                     placeholder="Email do Motorista"
                     value={this.state.email}
                     onChangeText={this.handleEmailChange}
                  />
                  <CustomTextInput
                     placeholder="Senha do Motorista"
                     value={this.state.password}
                     onChangeText={this.handlePasswordChange}
                  />
                  <CustomTextInput
                     placeholder="Repita a senha"
                     value={this.state.password_confirmation}
                     onChangeText={this.handleConfirmPasswordChange}
                  />
                  <CustomButton
                     text="AVANÇAR"
                     onPress={this.handleCadDriver}
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
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      setCoords: (coords) => {
         dispatch(setCoords(coords));
      },
   };
}

export default connect(mapStateToProps, mapDispatchToProps)(ResCadDriverUser);