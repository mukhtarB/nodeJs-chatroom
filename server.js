// Spinning up the express server

// bringing in the needed modules
const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('utils/messages');

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

    // emitting events with socket.io
    socket.emit('message', formatMessage(bot, 'Welcome to the chatroom!'));

    //emitting a broadcast to everyone except connecting user
    socket.broadcast.emit('message', formatMessage(bot, 'A user has joined the chat.'));

    //broadcast to every total client
    socket.on('disconnect', () => {
        io.emit('message', formatMessage(bot, 'A user has left the chat.'));
    });

    // Listen for chatMessage
    socket.on('chatMessage', msg => {
        // console.log(msg)

        // emit message back to client - to everyone
        io.emit('message', formatMessage('USER',   msg));
    });


});


const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
