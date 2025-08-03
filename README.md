# CipherChat 🔐
** Encrypted Messaging App using AES-256 Based Multi-Layer Symmetric Encryption**  
Secure. Private. Serverless. Open Source.

### More secure C++ version is avaliable [here](https://github.com/ProCoder1199X/CipherChat-CPP)
---

## 🧠 What is CipherChat?

CipherChat is a **Progressive Web App (PWA)** designed to provide the **highest level of end-to-end encrypted messaging**, using a **custom AES-256 based symmetric encryption model**. The chat session is temporary and peer-to-peer (via WebSocket), with **no message storage**, and no account sign-ups.

- 💬 Real-time encrypted chat
- 🛡️ AES-256 Multi-layer Encryption
- 🔑 No accounts or passwords
- 🔒 No messages stored on server
- 📱 Mobile & desktop support (PWA)
- 🚫 Zero Ads, Zero Tracking

---

## 🔐 How Encryption Works

CipherChat uses **symmetric encryption** based on AES-256 with multiple cryptographic layers and transformations.

### Step-by-Step Encryption Flow:

1. **Session Key Generation:**
   - The host (user 1) creates a temporary **chat session token**, which acts as the secret key.

2. **Encryption of Messages:**
   - Every message is:
     - Padded and base64-encoded.
     - Encrypted using AES-256 (CBC mode).
     - Hashed + Salted to produce integrity checksum.
     - Then encoded again for transmission.

3. **Decryption on Recipient Side:**
   - The same session key (shared securely via QR/token) decrypts the message on the client side.

4. **WebSocket Transport:**
   - All encrypted messages are transmitted via secure WebSocket (WSS), never stored on disk or server.

> ❗ Session Key is **never stored** or sent to the server. If a user closes the session or deletes the token, the chat becomes inaccessible.

---

## 🔐 Security Breakdown

| Layer | Security Feature |
|-------|------------------|
| 🔑 AES-256 | Military-grade encryption |
| 🧂 Salting | Prevents dictionary attacks |
| 🔁 Multi-layer cipher steps | Adds noise and entropy |
| 🧪 Integrity Hash | Detects tampering |
| 🌐 WSS | Secure network layer |
| ❌ No message logging | Eliminates backend leaks |

---

### ⚠️ How Secure Is This?

CipherChat uses **symmetric AES-256** — the standard used by governments, militaries, and banks. Combined with:

- **No user data collection**
- **No cloud message storage**
- **No login metadata**
- **Temporary sessions**

…this makes it **one of the most secure and lightweight encrypted messaging apps available.**

> Even if a server is compromised, messages can't be decrypted without the session key.

---

## 📦 Tech Stack


---


## 🧩 Future Plans
- 🔄 True P2P with NAT traversal (like TOR)

- 🔐 Add voice & file encryption

- 💼 Pro version for business users

## 🤝 License
- MIT License — Free and open-source forever.

## 📣 Developed By
[DheerajKumar](https://x.com/DheerajKumar76x)
