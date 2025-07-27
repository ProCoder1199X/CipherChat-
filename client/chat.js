// chat.js

const key = localStorage.getItem("cipherchat-key");
if (!key) {
  alert("Session key not found! Please go back and join with a key.");
  window.location.href = "index.html";
}

document.getElementById("sessionKeyDisplay").innerText = key;

const socket = new WebSocket("ws://localhost:3000"); // You can change the port

socket.addEventListener("open", () => {
  console.log("Connected to server.");
  socket.send(JSON.stringify({ type: "join", key }));
});

socket.addEventListener("message", (event) => {
  const data = JSON.parse(event.data);
  if (data.type === "message" && data.key === key) {
    const decrypted = decrypt(data.text, key);
    appendMessage(decrypted, "received");
  }
});

document.getElementById("sendBtn").addEventListener("click", sendMessage);
document.getElementById("messageInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const input = document.getElementById("messageInput");
  const text = input.value.trim();
  if (!text) return;

  const encrypted = encrypt(text, key);
  socket.send(JSON.stringify({ type: "message", key, text: encrypted }));

  appendMessage(text, "sent");
  input.value = "";
}

function appendMessage(text, type) {
  const chatBox = document.getElementById("chatBox");
  const div = document.createElement("div");
  div.classList.add("message", type);
  div.textContent = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function encrypt(message, key) {
  return CryptoJS.AES.encrypt(message, key).toString();
}

function decrypt(ciphertext, key) {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    return bytes.toString(CryptoJS.enc.Utf8) || "[Decryption Error]";
  } catch (e) {
    return "[Error]";
  }
}
