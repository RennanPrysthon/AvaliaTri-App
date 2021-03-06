import React from 'react';
import { Container, Link, Title } from "./styles";
import Icon from "react-native-vector-icons/MaterialIcons";
export default function Header({ navigation }) {
  return (
    <Container>
      <Link
        onPress={
          () => navigation.toggleDrawer()
        }
      >
        <Icon name="menu" size={30} color="#def" />
      </Link>
      <Title>
        AvaliaTRI
      </Title>
    </Container>
  );
}