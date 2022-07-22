#!/user/bin/env node
import 'core-js/stable';
import 'regenerator-runtime/runtime';

/**
 * Module dependencies.
 */

import http from 'http';
import app from '../app';

/**
 * Normalize a port into a number, string, or false.
 */
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */
// const { Server } = require('socket.io')
// Run server to listen on port 3000.
// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: '*',
//   }
// });

// io.on("connection", (socket) => {
// console.log(`User Connected: ${socket.id}`);

// socket.on('disconnect', () => {
//   console.log('user disconnected');
// });
// })


import { Server } from "socket.io";
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  }
});

io.on("connection", (socket) => {
  console.log(socket)
  console.log(`User Connected : ${socket.id}`);
});


// console.log(io);
//require('../socket')(io);

/**
 * Event listener for HTTP server "error" event.
 */
const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/**
 * Event listener for HTTP server "listening" event.
 */
const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`Listening on ${bind}`);
};

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(process.env.PORT || 3000);
server.on('error', onError);
server.on('listening', onListening);
