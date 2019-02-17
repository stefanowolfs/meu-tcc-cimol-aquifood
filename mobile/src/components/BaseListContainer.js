import React from 'react';

import { Container, Content } from 'native-base';

import { View } from 'react-native';

const BaseListContainer = (props) => {


   return (
      <Container >
         <Content>
            {props.children}
         </Content>
      </Container>
   );
}

export default BaseListContainer;

