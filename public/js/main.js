const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

const socket = io();

// Receiving message from server
socket.on('message', message => {
    console.log(message)

    // displaying received msg via func
    outputMessage(message);

    // scroll down to the bottom for each message
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Submitting message back to Server
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get chat message
    const msg = e.target.elements.msg.value;

    // Emit message to the server
    socket.emit('chatMessage', msg);

    //clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});

// Output message to DOM
function outputMessage(message) {
    div = document.createElement('div');

    div.classList.add('message');
    div.innerHTML = `<p class="meta">Brad <span>9:12pm</span></p>
    <p class="text">
        ${message}
    </p>`

    document.querySelector('.chat-messages').appendChild(div);
};