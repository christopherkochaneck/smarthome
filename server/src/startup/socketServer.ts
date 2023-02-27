import { Server } from 'socket.io';

export const socketServer = new Server(3002, {
  cors: { origin: '*' },
  allowEIO3: true,
});

// socketServer.on('connect', (client) => {
//   console.log(client);
//   // client.on('ehlo', (data) => {
//   //   console.log(data);
//   // });
// });
