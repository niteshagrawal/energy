"ALL THE KEYS AND SECRETS WILL BE DELETED IN 7 DAYS" 

# Energy Projects App

## Overview
A full-stack web app to visualize renewable energy projects, with authentication, RBAC, charts, and filters.

## Tech Stack
- Frontend: React.js, TypeScript, Tailwind CSS, Chart.js, Firebase Auth
- Backend: Node.js, Express

## Setup

### Backend
1. `cd backend`
2. `npm install`
3. Add `.env` with your NREL API key.
4. `node index.js`

### Frontend
1. `cd frontend`
2. `npm install`
3. Add your Firebase config to `src/firebase.ts`.
4. `npm start`

## Features
- Email/password login (Firebase)
- Role-based access (admin/user)
- Fetches and displays renewable energy projects
- Search, filter, sort, charts
- Responsive UI

## (Optional) Architecture Diagram 