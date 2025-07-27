const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { encrypt, decrypt, generateRandomKey } = require('./encryption');

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

const PORT = process.env.PORT || 3000;

// Stores sessions: { sessionCode: { key, messages[] } }
let sessions = {};

app.get('/create-session', (req, res) => {
  const sessionCode = Math.random().toString(36).substring(2, 10);
  const key = generateRandomKey();
  sessions[sessionCode] = { key, messages: [] };
  res.json({ sessionCode, key });
});

io.on('connection', socket => {
  console.log('User connected');

  socket.on('join', ({ sessionCode }) => {
    socket.join(sessionCode);
    console.log(`User joined session ${sessionCode}`);
  });

  socket.on('message', ({ sessionCode, msg, sender }) => {
    const session = sessions[sessionCode];
    if (!session) return;

    const encrypted = encrypt(msg, session.key);
    session.messages.push({ encrypted, sender });

    io.to(sessionCode).emit('message', {
      encrypted,
      sender
    });
  });

  socket.on('delete-session', sessionCode => {
    delete sessions[sessionCode];
    io.to(sessionCode).emit('session-ended');
    console.log(`Session ${sessionCode} deleted`);
  });
});

server.listen(PORT, () => {
  console.log(`CipherChat backend running on port ${PORT}`);
});
