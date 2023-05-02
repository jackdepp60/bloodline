const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (socket) => {
  console.log('Client connected');

  // Handle incoming messages from the client
  socket.on('message', (data) => {
    console.log(`Received message: ${data}`);

    // Echo the message back to the client
    socket.send(`Echo: ${data}`);
  });

  // Handle client disconnection
  socket.on('close', () => {
    console.log('Client disconnected');
  });
});
