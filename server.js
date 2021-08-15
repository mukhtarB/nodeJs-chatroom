// Spinning up the express server

// bringing in the needed modules
const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

// initializing variables
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Serving static files: Set static folder
app.use(express.static(path.join('public')));


// Run when a client connects to web socket
io.on('connection', socket => {
    // console.log('New Web Socket (socket.io connection)');

    // emitting events with socket.io
    socket.emit('message', 'Welcome to the chatroom!');

    //emitting a broadcast to everyone except connecting user
    socket.broadcast.emit('message', 'A user has joined the chat.');

    //broadcast to every total client
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat.');
    });

});


const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
