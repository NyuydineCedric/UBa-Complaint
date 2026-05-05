# Backend server

This project includes a simple Express backend for users and complaints.

## Run the backend

1. Install dependencies from the project root:
   ```bash
   npm install
   ```
2. Start the backend server:
   ```bash
   npm run server
   ```

The API will be available at `http://localhost:4000/api`.

## Frontend proxy

The frontend uses Vite proxy configuration so `/api` requests are forwarded to the backend.

## Data storage

User and complaint data are stored in `server/data.json`.
