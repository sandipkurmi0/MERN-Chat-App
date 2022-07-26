#!/user/bin/env node
"use strict";

require("core-js/stable");

require("regenerator-runtime/runtime");

var _http = _interopRequireDefault(require("http"));

var _app = _interopRequireDefault(require("../app"));

var _socket = require("socket.io");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Module dependencies.
 */

/**
 * Normalize a port into a number, string, or false.
 */
var normalizePort = function normalizePort(val) {
  var port = parseInt(val, 10);

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


var port = normalizePort(process.env.PORT || '3000');

_app["default"].set('port', port);
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


var server = _http["default"].createServer(_app["default"]);

var io = new _socket.Server(server, {
  cors: {
    origin: 'http://localhost:3000'
  }
});
io.on("connection", function (socket) {
  console.log(socket);
  console.log("User Connected : ".concat(socket.id));
}); // console.log(io);
//require('../socket')(io);

/**
 * Event listener for HTTP server "error" event.
 */

var onError = function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? "Pipe ".concat(port) : "Port ".concat(port); // handle specific listen errors with friendly messages

  switch (error.code) {
    case 'EACCES':
      console.error("".concat(bind, " requires elevated privileges"));
      process.exit(1);
      break;

    case 'EADDRINUSE':
      console.error("".concat(bind, " is already in use"));
      process.exit(1);
      break;

    default:
      throw error;
  }
};
/**
 * Event listener for HTTP server "listening" event.
 */


var onListening = function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? "pipe ".concat(addr) : "port ".concat(addr.port);
  console.log("Listening on ".concat(bind));
};
/**
 * Listen on provided port, on all network interfaces.
 */


server.listen(process.env.PORT || 3000);
server.on('error', onError);
server.on('listening', onListening);