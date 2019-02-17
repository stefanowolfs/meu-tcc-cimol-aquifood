import React from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {
   createSwitchNavigator,
   createStackNavigator,
   createDrawerNavigator,
   createBottomTabNavigator,
} from 'react-navigation';

import ClientAwait from './pages/ClientAwait';
import ClientCadRestaurant from './pages/ClientCadRestaurant';
import ClientDeliverMap from './pages/ClientDeliverMap';
import ClientHome from './pages/ClientHome';
import ClientOrder from './pages/ClientOrder';
import ClientOrderModal from './pages/ClientOrderModal';
import ClientPayment from './pages/ClientPayment';


import ResCadDriver from './pages/ResCadDriver';
import ResCadFood from './pages/ResCadFood';
import ResDriverMenu from './pages/ResDriverMenu';
import ResCadDriverUser from './pages/ResCadDriverUser';
import ResFindOrderMap from './pages/ResFindOrderMap';
import ResFoodMenu from './pages/ResFoodMenu';
import ResHome from './pages/ResHome';
import ResOrderMenu from './pages/ResOrderMenu';
import ResConfigurations from './pages/ResConfigurations';


import DriverHome from './pages/DriverHome';
import DriverEditDriver from './pages/DriverEditDriver';
import DriverMenuOrder from './pages/DriverMenuOrder';
import DriverLoading from './pages/DriverLoading';
import DriverDeliverMap from './pages/DriverDeliverMap';
import DriverFinishDelivery from './pages/DriverFinishDelivery';




import Test from './pages/tests/MapTestLayout';
import TestDriverDeliverMap from './pages/TestDriverDeliverMap';

import Login from './pages/Login';
import Register from './pages/Register';
import Initializing from './pages/Initializing';
import LogOut from './pages/LogOut';
import Reset from './pages/Reset';


const DriverOrderNavigator = createStackNavigator(
   {
      DriverMenuOrder: {
         screen: DriverMenuOrder,
         navigationOptions: () => ({
            title: 'Inicie uma entrega'
         })
      },
      DriverDeliverMap,
      DriverFinishDelivery,
   }, {
      navigationOptions: {
         headerStyle: {
            backgroundColor: '#AA5F5F',
         },
         headerTintColor: '#fff',
         headerTitleStyle: {
            fontWeight: 'bold',
         },
      },
   }
)

const DriverTabNavigator = createBottomTabNavigator(
   {
      'Conta': DriverEditDriver,
      'Inicio': DriverHome,
      'Entregas': DriverOrderNavigator,
   },
   {
      navigationOptions: ({ navigation }) => ({
         tabBarIcon: ({ focused, horizontal, tintColor }) => {
            const { routeName } = navigation.state;
            let iconName;
            if (routeName === 'Inicio') {
               iconName = `ios-home${focused ? '' : ''}`;
            } else if (routeName === 'Conta') {
               iconName = `ios-settings${focused ? '' : ''}`;
            } else if (routeName === 'Entregas') {
               iconName = 'ios-clipboard';
            }
            return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
         },
      }),
      tabBarOptions: {
         activeTintColor: 'white',
         activeBackgroundColor: '#96484D',
         inactiveBackgroundColor: '#AA5a5F',
         inactiveTintColor: 'white',
         style: {
            borderTopWidth: 0,
         },
      },
      backBehavior: 'initialRoute',
      initialRouteName: 'Inicio',
   }
);

const ResConfigurationNavigator = createStackNavigator(
   {
      ResConfigurations,
      ResFoodMenu: {
         screen: ResFoodMenu,
         navigationOptions: () => ({
            title: 'SEUS LANCHES'
         })
      },
      ResCadFood: {
         screen: ResCadFood,
         navigationOptions: () => ({
            title: 'EDIÇÃO DE LANCHE'
         })
      },
      ResCadDriverUser: {
         screen: ResCadDriverUser,
         navigationOptions: () => ({
            title: 'EDIÇÃO DE MOTORISTA'
         })
      },
      ResCadDriver: {
         screen: ResCadDriver,
         navigationOptions: () => ({
            title: 'EDIÇÃO DE MOTORISTA'
         })
      },
      ResDriverMenu: {
         screen: ResDriverMenu,
         navigationOptions: () => ({
            title: 'ENTREGADORES'
         })
      },
   }, {
      navigationOptions: {
         headerStyle: {
            backgroundColor: '#AA5F5F',
         },
         headerTintColor: '#fff',
         headerTitleStyle: {
            fontWeight: 'bold',
         },
      },
   }
)

const RestaurantTabNavigator = createBottomTabNavigator(
   {
      'Gerenciamento': ResConfigurationNavigator,
      'Inicio': ResHome,
      'Pedidos': ResOrderMenu,
      'Buscar Clientes': ResFindOrderMap,
   },
   {
      navigationOptions: ({ navigation }) => ({
         tabBarIcon: ({ focused, horizontal, tintColor }) => {
            const { routeName } = navigation.state;
            let iconName;
            if (routeName === 'Inicio') {
               iconName = `ios-home${focused ? '' : ''}`;
            } else if (routeName === 'Gerenciamento') {
               iconName = `ios-settings${focused ? '' : ''}`;
            } else if (routeName === 'Buscar Clientes') {
               iconName = 'ios-happy';
            } else if (routeName === 'Pedidos') {
               iconName = 'ios-clipboard';
            }

            // You can return any component that you like here! We usually use an
            // icon component from react-native-vector-icons
            return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
         },
      }),
      tabBarOptions: {
         activeTintColor: 'white',
         activeBackgroundColor: '#96484D',
         inactiveBackgroundColor: '#AA5a5F',
         inactiveTintColor: 'white',
         style: {
            borderTopWidth: 0,
         },
      },
      backBehavior: 'initialRoute',
      initialRouteName: 'Inicio',
   }
);


const ClientNewOrderNavigator = createStackNavigator(
   {
      ClientOrder,
      ClientAwait,
      ClientDeliverMap,
      ClientPayment,
   }, {
      navigationOptions: {
         headerStyle: {
            backgroundColor: '#AA5F5F',
         },
         headerTintColor: '#fff',
         headerTitleStyle: {
            fontWeight: 'bold',
         },
      },
   }
)

const ClientOrderRootNavigator = createStackNavigator(
   {
      ClientNewOrderNavigator,
      ClientOrderModal,
   },
   {
      navigationOptions: {
         header: null
      },
   }
)

const ClientNavigator = createDrawerNavigator(
   {
      Home: {
         screen: ClientHome,
      },
      'Cadastro de Restaurante': { screen: ClientCadRestaurant },
      Pedido: {
         screen: ClientOrderRootNavigator
      },
      Deslogar: { screen: LogOut },
   },
   {
      navigationOptions: {
         header: null
      },
   }
)

const AuthNavigator = createSwitchNavigator({
   Login,
   Register
});

const RootNavigator = createStackNavigator(
   {
      Initializing: {
         screen: Initializing,
         navigationOptions: () => ({
            header: null
         })
      },
      Auth: {
         screen: AuthNavigator,
         navigationOptions: () => ({
            header: null
         }),
      },
      Reset,
      LogOut,
      ClientNavigator,
      ResHome: RestaurantTabNavigator,
      DriverHome: DriverTabNavigator,
   },
   {
      navigationOptions: {
         header: null
      },
   }
);

export default RootNavigator;