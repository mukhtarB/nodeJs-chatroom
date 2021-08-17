// Spinning up the express server

// bringing in the needed modules
const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const {userJoin, getCurrentUser, userLeave, getRoomUsers} = require('./utils/users');

// initializing variables
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const bot = 'ChatRoom Bot';

// Serving static files: Set static folder
app.use(express.static(path.join('public')));


// Run when a client connects to web socket
io.on('connection', socket => {
    // console.log('New Web Socket (socket.io connection)');

    socket.on('joinRoom', ({ username, room }) => {
        // Joining a room
        const user = userJoin(socket.id, username, room);
        socket.join(user.room);

        // emitting events with socket.io
        socket.emit('message', formatMessage(bot, 'Welcome to the chatroom!'));

        // emitting a broadcast to everyone except connecting user
        socket.broadcast.to(user.room).emit('message', formatMessage(bot, `${user.username} has joined the chat.`));

        // send user and room info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });
    });


    // Listen for chatMessage
    socket.on('chatMessage', msg => {
        //get user
        const user = getCurrentUser(socket.id);

        // emit message back to client - to everyone
        io.to(user.room).emit('message', formatMessage(user.username, msg));
    });


    // broadcast to every total client
    socket.on('disconnect', () => {
        user = userLeave(socket.id)

        if(user) {
            io.to(user.room).emit('message', formatMessage(bot, `${user.username} has left the chat.`));

            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            });
        };
    });

});


const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
