import React from "react";
import { Text } from "react-native";
import styled from "styled-components";

import { Client } from "contexts";

const getCollorSquare = type => {
  if (type === "player") return "#555";
  if (type === "ball") return "#f00";

  return "#fff";
};

const Container = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Content = styled.View`
  width: 252px;
  height: 502px;
  border-color: #222;
  border-width: 1px;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Square = styled.View`
  width: 12.5px;
  height: 12.5px;
  background-color: ${({ type }) => getCollorSquare(type)};
`;

export const Table = () => {
  const {
    store: { game }
  } = React.useContext(Client.Context);

  return (
    <Container>
      <Content>
        {(game || []).map((row, rKey) =>
          row.map((cell, cKey) => (
            <Square key={`${rKey}-${cKey}`} type={cell} />
          ))
        )}
      </Content>
    </Container>
  );
};
