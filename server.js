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
    console.log('New Web Socket (socket.io connection)');
});


const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
