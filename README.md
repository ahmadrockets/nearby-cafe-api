# Nearby Cafe API
A production-ready Express.js API with Google OAuth authentication built with TypeScript, following industry best practices.

## 📁 Project Structure

## 🚀 Features

- **Google OAuth 2.0** authentication
- **TypeScript** for type safety
- **Modular architecture** with separation of concerns
- **Comprehensive logging** with Winston
- **Error handling** middleware
- **Security** with Helmet and CORS
- **Input validation** and sanitization
- **Environment configuration**
- **Production-ready** with proper error handling

## 🛠️ Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd google-auth-api
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
cp .env.example .env
```

4. **Configure Google OAuth:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google+ API
   - Create OAuth 2.0 Client ID
   - Add authorized redirect URIs:
     - `http://localhost:3000/auth/google/callback` (development)
     - `https://yourdomain.com/auth/google/callback` (production)

5. **Update .env file:**
```env
GOOGLE_CLIENT_ID=your-actual-client-id
GOOGLE_CLIENT_SECRET=your-actual-client-secret
SESSION_SECRET=your-random-secret-key
```

## 🏃‍♂️ Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

### Other Scripts
```bash
npm run lint          # Run ESLint
npm run lint:fix      # Fix ESLint issues
npm run test          # Run tests
npm run test:watch    # Run tests in watch mode
npm run clean         # Clean dist folder
```

## 📚 API Endpoints

### Authentication Routes
- `GET /auth/google` - Start Google OAuth flow
- `GET /auth/google/callback` - Google OAuth callback
- `GET /auth/profile` - Get user profile (protected with jwt)
- `POST /auth/logout` - Logout user
- `GET /auth/logout` - Logout user (alternative)
- `GET /auth/status` - Check authentication status
- `GET /auth/failure` - Authentication failure handler

### Utility Routes
- `GET /` - API information
- `GET /health` - Health check endpoint

## 📊 Logging

The application uses Winston for comprehensive logging:
- **Console logs** in development
- **File logs** in production
- **Error tracking** with stack traces
- **Request logging** with Morgan

Log files are stored in the `logs/` directory:
- `error.log` - Error logs only
- `combined.log` - All logs

## 🔄 Database Integration
The project is designed to work with any database. Currently uses in-memory storage for demo purposes.

### MongoDB Integration

### Redis Integration

## 🚀 Deployment