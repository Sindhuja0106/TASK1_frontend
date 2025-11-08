#  TASK1 — React Frontend for FastAPI + AWS S3 File Uploader

**Live Frontend:** [https://effervescent-frangipane-72b1dc.netlify.app](https://effervescent-frangipane-72b1dc.netlify.app)  
**Backend (FastAPI):** [https://github.com/Sindhuja0106/backend](https://github.com/Sindhuja0106/backend)

---

##  Overview

**TASK1 Frontend** is a React-based web application that allows users to upload files directly to an **Amazon S3 bucket** through a **FastAPI backend**.  
The **frontend** handles the user interface and file input, while the **backend** uses `boto3` (AWS SDK for Python) to communicate securely with S3 for file storage.

---

## Tech Stack

| Layer | Technology |
|--------|-------------|
| **Frontend** | React.js (Functional Components, Hooks) |
| **Backend API** | FastAPI (Python) |
| **AWS SDK** | boto3 |
| **Cloud Storage** | Amazon S3 |
| **Deployment** | Netlify (Frontend) + Render (Backend) |

---

## Features

✅ Upload files to AWS S3 through FastAPI backend  
✅ Real-time upload progress and success messages  
✅ Secure AWS communication using **boto3**  
✅ Simple, responsive, and lightweight UI  
✅ CORS-enabled backend for seamless frontend communication  

---

## 🧭 Project Structure
TASK1/
│
├── backend/
│   ├── __pycache__/
│   ├── .ebextensions/         
│   ├── .env                  
│   ├── app.py               
│   ├── requirements.txt
│   └── Procfile                # For deployment (Render / Elastic Beanstalk)
│
├── frontend/
│   ├── build/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── package-lock.json
│   ├── .gitignore
│   └── README.md
│
├── .gitignore
├── requirements.txt
└── README.md

## Setup Instructions

### 1. Clone the Repository
bash
git clone https://github.com/Sindhuja0106/TASK1_frontend.git
cd TASK1

### Backend Setup (FastAPI + boto3)
cd backend
python -m venv venv
venv\Scripts\activate     (on Windows)
pip install -r requirements.txt
uvicorn app:app --reload



### Create a .env file inside the backend/ directory:

AWS_ACCESS_KEY_ID=your_key_here
AWS_SECRET_ACCESS_KEY=your_secret_here
AWS_REGION=eu-north-1
S3_BUCKET=file-upload-bucket-task1

### Frontend Setup (React)
cd frontend
npm install
npm start


Open http://localhost:3000

### Update your backend URL in:

frontend/src/services/api.js


Example:

const API_BASE_URL = "https://task1-backend-fastapi.onrender.com/upload";

 ### Deployment
Frontend:

Deployed via Netlify

Build with npm run build

Live Demo: https://effervescent-frangipane-72b1dc.netlify.app

Backend:

 ### Deployed via Render 

Configured to read environment variables and handle uploads securely.

### Workflow Summary

User uploads a file using the React frontend.

The frontend sends the file to FastAPI via a POST request.

FastAPI uses boto3 to upload the file to the configured AWS S3 bucket.

The response is sent back to the frontend with success/failure status.

###  Future Enhancements

Support multiple simultaneous uploads

Add file history and metadata tracking

Implement JWT-based authentication

Integrate drag-and-drop uploads

Add download and delete functionality

