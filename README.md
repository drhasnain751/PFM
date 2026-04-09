# PFM AI: Personal Financial Models - Setup Guide

This guide provides instructions on how to install and run the **PFM AI** project on a new device. The project consists of three main components that need to be running simultaneously:

1.  **Frontend (React/Vite)**: The user interface.
2.  **Backend (Node/Express)**: The API and database manager.
3.  **ML Service (Python/FastAPI)**: The AI engine for financial leakage detection.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js**: Version 18.0 or higher. [Download here](https://nodejs.org/)
- **Python**: Version 3.10 or higher. [Download here](https://www.python.org/)
- **Git**: (Optional) For cloning the repository.

---

## 🛠️ Installation

Follow these steps to set up each component:

### 1. Backend Setup
Navigate to the `server` directory and install Node dependencies:
```bash
cd server
npm install
```

### 2. Frontend Setup
Navigate to the `client` directory and install Node dependencies:
```bash
cd client
npm install
```

### 3. ML Service Setup
Navigate to the `ml-service` directory, create a virtual environment, and install Python dependencies:

**On Windows:**
```powershell
cd ml-service
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
```

**On macOS/Linux:**
```bash
cd ml-service
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

---

## 🚀 Running the Project

To run the complete system, you must start each service in a separate terminal window:

### Terminal 1: Backend
```bash
cd server
npm run dev
```
*Runs on: [http://localhost:5000](http://localhost:5000)*

### Terminal 2: Frontend
```bash
cd client
npm run dev
```
*Runs on: [http://localhost:5173](http://localhost:5173)*

### Terminal 3: ML Service
```bash
cd ml-service
# Activate venv first!
.\venv\Scripts\activate  # (Windows)
# Then run:
uvicorn main:app --port 8000 --reload
```
*Runs on: [http://localhost:8000](http://localhost:8000)*

---

## 📂 Project Structure

- `/client`: React frontend source code and assets.
- `/server`: Express backend, authentication routes, and local database (`db.json`).
- `/ml-service`: Python FastAPI code and scikit-learn models.

---

## ⚠️ Troubleshooting

- **Port Conflicts**: Ensure ports 5000, 5173, and 8000 are not being used by other applications.
- **Python `venv`**: If `pip` is missing in your virtual environment, run `python -m ensurepip` before installing requirements.
- **Node Modules**: If you see "Module not found" errors, delete the `node_modules` folder in that directory and run `npm install` again.

---

**Happy Financial Modeling!** 🚀
