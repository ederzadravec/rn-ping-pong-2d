import R from "ramda";

import { parse, gamer, room, client, game } from "utils";

export const join = ({ socket, io }) => params => {
  const { name } = parse.json(params, ["name"]);

  if (!R.isEmpty(gamer.get(socket.id))) return null;

  gamer.add(socket.id, { id: socket.id, name });

  const roomIndex = room.addGamer(socket.id);

  if (roomIndex === false) {
    const user = gamer.get(socket.id);

    params = {
      gamer: user
    };

    client.emit(socket, socket.id, "join", params)

    return false;
  }

  const gamers = room.getGamers(roomIndex);

  gamers.forEach(g => {
    const opponentId = R.reject(R.equals(g), gamers)[0];
    const opponent = gamer.get(opponentId);
    const user = gamer.get(g);

    params = {
      gamer: user,
      opponent,
      room: roomIndex
    };

    client.emit(socket, g, "lets-go", params)
  });

  const loopGame = setInterval(game.play({ socket, io, room: roomIndex }), 50);

  room.initGame(roomIndex, loopGame)
};
