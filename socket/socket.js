const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
    cors: {
        origin: 'http://localhost:3000',
    }
});

io.on("connection", (socket) => {
    console.log(`User Connected : ${socket.id}`);
});

httpServer.listen(8080);