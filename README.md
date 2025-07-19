# Nearby Café – Backend API

☕ Backend server for **Nearby Café** app – helping users find cafés nearby using **AI**, **OpenStreetMap**, and **geolocation**.

## Demo 
Watch on youtube : [https://www.youtube.com/watch?v=bHFIHSrG6VU](https://www.youtube.com/watch?v=bHFIHSrG6VU)

## 🚀 Features
- 🧠 **AI-powered natural language search** using Open AI 
- 📍 Get cafés location using coordinates **Forsquare** API
- 🌍 Integratation with **Openroute** API Service for getting location route.
- 🌍 Integratation with **Open Street Map** API Service for get coordinate by name.
- ⚡ Simple and clean REST API for the frontend  
- 🔐 Basic security: Oauth Google + JWT and Redis for cache.

---

## 🛠️ Tech Stack

- [Express.js](https://expressjs.com/) - for backend framework.
- [OpenAI API](https://platform.openai.com/docs) - For understanding intent and generate answer. 
- [Forsquare](https://openrouteservice.org/) – To fetch data cafe by location.  
- [Open Route Service](https://openrouteservice.org/) – To fetch route map.
- [Open Street Map API](https://www.openstreetmap.org/) – To get coordinate by name. 
- [MongoDB](https://www.mongodb.com/) – For Database  
- [Redis](https://www.mongodb.com/) – Redis for JWT token TTL & Chat cache.
- [Winston](https://github.com/winstonjs/winston) = For Apps Loging.

---

## 📦 Getting Started

### 1.  Clone the repository
```bash
git https://github.com/ahmadrockets/nearby-cafe-api.git
cd nearby-cafe-backend
```
### 2. Install dependencies
```
npm install
```

### 3. Set environment variables
Copy `.env.example` to `.env` and configure:
```
NODE_ENV=development
PORT=3000

# Session Configuration
SESSION_SECRET=your-super-secret-session-key-change-this-in-production

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback

# Frontend URL
FRONTEND_URL=http://localhost:3001

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=900

# Mongodb Configuration
MONGODB_URI="mongodb://localhost:27017/nearby-cafe"

# Redis
REDIS_URI="redis://admin:password@localhost:6380"

# Forsquare
FOURSQUARE_API_KEY=fsq_xxx_your_secret_key

# Open Route Service
OPENROUTESERVICE_API_KEY=oproutesrvc_xxx_your_secret_key"

# Open AI
OPENAI_API_KEY="openaikey_secret"
```

### 4. Run dev server
```
npm run dev
```
App will be run in: http://localhost:3000

### 5. Frontend Repo
- [Frontend Github Link](https://github.com/ahmadrockets/nearby-cafe-frontend)