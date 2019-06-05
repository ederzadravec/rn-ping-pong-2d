import { client, room } from "utils";

const play = ({ socket, io, room: roomIndex }) => () => {
  const [
    player1,
    player2,
    loopGame,
    { table, ball, time: oldTime }
  ] = room.getRoom(roomIndex);

  const canUpdate = new Date() / 1000 - oldTime >= 0.2;
  let newTable = table;
  if (canUpdate) {
    const { table: newTable, ball: newBall } = updateGame({
      table,
      ball,
      time: oldTime
    });

    room.updateGame(roomIndex, {
      table: newTable,
      ball: newBall,
      time: new Date() / 1000
    });
  }

  const params = {
    game: newTable
  };

  client.emit(socket, player1, "game-params", params);
  client.emit(socket, player2, "game-params", params);
};

const updateGame = ({ table: oldTable, ball: oldBall, time }) => {
  const ball = calcBall({ ball: oldBall, table: oldTable });

  const table = oldTable.map((row, rKey) => {
    return row.map((column, cKey) => {
      if (column === "player") {
        return "player";
      }

      if (rKey === ball[0][1] && cKey === ball[0][0]) {
        return "ball";
      }

      return null;
    });
  });

  return { table, ball, time };
};

const calcBall = ({ ball, table }) => {
  const [oldx, oldy] = ball[1];
  const [currentx, currenty] = ball[0];

  const directiony = oldy > currenty ? "up" : "down";

  const nexty = directiony === "up" ? currenty - 1 : currenty + 1;
  const nextx = currentx;

  // Colisão com player
  if (table[nexty][nextx] === "player") {
    // Inverte direção da bola
    return [[oldx, oldy], [currentx, currenty]];
  }

  return [[nextx, nexty], [currentx, currenty]];
};

const createTable = () => {
  const gameSize = [20, 40];
  const playerSize = 6;
  const ballSize = 1;

  const middlePlayer = playerSize / 2;
  const middleTable = gameSize[0] / 2;

  const ball = [[10, 20], [9, 19]];

  const time = new Date() / 1000;
  let table = [];

  for (let r = 0; r < gameSize[1]; r++) {
    let row = [];

    for (let c = 0; c < gameSize[0]; c++) {
      // Oppontente
      if (
        r === 0 &&
        c >= middleTable - middlePlayer &&
        c <= middleTable + middlePlayer
      ) {
        row.push("player");
        continue;
      }

      // Player
      if (
        r === gameSize[1] - 1 &&
        c >= middleTable - middlePlayer &&
        c <= middleTable + middlePlayer
      ) {
        row.push("player");
        continue;
      }

      if (r === ball[0][1] && c === ball[0][0]) {
        row.push("ball");
        continue;
      }

      // Vazio
      row.push(null);
    }

    table.push(row);
  }

  return { table, ball, time };
};

export const game = {
  play,
  createTable
};
