import React from "react";
import { Dimensions } from "react-native";
import styled from "styled-components";

import { Client } from "contexts";
import { Table } from "components";

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
  background-color: red;
`;

const Footer = styled.View`
  width: ${size.width}px;
  height: 50px;
  background-color: blue;
`;

export class Game extends React.PureComponent {
  constructor() {
    super();

    console.disableYellowBox = true;
  }

  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Client.Provider>
            <Table />
          </Client.Provider>
        </Content>
        <Footer />
      </Container>
    );
  }
}
