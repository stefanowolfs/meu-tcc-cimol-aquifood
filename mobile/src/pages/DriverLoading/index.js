import React, { Component } from 'react';

import { connect } from 'react-redux';

import { NavigationEvents } from 'react-navigation';

import { Loading } from '../../components';

import { View, StyleSheet, } from 'react-native';

import { setCoords } from '../../store/actions/userActions';

class DriverLoading extends Component {

   atualiza = () => {
      const { navigate } = this.props.navigation;

      this.props.order ?
         navigate('DriverDeliverMap') :
         navigate('DriverMenuOrder');
   }

   render() {
      return (
         <View style={styles.container}>
            <NavigationEvents
               onWillFocus={payload => this.atualiza()}
            />
            <Loading />
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: '#fff'
   }
});

const mapStateToProps = state => ({
   driver: state.userReducer.driver,
   order: state.driverReducer.order,
});

const mapDispatchToProps = (dispatch) => {
   return {
      setCoords: (coords) => {
         dispatch(setCoords(coords));
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(DriverLoading);