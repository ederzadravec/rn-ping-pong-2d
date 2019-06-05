import React from "react";
import { TouchableOpacity, TextInput, Text, View, Alert } from "react-native";
import styled from "styled-components";

import { Client } from "contexts";

const Container = styled(View)`
  width: 250px;
  align-self: center;
  flex-direction: column;
  align-items: center;
  padding-vertical: 20px;
`;

const Title = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  color: #555;
  margin-bottom: 20px;
`;

const Name = styled(TextInput)`
  margin-bottom: 20px;
  border-color: #555;
  border-width: 1px;
  border-radius: 4;
  width: 90%;
  height: 30px;
`;

const Button = styled(TouchableOpacity)`
  border-color: #555;
  border-width: 1px;
  background-color: #eee;
  border-radius: 5;
  padding-vertical: 10px;
  padding-horizontal: 15px;
`;

const ButtonLabel = styled(Text)`
  font-size: 16px;
  font-weight: bold;
`;

export const Init = () => {
  const {
    store: { waiting },
    join
  } = React.useContext(Client.Context);

  const [name, setName] = React.useState(null);

  const handleInit = () => {
    if (!name || name.length < 3)
      return Alert.alert("Amigo ...", "... coloca seu nome certinho ai");

    join({ name });
  };

  return (
    <Container>
      <Title>Insira seu nome</Title>
      <Name onChangeText={setName} />
      <Button onPress={handleInit} disabled={waiting}>
        <ButtonLabel>{waiting ? "Esperando" : "Iniciar"}</ButtonLabel>
      </Button>
    </Container>
  );
};
