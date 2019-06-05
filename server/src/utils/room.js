import R from "ramda";
import { game } from "utils";
var { rooms } = require("variables");

// Cada sala tem 4 parametros
// [player1, player2, loopGame, gameData]

const getRoom = room => {
  return rooms[room];
};

const addGamer = id => {
  const room = rooms.findIndex(r => r.length === 1);

  if (room >= 0) {
    rooms[room] = R.append(id, rooms[room]);
    return room;
  }

  rooms.push([id]);

  return false;
};

const getGamers = room => {
  return R.pathOr([], [room], rooms);
};

const removeGamer = id => {
  const room = rooms.findIndex(R.contains(id));

  if (room >= 0) {
    const [x1, x2, loopGame] = rooms[room];
    if (loopGame) {
      clearInterval(loopGame);
    }

    rooms[room] = R.pipe(
      R.remove(2, 2),
      R.reject(R.equals(id))
    )(rooms[room]);

    return rooms[room];
  }

  return rooms[room];
};

const initGame = (room, loopGame) => {
  if (room >= 0) {
    rooms[room] = R.append(loopGame, rooms[room]);
    rooms[room] = R.append(game.createTable(), rooms[room]);

    return room;
  }

  return false;
};

const updateGame = (room, game) => {
  if (room >= 0) {
    rooms[room][3] = game;

    return room;
  }

  return false;
}

export const room = {
  getRoom,
  addGamer,
  getGamers,
  removeGamer,
  initGame,
  updateGame
};
