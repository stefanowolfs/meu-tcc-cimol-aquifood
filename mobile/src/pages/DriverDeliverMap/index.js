
//atualizar rota a cada 20 segundos

//criar tela finish deliver

//menos de 100m navigate to DriverFinishDeliver

//fazer o mesmo no cliente (reutilizar componentes??)

import React, { Component } from 'react';

import MapViewDirections from 'react-native-maps-directions';

import { connect } from 'react-redux';

import { Dimensions, View, Text } from 'react-native';

import MapView from 'react-native-maps';

import geolib from 'geolib';

import { setCoords, } from '../../store/actions/userActions';

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
      distance: 0,
   }

   /**
    * AO MONTAR COMPONENTE
    * 
    * descobre região central entre 2 coordenadas
    */
   componentDidMount = () => {
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
      }

      this.setState({
         centerRegion: floatCenterRegion,
      });
   }

   /**
    * Executa metodo que atualiza as 
    * coordenadas do motorista cada 8s
    */
   componentDidUpdate = async () => {
      const { order } = this.props;

      await setTimeout(() => {
         if (order) {
            if (order.status === 'entregando')
               this.updateCoords();
         }
      }, 8000);
   }

   /**
    * Atualiza as coordenadas do motorista
    */
   updateCoords = () => {

      // atualiza coordenadas...

   }

   /**
    * Cancela pedido
    */
   onHandleCancelar = () => {
      alert('sds');
   }

   onCenterRegionSet = () => {
      const GOOGLE_MAPS_APIKEY = 'AIzaSyA7M8PSTU9LJCKMPMTr1mt-pDr-_2hMx4s'
      const { orderRegion, driverRegion, centerRegion } = this.state;

      console.log(centerRegion)

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
                  latitude: orderRegion.latitude,
                  longitude: orderRegion.longitude,
               }}
            />
            <MapView.Marker
               coordinate={{
                  latitude: driverRegion.latitude,
                  longitude: driverRegion.longitude,
               }}
            />
            <MapViewDirections
               origin={orderRegion}
               destination={driverRegion}
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
   coords: state.userReducer.coords,
   order: state.driverReducer.order,
});

const mapDispatchToProps = (dispatch) => {
   return {
      setCoords: (coords) => {
         dispatch(setCoords(coords));
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(DriverDeliverMap);