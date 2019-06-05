import React from "react";
import { Dimensions } from "react-native";
import styled from "styled-components";

import { Client } from "contexts";
import { Table, Init } from "screens";

const size = Dimensions.get("window");

const Container = styled.View`
  width: ${size.width};
  height: ${size.height};
`;

const Header = styled.View`
  width: ${size.width}px;
  height: 50px;
  background-color: green;
`;

const Content = styled.View`
  width: ${size.width}px;
  height: ${size.height - 100}px;
`;

const Footer = styled.View`
  width: ${size.width}px;
  height: 50px;
  background-color: blue;
`;

const GameComponent = () => {
  const { store: { playing } } = React.useContext(Client.Context);

  return (
    <Container>
      <Header />
      <Content>{playing ? <Table /> : <Init />}</Content>
      <Footer />
    </Container>
  );
};

export const Game = () => (
  <Client.Provider>
    <GameComponent />
  </Client.Provider>
);
