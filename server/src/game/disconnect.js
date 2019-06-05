import { gamer, room, client } from "utils";

export const disconnect = ({ socket, io }) => () => {
  const { name } = gamer.get(socket.id);

  const gamers = room.removeGamer(socket.id)
  gamer.remove(socket.id);

  console.log({ gamers })
  if (gamers && gamers.length > 0) client.emit(socket, gamers[0], 'abort-game')

  console.log("Menos um troxa", name);
};
