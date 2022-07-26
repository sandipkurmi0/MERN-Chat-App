

const SocketChat = (io) => {

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
            // console.log(sender_id)
            // console.log(receiverId)
            // console.log(message)

            const user = getUser(receiverId);
            console.log('user', user)
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

}

module.exports = SocketChat;
