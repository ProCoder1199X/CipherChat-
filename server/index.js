const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

// Store messages temporarily in memory (simple message queue)
let latestMessage = null;

app.use(cors());
app.use(express.json());

// POST /send — receive encrypted message from client
app.post("/send", (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "No message provided." });
  latestMessage = message;
  res.json({ success: true });
});

// GET /receive — send latest encrypted message back to client
app.get("/receive", (req, res) => {
  if (latestMessage) {
    const messageToSend = latestMessage;
    latestMessage = null; // clear once sent
    res.json({ message: messageToSend });
  } else {
    res.json({});
  }
});

// Start server
app.listen(port, () => {
  console.log(`🔐 CipherChat server running at http://localhost:${port}`);
});
