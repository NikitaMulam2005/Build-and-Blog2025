
---

# 🌍 Refugee First – 72-Hour Support Agent

### *A Multilingual WhatsApp + Web AI for Humanitarian Support*

![Static Badge](https://img.shields.io/badge/Project-Humanitarian-blue)
![Static Badge](https://img.shields.io/badge/AI-LangGraph%20%7C%20RAG%20%7C%20VertexAI-green)
![Static Badge](https://img.shields.io/badge/Platform-WhatsApp%20%2B%20WebChat-orange)
![Static Badge](https://img.shields.io/badge/Status-Active%20Development-yellow)
![Static Badge](https://img.shields.io/badge/License-Humanitarian%20Use%20Only-red)

---

## 📑 Table of Contents

* [Overview](#-overview)
* [Key Features](#-key-features)
* [Project Flow](#-project-flow)
* [Tech Stack](#-tech-stack)
* [UI Pages](#-ui-pages)
* [How the AI Works](#-how-the-ai-works)
* [Folder Structure](#-folder-structure)
* [Setup / Usage](#-setup--usage)
* [Medium Article](#-medium-article)
* [Contributing](#-contributing)
* [License](#-license)

---

## 🌟 Overview

**Refugee First – 72 Hour Support Agent** is a multilingual AI assistant designed to guide refugees during the **critical first 72 hours** after arriving in a new city.

It provides:
✔ Shelter guidance
✔ Food & water help
✔ Basic safety instructions
✔ Local navigation
✔ Multilingual conversation
✔ A downloadable survival plan

All without automating government or legal processes.

---

## 🚀 Key Features

### 🔹 1. Multilingual Support

Arabic • Farsi • Hindi • Urdu • English • French • Ukrainian

### 🔹 2. WhatsApp + Web Chat

Communicate instantly using either interface.

### 🔹 3. Local Aid Retrieval

Find nearby:

* Shelters
* Food banks
* Emergency centers

### 🔹 4. Safe AI System

Uses:

* **LangGraph**
* **RAG**
* **Vertex AI embeddings**
* **Groq API**

### 🔹 5. PDF Survival Plan

Users can download a **72-hour action plan**.

---

## 🧭 Project Flow

```
Landing Page
      ↓
Onboarding (Language + City)
      ↓
Login / Signup (Google + Email)
      ↓
Chat Interface (AI + RAG + Translation)
      ↓
Download PDF Summary
```

---

## 🖥️ UI Pages

### 1️⃣ Landing Page

* Hero title
* CTA buttons
* Language list
* Quick explanation

### 2️⃣ Onboarding Page

* Language selection
* City input
* Type of help needed

### 3️⃣ Login / Signup

* Google login
* Username/password
* Reset password

### 4️⃣ Chat Page

* User ↔ AI chat bubbles
* Agent status indicators
* Guided step-by-step assistance
* PDF download prompt

---

## 🤖 How the AI Works

### 🟡 Step 1 — Classification

Detects:

* user’s city
* urgency
* language

### 🟢 Step 2 — RAG Retrieval

Fetches:

* nearest shelters
* food locations
* emergency services

### 🟡 Step 3 — Planning

Organizes into a **72-hour guide**.

### 🟢 Step 4 — Delivery

Shows as chat messages and optional PDF.

---

## 🗂 Folder Structure

```
/landing
   index.html
   styles.css
   script.js

/onboarding
   onboarding.html

/auth
   login.html
   signup.html

/chat
   chat.html
   chat.css
   chat.js

/backend
   agents/
   rag/
   whatsapp/
   models/

README.md
```

---

## 🛠 Tech Stack

### Frontend

* HTML5
* CSS3
* Bootstrap 5
* JavaScript

### Backend / AI

* LangGraph
* Retrieval-Augmented Generation (RAG)
* Vertex AI Embeddings
* Groq
* WhatsApp Cloud API

---

## ▶ Setup / Usage

### 1️⃣ Clone Repository

```sh
git clone https://github.com/your-username/refugee-first.git
```

### 2️⃣ Open Landing Page

```
/landing/index.html
```

### 3️⃣ Setup Backend (optional)

* Configure WhatsApp Cloud API
* Create LangGraph pipelines
* Add embeddings + RAG DB

---

## ✍ Medium Article

Read the full blog here:
🔗 **[https://medium.com/@nikitamulam2005/refugee-first-72-hour-support-agent-building-a-multilingual-whatsapp-ai-for-refugee-support-24d4a33a953f](https://medium.com/@nikitamulam2005/refugee-first-72-hour-support-agent-building-a-multilingual-whatsapp-ai-for-refugee-support-24d4a33a953f)**

---

## 🤝 Contributing

Contributions are welcome!
Please ensure all updates follow:

* Humanitarian guidelines
* No legal automation
* No commercial misuse

---

## 📜 License

⚠ **Humanitarian Use Only**
No legal, military, surveillance, or commercial usage.

---
