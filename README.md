# Expense Tracker

A full-stack expense tracking application built with Express.js backend and React Native mobile app.

## 🏗️ Project Structure

```
expense-tracker/
├── backend/                    # Express.js API server
│   ├── src/                   # Source code
│   │   ├── server.ts         # Main server file
│   │   ├── transactions/     # Transaction-related modules
│   │   │   ├── controller.ts # Transaction controllers
│   │   │   ├── routes.ts     # Transaction routes
│   │   │   └── validators.ts # Input validation
│   │   ├── middleware/       # Express middleware
│   │   │   └── rateLimitter.ts # Rate limiting
│   │   └── utils/            # Utility functions
│   │       ├── db.ts         # Database connection
│   │       └── upstash.ts    # Redis/Upstash utilities
│   ├── dist/                 # Compiled JavaScript
│   └── package.json
├── mobile/                   # React Native/Expo app
│   ├── src/                 # Source code
│   ├── assets/              # Images, fonts, etc.
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (for mobile development)
- Git
- Neon Database account (for PostgreSQL)
- Upstash account (for Redis)

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory:

   ```env
   SERVER_URL=http://localhost
   PORT=3000
   DATABASE_URL=your_neon_database_url
   UPSTASH_REDIS_REST_URL=your_upstash_redis_url
   UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   npm start
   ```

### Mobile App Setup

1. Navigate to the mobile directory:

   ```bash
   cd mobile
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the Expo development server:

   ```bash
   npx expo start
   ```

4. Run on your device:
   - Scan the QR code with Expo Go app (iOS/Android)
   - Press `i` for iOS simulator
   - Press `a` for Android emulator

## 📱 Features

### Backend API

- **Express.js server** with TypeScript
- **PostgreSQL database** using Neon (serverless)
- **Input validation** with express-validator
- **Rate limiting** with Upstash Redis
- **RESTful API endpoints** for transactions
- **TypeScript compilation** with strict type checking
- **Environment configuration** with dotenv

### API Endpoints

- `POST /api/transactions` - Create new transaction
- `GET /api/transactions/:userId` - Get user transactions
- `PUT /api/transactions/:transactionId` - Update transaction
- `DELETE /api/transactions/:transactionId` - Delete transaction

### Mobile App

- React Native with Expo
- Cross-platform compatibility
- Real-time expense tracking
- User-friendly interface

## 🛠️ Tech Stack

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL (Neon)
- **Cache**: Redis (Upstash)
- **Validation**: express-validator
- **Package Manager**: npm
- **Development**: tsx (TypeScript execution)

### Mobile

- **Framework**: React Native
- **Platform**: Expo
- **Language**: TypeScript/JavaScript
- **Package Manager**: npm

## 📝 Available Scripts

### Backend Scripts

```bash
npm run dev          # Start development server with hot reload
npm run build        # Build TypeScript to JavaScript
npm run start        # Start production server
npm run clean        # Clean build directory
npm run type-check   # TypeScript type checking
```

### Mobile Scripts

```bash
npx expo start       # Start Expo development server
npx expo build       # Build for production
npx expo eject       # Eject from Expo managed workflow
```

## 🔧 Configuration

### TypeScript Configuration

- Strict type checking enabled
- ES2022 target
- Module resolution: node
- Path mapping for clean imports
- Source maps and declaration files

### Environment Variables

Create `.env` files in both backend and mobile directories as needed for:

- Database connections (Neon PostgreSQL)
- Redis connections (Upstash)
- API endpoints
- Authentication keys
- Environment-specific settings

## 📦 Dependencies

### Backend Dependencies

- `express`: Web framework
- `@neondatabase/serverless`: PostgreSQL database
- `@upstash/redis`: Redis client
- `@upstash/ratelimit`: Rate limiting
- `express-validator`: Input validation
- `dotenv`: Environment variable management
- `typescript`: TypeScript compiler
- `tsx`: TypeScript execution for development

### Mobile Dependencies

- `expo`: React Native development platform
- `react-native`: Mobile app framework
- Additional dependencies will be added as features are implemented

## 🗄️ Database Schema

### Transactions Table

```sql
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    title VARCHAR(100) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('income', 'expense')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔒 Security Features

- **Input Validation**: All API inputs are validated using express-validator
- **Rate Limiting**: API endpoints are protected with rate limiting
- **Type Safety**: Full TypeScript implementation with strict type checking
- **SQL Injection Protection**: Using parameterized queries with Neon database

## 🚀 Deployment

### Backend Deployment

1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Set environment variables on your hosting platform
4. Ensure database and Redis connections are configured

### Mobile Deployment

1. Build for production: `npx expo build`
2. Submit to app stores (iOS App Store, Google Play Store)
3. Or distribute via Expo's build service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions:

- Check the documentation
- Open an issue on GitHub
- Review the code comments

---

**Happy coding! 💰📱**
