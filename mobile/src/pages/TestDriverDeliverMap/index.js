import React, { Component } from 'react';

import MapViewDirections from 'react-native-maps-directions';

import { connect } from 'react-redux';

import { Dimensions, View, Text } from 'react-native';

import MapView from 'react-native-maps';

import geolib from 'geolib';

//driver set coords...

import { getDriver, getDriverOrder } from '../../store/actions/driverActions';


import { styles } from './styles';

import { CustomButton } from '../../components';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.771707;
const LONGITUDE = -122.4053769;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class DriverDeliverMap extends Component {

   state = {
      initialRegion: {
         longitude: -50.7850394821465,
         latitude: -29.64676851079913
      },
      orderRegion: {
         longitude: -50.78132836148143,
         latitude: -29.646732327979397
      },
      driverRegion: {
         longitude: -50.78437803313136,
         latitude: -29.64990342882432
      },
      centerRegion: undefined,
      distance: 1000,
      coords: undefined,
   }

   navigateToFinishDelivery = () => {
      this.props.navigation.navigate('DriverFinishDelivery');
   }

   /**
    * AO MONTAR COMPONENTE
    * 
    * descobre região central entre 2 coordenadas
    */
   componentDidMount = () => {
      this.getCenterRegion();
      this.isDeliveryFinished();
   }

   componentDidUpdate = async () => {
      if (this.props.driver) {

         await setTimeout(() => {
            if (this.props.order) {
               this.isDeliveryFinished();
            }
         }, 20000);
      }
   }

   isDeliveryFinished = () => {
      const { id } = this.props.driver;

      if (this.props.order) {
         if (this.props.order.status !== 'entregando') {
            if (this.props.order.status === 'finalizando')
               this.navigateToDeliveryMap();
         } else {
            this.props.getDriverOrder(id);
         }
      }
   }

   /**
    * Atualiza as coordenadas do motorista
    */
   updateCoords = (id) => {
      this.props.getDriver(id);
   }

   /**
    * Cancela pedido
    */
   onHandleCancelar = () => {
      alert('cancelar');
   }

   /**
    * Seta o state região central com as coordenadas 
    * centrais entre pedido e entregador
    */
   getCenterRegion = () => {
      const { orderRegion, driverRegion, } = this.state;
      const floatCenterRegion =
      {
         latitude: Number.parseFloat(
            geolib.getCenter([
               orderRegion,
               driverRegion
            ]).latitude
         ),
         longitude: Number.parseFloat(
            geolib.getCenter([
               orderRegion,
               driverRegion
            ]).longitude
         )
      };

      this.setState({
         centerRegion: floatCenterRegion,
      });
   }

   /**
    * Retorna a coordenada central entre pedido e entregador
    */
   onCenterRegionSet = () => {
      const GOOGLE_MAPS_APIKEY = 'AIzaSyA7M8PSTU9LJCKMPMTr1mt-pDr-_2hMx4s'
      const { orderRegion, driverRegion, centerRegion } = this.state;

      const { coords, order } = this.props;




      if (coords)
         if (order) {

            return (
               <MapView
                  initialRegion={{
                     latitude: centerRegion.latitude,
                     longitude: centerRegion.longitude,
                     latitudeDelta: 0.0100,
                     longitudeDelta: 0.0100,
                  }}
                  style={styles.mapView}
                  rotateEnabled={true}
                  scrollEnabled={true}
                  zoomEnabled={true}
                  showsPointsOfInterest={false}
                  showsBuildings={false}
                  onRegionChangeComplete={this.onRegionChange}
                  ref={myMap => this.mapView = myMap}
               >
                  <MapView.Marker
                     coordinate={{
                        latitude: order.latitude,
                        longitude: order.longitude,
                     }}
                  />
                  <MapView.Marker
                     coordinate={{
                        latitude: coords.latitude,
                        longitude: coords.longitude,
                     }}
                  />
                  <MapViewDirections
                     origin={{
                        latitude: coords.latitude,
                        longitude: coords.longitude,
                     }}
                     destination={{
                        latitude: order.latitude,
                        longitude: order.longitude,
                     }}
                     apikey={GOOGLE_MAPS_APIKEY}
                     strokeWidth={3}
                     strokeColor="hotpink"
                     onReady={(result) => {
                        this.mapView.fitToCoordinates(result.coordinates, {
                           edgePadding: {
                              right: (width / 20),
                              bottom: (height / 20),
                              left: (width / 20),
                              top: (height / 20),
                           }
                        });

                        this.setState({
                           duration: result.duration,
                           distance: (result.distance * 1000),
                        })
                     }}
                  />

               </MapView>
            );



            /*
            return (
               <View style={styles.fakeMapView}>
                  <Text style={styles.text}>Imagine um Mapa aqui</Text>
                  <Text style={styles.text}>ORDER[{
                     `latitude: ${order.latitude}, longitude: ${order.longitude}`
                  }]</Text>
                  <Text style={styles.text}>DRIVER[{
                     `latitude: ${coords.latitude}, longitude: ${coords.longitude}`
                  }]</Text>
               </View>

            )

            */
         } else {
            return <Text>Carregando</Text>;
         } else {
         return <Text>Carregando</Text>;
      }
   }

   /**
    * Muda status do pedido para finalizando
    * e navega até a tela de pagamento
    */
   onDeliveryEnd = () => {
      // set order to payment
      // navigate to payment screen
   }

   render() {
      const { centerRegion, distance, duration } = this.state;
      return (
         <View style={styles.container}>
            {
               centerRegion ? this.onCenterRegionSet() :
                  <Text style={styles.text}>Carregando coordenadas...</Text>
            }
            <View
               style={styles.placesContainer}
               contentContainerStyle={styles.placesContainerInner}
            >
               <CustomButton text="CANCELAR" onPress={this.onHandleCancelar} />
               <Text>Distância: {distance}metros</Text>
               <Text>Tempo Estimado: {duration}min</Text>

            </View>
         </View>
      );
   }
}

const mapStateToProps = state => ({
   order: state.driverReducer.order,
   coords: {
      latitude: state.driverReducer.driver.latitude,
      longitude: state.driverReducer.driver.longitude
   },
   driver: state.driverReducer.driver,
});

const mapDispatchToProps = (dispatch) => {
   return {
      getDriverOrder: (id) => {
         dispatch(getDriverOrder(id));
      },
      getDriver: (id) => {
         dispatch(getDriver(id));
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(DriverDeliverMap);