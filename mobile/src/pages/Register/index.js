import React, { Component, Fragment } from 'react';

import LinearGradient from 'react-native-linear-gradient';

import { connect } from 'react-redux';

import { getUser, addUser } from '../../store/actions/userActions';

import { CustomTextInput } from '../../components';

import {
   View,
   Text,
   TouchableOpacity,
   KeyboardAvoidingView,
} from 'react-native';

import { styles } from './styles';
import { colors } from '../../styles';

import { TextLogo, } from '../../components';

import {
   handleAndroidBackButton,
   removeAndroidBackButtonHandler
} from '../../functions/androidBackButton';

class Register extends Component {

   state = {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
   }

   componentDidMount() {
      handleAndroidBackButton(() => { });
   }
   componentWillUnmount() {
      removeAndroidBackButtonHandler();
   }

   navigateToLogin = () => {
      this.props.navigation.navigate('Login');
   }

   handleSignUp = () => {
      const { name, email, password, password_confirmation } = this.state;

      this.props.addUser(name, email, password, password_confirmation);
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

   render() {
      const { left, right } = colors.degrades.default;

      return (
         <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[left, right]} style={styles.content}>
            <View style={styles.sectionA}>


               <View style={styles.innerSectionA}>

                  <View style={{ alignItems: 'center' }}>
                     <TextLogo />
                  </View>
                  <KeyboardAvoidingView behavior="height" style={styles.container}>
                     <CustomTextInput
                        placeholder="Coloque seu nome"
                        value={this.state.name}
                        onChangeText={this.handleNameChange}
                     />
                     <CustomTextInput
                        placeholder="Coloque seu email"
                        value={this.state.email}
                        onChangeText={this.handleEmailChange}
                     />
                     <CustomTextInput
                        placeholder="Senha de usuário"
                        value={this.state.password}
                        onChangeText={this.handlePasswordChange}
                        secureTextEntry
                     />
                     <CustomTextInput
                        placeholder="Confirme a senha"
                        value={this.state.password_confirmation}
                        onChangeText={this.handleConfirmPasswordChange}
                        secureTextEntry
                     />
                  </KeyboardAvoidingView>

                  <TouchableOpacity
                     style={styles.button}
                     onPress={this.handleSignUp}
                  >
                     <Text style={styles.buttonText}>Entrar</Text>
                  </TouchableOpacity>
               </View>

            </View>
            <View style={styles.sectionB}>
               <Text style={styles.text}>Já possui uma conta?</Text>
               <TouchableOpacity
                  style={styles.bigTextContainer}
                  onPress={this.navigateToLogin}
               >
                  <Text style={styles.bigText}>LOGUE-SE</Text>
               </TouchableOpacity>
            </View>
         </LinearGradient >

      );
   }
}

const mapStateToProps = (state) => {
   return {
      user: state.userReducer.user,
      error: state.appReducer.error,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      getUser: (id) => {
         dispatch(getUser(id));
      },
      addUser: (name, email, password, password_confirmation) => {
         dispatch(addUser(name, email, password, password_confirmation));
      }
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);