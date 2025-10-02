# 🚌 NTC Bus Tracker API

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

**A comprehensive real-time bus tracking system API for Sri Lanka's National Transport Commission (NTC)**

[Features](#-features) • [Quick Start](#-quick-start) • [API Documentation](#-api-documentation) • [Testing](#-testing)

</div>

---

## 🌟 Features

### 🔐 **Authentication & Authorization**
- **JWT-based authentication** with secure token management
- **Role-based access control** (Admin, Operator, Commuter)
- **Protected endpoints** with proper permission validation

### 🛣️ **Route Management**
- Complete CRUD operations for bus routes
- Route information with start/end points and distance
- Public access for route viewing

### 🚌 **Bus Fleet Management**
- Real-time bus location tracking
- Bus status monitoring (running/stopped)
- Route assignment for buses

### 🚍 **Trip Management**
- Trip scheduling with departure/arrival times
- Bus and route assignment
- Real-time trip tracking

### 🔒 **Security Features**
- CORS protection
- Environment-based configuration
- Secure password hashing with bcrypt

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** (local or cloud instance)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/Real-Time-Bus-Tracking-System.git
   cd Real-Time-Bus-Tracking-System
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Database Configuration
   MONGO_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/bus_tracking_system
   
   # Server Configuration
   PORT=4000
   NODE_ENV=development
   
   # JWT Configuration
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   TOKEN_EXPIRES_IN=2h
   
   # CORS Configuration
   CORS_ORIGIN=*
   ```

4. **Start the server**
   ```bash
   npm start
   ```

5. **Verify installation**
   ```bash
   curl http://localhost:4000
   # Expected response: {"message":"NTC Bus Tracker API running"}
   ```

---

## 📁 Project Structure

```
ntc-bus-tracker/
├── 📂 src/
│   ├── 📂 controllers/          # Business logic
│   │   ├── auth.controller.js
│   │   ├── buses.controller.js
│   │   ├── routes.controller.js
│   │   └── trips.controller.js
│   ├── 📂 middleware/           # Custom middleware
│   │   ├── auth.middleware.js
│   │   ├── role.middleware.js
│   │   └── error.middleware.js
│   ├── 📂 models/              # Database schemas
│   │   ├── user.model.js
│   │   ├── route.model.js
│   │   ├── bus.model.js
│   │   └── trip.model.js
│   ├── 📂 routes/              # API routes
│   │   ├── auth.routes.js
│   │   ├── bus.routes.js
│   │   ├── route.routes.js
│   │   └── trip.routes.js
│   ├── 📂 utils/               # Utilities
│   │   └── seed.js
│   ├── app.js                  # Express app configuration
│   └── server.js              # Server entry point
├── 📂 data/                   # Seed data
│   └── seed.json
├── 📄 .env                    # Environment variables
├── 📄 package.json
└── 📄 README.md
```

---

## 🔐 User Roles & Permissions

| Role | Description | Permissions |
|------|-------------|-------------|
| **👑 Admin** | System administrator | • Full access to all endpoints<br>• Create/manage routes<br>• Manage all buses and trips |
| **🚌 Operator** | Bus operator/driver | • Update bus locations<br>• Create/manage trips<br>• View all data |
| **👤 Commuter** | Regular user/passenger | • View buses, routes, and trips<br>• Read-only access |

---

## 📚 API Documentation

### Base URL
```
http://localhost:4000/api
```

### 🔐 Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "username": "admin_user",
  "password": "admin123",
  "role": "admin"  // admin | operator | commuter
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "username": "admin_user",
  "password": "admin123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 🛣️ Route Endpoints

#### Get All Routes (Public)
```http
GET /routes
```

#### Add New Route (Admin Only)
```http
POST /routes
Authorization: Bearer {token}
Content-Type: application/json

{
  "routeNumber": "138",
  "start": "Colombo Fort",
  "end": "Malabe",
  "distanceKm": 25.5
}
```

### 🚌 Bus Endpoints

#### Get All Buses (Public)
```http
GET /buses
```

#### Update Bus Location (Admin/Operator)
```http
PUT /buses/{busId}/location
Authorization: Bearer {token}
Content-Type: application/json

{
  "lat": 6.9271,
  "lng": 79.8612
}
```

### 🚍 Trip Endpoints

#### Get All Trips (Public)
```http
GET /trips
```

#### Add New Trip (Admin/Operator)
```http
POST /trips
Authorization: Bearer {token}
Content-Type: application/json

{
  "bus": "60f1b2b3c4d5e6f7g8h9i0j1",
  "route": "60f1b2b3c4d5e6f7g8h9i0j2",
  "departureTime": "2024-10-02T08:00:00.000Z",
  "arrivalTime": "2024-10-02T09:30:00.000Z"
}
```

---

## 🧪 Testing

### Using Postman

1. **Import the collection**
   ```
   File: NTC_Bus_Tracker_API.postman_collection.json
   ```

2. **Test workflow**
   ```
   1. Register users (Admin, Operator, Commuter)
   2. Login with different roles
   3. Test role-based permissions
   4. Verify error responses for unauthorized access
   ```

### Expected Responses

**✅ Success Response**
```json
{
  "message": "Success message",
  "data": { ... }
}
```

**❌ Error Response (403 Forbidden)**
```json
{
  "message": "Access denied. Required roles: admin. Your role: commuter"
}
```

**❌ Error Response (401 Unauthorized)**
```json
{
  "message": "Unauthorized, no token"
}
```

---

## 🛠️ Development

### Available Scripts

```bash
# Start development server
npm start

# Start with nodemon (auto-restart)
npm run dev

# Run tests
npm test

# Seed database with sample data
npm run seed
```

### Environment Setup

**Development**
```env
NODE_ENV=development
PORT=4000
```

**Production**
```env
NODE_ENV=production
PORT=5000
```

---

## 🔧 Configuration

### Database Models

#### User Model
```javascript
{
  username: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ["admin", "operator", "commuter"])
}
```

#### Route Model
```javascript
{
  routeNumber: String (required),
  start: String (required),
  end: String (required),
  distanceKm: Number
}
```

#### Bus Model
```javascript
{
  busNumber: String (required),
  route: ObjectId (ref: "Route"),
  currentLocation: {
    lat: Number,
    lng: Number
  },
  status: String (enum: ["running", "stopped"])
}
```

#### Trip Model
```javascript
{
  bus: ObjectId (ref: "Bus"),
  route: ObjectId (ref: "Route"),
  departureTime: Date,
  arrivalTime: Date
}
```

---

## 🚨 Error Handling

The API implements comprehensive error handling:

- **400 Bad Request** - Invalid request data
- **401 Unauthorized** - Missing or invalid token
- **403 Forbidden** - Insufficient permissions
- **404 Not Found** - Resource not found
- **500 Internal Server Error** - Server errors

---

## 🔒 Security Features

- **JWT Authentication** with configurable expiration
- **Role-based Authorization** with middleware protection
- **Password Hashing** using bcrypt
- **CORS Protection** for cross-origin requests
- **Environment Variables** for sensitive configuration
- **Input Validation** for all endpoints

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support

For support and questions:
- **Email**: support@ntc-bus-tracker.lk
- **Issues**: [GitHub Issues](https://github.com/your-username/Real-Time-Bus-Tracking-System/issues)

---

<div align="center">

**Built with ❤️ for Sri Lanka's Public Transportation System**

</div>