import React, { Component } from 'react';

import { StackActions, NavigationActions } from 'react-navigation';

import { connect } from 'react-redux';

import { StyleSheet } from 'react-native';

import { colors } from '../../styles';

import { getUserOrder, getOrder, deleteOrder } from '../../store/actions/orderActions';

import { CustomButton } from '../../components';

import {
   Container,
   Header,
   Title,
   Button,
   Icon,
   Left,
   Right,
   Body,
   Text,
   Spinner,
   Content,
   Card,
   CardItem,
} from "native-base";

class ClientAwait extends Component {

   static navigationOptions = ({ navigation }) => ({
      header: null
   });

   componentDidMount() {
      this.isOrderPending();
   }

   componentDidUpdate = async () => {
      await setTimeout(() => {
         if (this.props.order) {
            this.isOrderPending();
         }
      }, 8000);
   }

   onResetApp() {
      const resetAction = StackActions.reset({
         index: 0,
         actions: [
            NavigationActions.navigate({ routeName: 'ClientOrder' })
         ]
      });
      this.props.navigation.dispatch(resetAction);
   }

   isOrderPending = () => {

      if (this.props.order) {
         if (this.props.order.status !== 'pendente') {
            if (this.props.order.status === 'em andamento')
               this.navigateToDeliveryMap();
         } else {
            const { id } = this.props.order;
            this.props.getOrder(id);
         }
      }

   }

   navigateToDeliveryMap = () => {
      this.props.navigation.navigate('ClientDeliverMap');
   }

   onCancelaPedido = () => {
      if (this.props.order) {
         this.props.deleteOrder(this.props.order.id);
         this.onResetApp();
      }
   }

   render() {
      return (
         <Container>
            <Header
               style={styles.header}
               androidStatusBarColor='#000'
            >
               <Left><Spinner /></Left>
               <Body>
                  <Title style={{ color: '#fff' }}>Aguardando...</Title>
               </Body>
               <Right>
                  <Button
                     transparent
                     onPress={() => { this.props.navigation.toggleDrawer() }}
                  >
                     <Icon name="menu" />
                  </Button>
               </Right>
            </Header>
            <Content style={{ backgroundColor: colors.bege }} padder>
               <Card transparent>
                  <CardItem>
                     <Body>
                        <Text>
                           Seu pedido foi anunciado, agora é só aguardar que alguma lancheria já vai te atender...
                        </Text>
                     </Body>
                  </CardItem>
               </Card>
               <CustomButton
                  text='Cancelar'
                  onPress={this.onCancelaPedido}
               />
            </Content>
         </Container>
      );
   }
}

const styles = StyleSheet.create({
   header: {
      backgroundColor: colors.vermelhoFraco
   },
   content: {
      flex: 1,
      paddingHorizontal: 20,
      justifyContent: 'space-around',
      alignItems: 'center',
   },
   button: {
      backgroundColor: colors.verde,
   }
});

const mapStateToProps = state => ({
   order: state.orderReducer.order,
   user: state.userReducer.user,
});

const mapDispatchToProps = (dispatch) => {
   return {
      getUserOrder: (user_id) => {
         dispatch(getUserOrder(user_id));
      },
      getOrder: (order_id) => {
         dispatch(getOrder(order_id));
      },
      deleteOrder: (order_id) => {
         dispatch(deleteOrder(order_id));
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientAwait);