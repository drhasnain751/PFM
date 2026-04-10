# PFM AI - Personal Financial Models

PFM AI is a state-of-the-art SaaS platform designed to detect financial leakage, anomalous spending, and risk patterns using Machine Learning. It provides users with a premium dashboard to manage transactions, set budgets, track savings goals, and receive AI-driven financial insights.

![Dashboard Preview](https://via.placeholder.com/1200x600?text=PFM+AI+Dashboard+Overview)

## 🌟 Key Features

- **ML-Powered Analysis**: Automated detection of risky transactions and spending anomalies.
- **Bulk Data Ingestion**: Upload CSV files for instant historical analysis.
- **Visual Analytics**: Interactive charts (Recharts) for category distribution and spending trends.
- **Budget Management**: Set and track monthly spending limits across categories.
- **Savings Goals**: Track milestones for your long-term financial objectives.
- **Premium UI**: Ultra-responsive, modern glassmorphic design with system-wide Dark/Light modes.
- **Secure Auth**: Full authentication system with persistent session management.

## 🛠️ Technology Stack

- **Frontend**: React.js, Tailwind CSS, Lucide Icons, Recharts, Framer Motion (animations).
- **Backend**: Node.js (Express), Serverless logic, JWT Authentication.
- **ML Service**: Python (FastAPI/Flask), Scikit-Learning (Isolation Forest for anomaly detection).
- **Storage**: Local JSON Database (Production-ready for MongoDB migration).
- **Deployment**: Vercel (Edge Functions).

---

## 🚀 Local Setup Guide

Follow these steps to download and run the project locally on your machine.

### 1. Prerequisites
Ensure you have the following installed:
- **Node.js**: v18.0 or higher ([Download](https://nodejs.org/))
- **Python**: v3.10 or higher ([Download](https://www.python.org/))
- **Git**: (Optional) For cloning the repository.

### 2. Download & Extraction
1. Download the project zip or clone the repository:
   ```bash
   git clone https://github.com/drhasnain751/PFM.git
   cd PFM
   ```

### 3. Installation & Setup

#### A. Backend (Server)
Navigate to the `server` folder and install dependencies:
```bash
cd server
npm install
```

#### B. Frontend (Client)
Navigate to the `client` folder and install dependencies:
```bash
cd ../client
npm install
```

#### C. ML Service (Python)
Navigate to the `ml-service` folder and set up the Python environment:
```bash
cd ../ml-service
pip install -r requirements.txt
```

### 4. Running the Application

To run the full app locally, you need to start all three services separately. We recommend using 3 terminal windows in VS Code.

- **Terminal 1 (Backend)**: `cd server && npm run dev`
- **Terminal 2 (Frontend)**: `cd client && npm run dev`
- **Terminal 3 (ML Service)**: `cd ml-service && python main.py`

Once started, the application will be available at: **`http://localhost:5173`**

---

## 🌍 Production Deployment

This project is optimized for deployment on **Vercel**.

1. Connect your GitHub repository to Vercel.
2. Vercel will automatically detect the `vercel.json` configuration.
3. It will deploy the React app as static, the Node server as Serverless Functions, and the ML logic as Python Serverless Functions.

---

## 📝 License
This project is licensed under the MIT License. Developed for Personal Financial Modeling and AI Research.
