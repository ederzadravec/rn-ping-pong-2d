import React from "react";
import io from 'socket.io-client';

const socket = io('http://192.168.0.168:2424');

console.log({ socket })

const params = {
  name: 'Éder'
}

socket.emit('join', JSON.stringify(params));







const ClientContext = React.createContext({});

class Provider extends React.Component {
  state = {};

  render() {
    const { children } = this.props;

    const value = {};

    return (
      <ClientContext.Provider value={value}>{children}</ClientContext.Provider>
    );
  }
}

export const Client = {
  Provider,
  Consumer: ClientContext.Consumer
};
