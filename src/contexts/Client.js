import React from "react";
import { Alert } from "react-native";
import io from "socket.io-client";

const socket = io("ws://localhost:2424");

const ClientContext = React.createContext();

class Provider extends React.Component {
  constructor(props) {
    super(props);

    socket.on("lets-go", response => {
      const params = JSON.parse(response);

      this.setState({
        opponent: params.opponent,
        playing: true
      });
    });

    socket.on("join", response => {
      const { gamer } = JSON.parse(response);

      this.setState({ gamer, waiting: true });
    });

    socket.on("abort-game", response => {
      const { gamer } = JSON.parse(response);

      this.setState({
        gamer: {},
        opponent: {},
        playing: false,
        waiting: true
      });
    });

    socket.on("game-params", response => {
      const { game } = JSON.parse(response);

      this.setState({
        game
      });
    });
  }

  state = {
    playing: false,
    waiting: false,
    gamer: null,
    opponent: null,
    game: [[]]
  };

  join = async ({ name }) => {
    socket.emit("join", JSON.stringify({ name }));
  };

  left = () => {
    socket.emit("left", JSON.stringify(params));
  };

  move = (direction) => {
    socket.emit("move", JSON.stringify({ direction }));
  }

  render() {
    const { children } = this.props;

    const value = {
      store: this.state,
      join: this.join,
      left: this.left,
      move: this.move,
    };

    return (
      <ClientContext.Provider value={value}>{children}</ClientContext.Provider>
    );
  }
}

export const Client = {
  Context: ClientContext,
  ...ClientContext,
  Provider
};
