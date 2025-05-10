# 🚨 SafeSpace: AI-Powered Incident Reporting for Justice

> A secure, anonymous platform to report discrimination, harassment, or abuse — powered by AI to assist and amplify your voice.

---

## 📌 Overview

**SafeSpace** is a web-based application designed to create safer, more inclusive environments by simplifying the process of reporting sensitive incidents. Users can submit reports anonymously, get AI assistance to articulate their experiences, and upload evidence securely. Admins can view reports through a structured dashboard for appropriate action.

---

## 🎯 Key Features

- 🔒 Anonymous incident reporting with AI-powered text assistance
- 📤 Secure file uploads with Cloudinary (supports proof like images/docs)
- 🛠️ Admin dashboard with a structured report viewer
- 📈 Scalable architecture using MERN stack

---

## 🧱 Tech Stack

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **AI Integration:** Python Flask (Custom tokenizer + GPT-2 model)
- **File Storage:** Cloudinary

---

## 🚀 Getting Started

### ✅ Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) and npm
- [Python 3.8+](https://www.python.org/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
- [Cloudinary](https://cloudinary.com/) account


> 🛠️ Also, configure your `.env` files in both `server/` and `client/` with necessary credentials like `MONGODB_URI`, `CLOUDINARY_API_KEY`, etc.

---

## Setup Instructions for Large Files

This project contains large files that are ignored by Git due to size limitations. 

Please manually download the following files and place them in the `server/flask_ai_server/models/models/fine_tuned_model/checkpoint-3/` directory:

- [model.safetensors](link-to-file)
- [optimizer.pt](link-to-file)

Once downloaded, you should be able to run the project as usual.

---

## 💻 Run Locally

### 🛠️ Step 1: Install Dependencies

```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install

# Install Flask AI server dependencies
cd ../flask_ai_server
pip install -r requirements.txt
```

### 🛠️ Step 2: Start the Project

```bash
## Start React client (in client/)
npm run dev

# Start Node.js backend (in server/)
npm start

# Start Flask AI server (in flask_ai_server/)
python app.py
```

### 🌐 Localhost URLs:
🔹 Frontend: http://localhost:3000
🔹 Backend API: http://localhost:5000
🔹 Flask AI Server: http://localhost:5001
