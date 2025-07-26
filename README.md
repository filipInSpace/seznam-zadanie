# Seznam Zadanie

Full-stack shopping list application

## Tech Stack

### Backend

- Node.js + Express – lightweight API server
- UUID – for unique ID generation
- Filesystem (fs) – to simulate a JSON-based "database" (`db/db.json`)

### Frontend

- Vite + React + TypeScript
- React Router – client-side navigation

## Features

- Create, edit, and delete shopping lists
- Add and remove items from a list
- Responsive layout
- No database required – all data is stored locally in `db/db.json`

## How to Run

### 1. Clone the repo

`git clone https://github.com/your-username/seznam-zadanie.git`
`cd seznam-zadanie`

### 2. Start the backend

`cd api`
`npm install`
`node server.js`

Server runs at http://localhost:5000

### 3. Start the frontend

`cd ../app`
`npm install`
`npm run dev`

App runs at http://localhost:5173
