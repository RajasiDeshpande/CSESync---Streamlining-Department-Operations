# CSESync – Streamlining Departmental Operations

CSESync is a full-stack MERN application designed to streamline departmental operations, providing roles for Admin, Students, Professors, and Clubs to manage their activities efficiently.

## Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, React Router, Axios
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT, CORS, Dotenv

## Project Structure

```text
CSESync/
├── client/     (React frontend)
├── server/     (Node + Express backend)
└── README.md
```

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB URI (local or Atlas)

### Backend Setup

1. Navigate to the `server` directory: `cd server`
2. Install dependencies: `npm install`
3. Create a `.env` file and add your `MONGO_URI`, `PORT`, and `JWT_SECRET`.
4. Start the server: `npm run dev`

### Frontend Setup

1. Navigate to the `client` directory: `cd client`
2. Install dependencies: `npm install`
3. Start the Vite development server: `npm run dev`

## Features (Phase 1)

- Project structure and folder setup
- React frontend with Tailwind CSS
- Express backend with MongoDB connection
- Basic API connectivity check
