import React, { Component } from 'react';

import LinearGradient from 'react-native-linear-gradient';

import { connect } from 'react-redux';

import { getUser, logUser } from '../../store/actions/userActions';

import { CustomTextInput } from '../../components';

import {
   View,
   Text,
   TouchableOpacity,
   KeyboardAvoidingView,
   AsyncStorage,
} from 'react-native';

import { styles } from './styles';
import { colors } from '../../styles';

import { TextLogo, } from '../../components';

import {
   handleAndroidBackButton,
   removeAndroidBackButtonHandler
} from '../../functions/androidBackButton';

class Login extends Component {

   state = {
      email: '',
      password: '',
   }

   componentDidMount() {
      this.onRememberEmail()
      handleAndroidBackButton(() => { });
   }
   componentWillUnmount() {
      removeAndroidBackButtonHandler();
   }

   navigateToRegister = () => {
      this.props.navigation.navigate('Register');
   }

   handleLogin = () => {
      const { email, password } = this.state;

      this.props.logUser(email, password);

   }

   handleEmailChange = email => {
      this.setState({ email });
   }

   handlePasswordChange = password => {
      this.setState({ password });
   }

   onRememberEmail = async () => {
      const email = await AsyncStorage.getItem('@AquiFood:email');

      this.setState({ email });
   }

   render() {
      const { left, right } = colors.degrades.default;

      return (
         <View style={styles.container}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[left, right]} style={styles.content}>
               <View style={styles.sectionA}>
                  <KeyboardAvoidingView behavior="height" >
                     <View style={{ alignItems: 'center' }}>
                        <TextLogo />
                     </View>
                     <CustomTextInput
                        placeholder="seu email"
                        value={this.state.email}
                        onChangeText={this.handleEmailChange}
                     />
                     <CustomTextInput
                        placeholder="senha"
                        value={this.state.password}
                        onChangeText={this.handlePasswordChange}
                        secureTextEntry
                     />
                     {
                        this.props.error ?
                           <Text style={styles.error}>{this.props.error}</Text> :
                           <View></View>

                     }
                     <TouchableOpacity
                        style={styles.button}
                        onPress={this.handleLogin}
                     >
                        <Text style={styles.buttonText}>Entrar</Text>
                     </TouchableOpacity>
                  </KeyboardAvoidingView>
               </View>
               <View style={styles.sectionB}>
                  <Text style={styles.text}>Não possui conta ainda?</Text>
                  <TouchableOpacity
                     style={styles.bigTextContainer}
                     onPress={this.navigateToRegister}
                  >
                     <Text style={styles.bigText}>CADASTRE-SE</Text>
                  </TouchableOpacity>
               </View>
            </LinearGradient>
         </View>
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
      logUser: (email, password) => {
         dispatch(logUser(email, password));
      }
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);