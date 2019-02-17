import React from 'react';

import { StyleSheet } from "react-native";

import { Container, Header, Title, Button, Left, Body, Icon, Text, Card, CardItem, Content } from 'native-base';

import { colors } from '../../styles';

import { CustomButton } from '../../components';

const ClientOrderModal = (props) => {

   const food = props.navigation.getParam('food');

   return (
      <Container>
         <Header
            style={styles.header}
            androidStatusBarColor='#000'
         >
            <Left>
               <Button
                  transparent
                  onPress={() => { props.navigation.toggleDrawer() }}
               >
                  <Icon name='menu' />
               </Button>
            </Left>
            <Body>
               <Title>Seu pedido está correto?</Title>
            </Body>
         </Header>

         <Content>
            <Card>
               <CardItem header>
                  <Text>Itens do pedido:</Text>
               </CardItem>
               <CardItem>
                  <Body>
                     <Text>
                        1. {food.nome}
                     </Text>
                  </Body>
               </CardItem>
               <CustomButton
                  text="CONFIRMAR"
                  style={styles.button}
                  onPress={props.navigation.getParam('onConfirmaPedido')}
               />
               <CustomButton
                  text="CANCELAR"
                  style={{ backgroundColor: colors.vermelho }}
                  onPress={() => { props.navigation.goBack() }}
               />
            </Card>
         </Content>
      </Container >
   );
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
})

export default ClientOrderModal;