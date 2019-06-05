import express from "express";
import http from "http";
import socketIO from "socket.io";

import { disconnect, join  } from 'game';

const server = http.Server(express);
const io = socketIO(server);


io.on("connection", socket => {
  // console.log("Temos uma anta conectada", socket.id);

  socket.on("disconnect", disconnect({ io, socket }));

  socket.on("join", join({ io, socket }));

  // socket.on("left", left(socket));

  socket.on("init-game", join);

  socket.on("playing-send", join);
});

server.listen(2424, () => {
  console.log("listening in port 2424");
});


// Messages
/*
  join  - Joga o usuário numa lista de espera até ter mais um jogador
  init-game - Quando tem mais de um jogador na fila, inicia o jogo entre eles
  playing-receive - Envia os parametros do jogo para ambos os jogadores
  playing-send - Recebe os parametros do jogo enviado pelo usuário
  finish-game - Finaliza o jogo
*/


// io.to('room 237').emit('a new user has joined the room'); // broadcast to everyone in the room
