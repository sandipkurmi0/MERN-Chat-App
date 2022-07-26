const express = require('express')
const app = express()
const http = require('http')
const { Server } = require('socket.io')
var cors = require('cors')
app.use(cors())

const PORT = process.env.PORT || 8080


const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

// const httpServer = require("http").createServer();
// const io = require("socket.io")(httpServer, {
//     cors: {
//         // origin: 'http://localhost:3000',
//         origin: '*',
//     }
// });

let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
}

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId)
}

const getUser = (userId) => {
    console.log(userId)
    return users.find((user) => user.userId === userId)
}

io.on("connection", (socket) => {
    //when connect 
    console.log(`User Connected : ${socket.id}`);

    //after connection take userId and socketId from user
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id)
        io.emit('getUsers', users)
    })

    //send and get messages
    socket.on("sendMessage", ({ sender_id, receiverId, message }) => {

        const user = getUser(receiverId);
        io.to(user?.socketId).emit("getMessage", {
            sender_id,
            message
        });
    });

    //when disconnect
    socket.on("disconnect", () => {
        console.log('a user is disconnect');
        removeUser(socket.id)
        io.emit('getUsers', users);
    })

});

// httpServer.listen(8080, () => {
//     console.log(`localhost listening on port 8080`)
// });

server.listen(PORT, () => {
    console.log(`port is listening on ${PORT}`);
})

// io.to(si).emit("welcome", "hello this is socket server") //if you want to send not all user just only one user difine socket id
