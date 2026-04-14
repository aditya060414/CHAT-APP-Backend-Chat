# Chat Service - Installation

This service handles real-time chat functionality using Express, MongoDB, and Redis.

## Installations

Run the following commands in the `backend/chat` directory:

```bash
# Initialize project (if not already done)
npm install

# Install core dependencies
npm i express dotenv mongoose axios cors redis jsonwebtoken

# Install dev dependencies
npm i -D typescript nodemon concurrently @types/express @types/dotenv @types/mongoose @types/cors @types/redis @types/jsonwebtoken
```

## Environment Variables

Create a `.env` file in the `backend/chat` directory with the following keys:

```env
PORT=5002
MONGO_URL=your_mongodb_url
REDIS_URL=your_redis_url
JWT_SECRET=your_jwt_secret
```

## Running the Service

```bash
# Production build
npm run build

# Development mode
npm run dev

# Start production build
npm start
```