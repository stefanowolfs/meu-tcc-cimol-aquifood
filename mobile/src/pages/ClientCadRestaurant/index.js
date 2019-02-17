import React, { Component } from 'react';

import LinearGradient from 'react-native-linear-gradient';

import { connect } from 'react-redux';

import { Container, Header, Title, Button, Left, Body, Icon, Card, CardItem, Content } from 'native-base';

import { KeyboardAvoidingView } from 'react-native';

import styles from './styles';

import { colors } from '../../styles';

import { CustomGradientView, CustomTextInput, CustomButton } from '../../components';

import { setCoords, updateUser } from '../../store/actions/userActions';
import { createRestaurant } from '../../store/actions/restaurantActions';


class ClientCadRestaurant extends Component {

   state = {
      name: '',
      email: '',
   }

   componentDidMount() {
      this.getUserLocation();
   }

   componentDidUpdate() {
      if (this.props.user)
         this.props.restaurant ?
            this.onRestauranteCadastrado() :
            console.log('não tem restaurante!!!!');
   }

   onRestauranteCadastrado = () => {
      console.log('tem restaurante');
      const { id } = this.props.user;
      this.props.updateUser({ user_id: id, conta: 'restaurante' });
      console.log('navigate reset');
      this.props.navigation.navigate('Reset');
   }

   handleEmailChange = email => {
      this.setState({ email });
   }

   handleNameChange = name => {
      this.setState({ name });
   }

   handleCadastrar = () => {
      const user_id = this.props.user.id;
      const { latitude, longitude } = this.props.coords;
      const { name, email } = this.state;

      this.props.createRestaurant({
         name, email, latitude, longitude, user_id
      });
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

   render() {
      return (
         <Container>
            <Header
               style={styles.header}
               androidStatusBarColor='#000'
            >
               <Left>
                  <Button
                     transparent
                     onPress={() => { this.props.navigation.toggleDrawer() }}
                  >
                     <Icon name='menu' />
                  </Button>
               </Left>
               <Body>
                  <Title>Traga seu negócio já!</Title>
               </Body>
            </Header>
            <CustomGradientView degrade={colors.degrades.default} style={styles.topContainer}>
               <KeyboardAvoidingView
                  contentContainerStyle={styles.formContainer}
                  behavior='height'
                  style={styles.formContainer}
               >
                  <CustomTextInput
                     placeholder="Nome da lancheria"
                     value={this.state.name}
                     onChangeText={this.handleNameChange}
                  />
                  <CustomTextInput
                     placeholder="E-mail comercial"
                     value={this.state.email}
                     onChangeText={this.handleEmailChange}
                  />

                  <CustomButton
                     text="CADASTRAR"
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
      user: state.userReducer.user,
      coords: state.userReducer.coords,
      restaurant: state.restaurantReducer.restaurant,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      setCoords: (coords) => {
         dispatch(setCoords(coords));
      },
      createRestaurant: (restaurante) => {
         dispatch(createRestaurant(restaurante));
      },
      updateUser: (user) => {
         dispatch(updateUser(user));
      },

   };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientCadRestaurant);