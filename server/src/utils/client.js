import { parse } from 'utils';

const emit = (socket, to, message, params = {}) => {
  if (to === socket.id) {
    socket.emit(message, parse.object(params));
  } else {
    socket.to(to).emit(message, parse.object(params));
  }
};

export const client = {
  emit
};
