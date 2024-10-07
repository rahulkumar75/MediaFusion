# **MediaFusion: A Unified Platform for Video and Social Media Management API**

## **Overview**

**MediaFusion** is a comprehensive backend server application built using **Node.js**, **Express**, and **MongoDB**. It provides a scalable and modular architecture for video streaming and social media management. This API supports user management, tweet handling, video uploads, subscriptions, likes, comments, playlists, and a dashboard for admin use. Designed with flexibility and ease of integration, this application can power the backend for a variety of content-driven platforms.

## **Features**

- **User Management**: Handle user registration, login, profile updates, and authentication.
- **Health Check**: API endpoint to check the status and health of the server.
- **Tweet Management**: Create, update, delete, and retrieve tweets.
- **Video Streaming**: Upload, update, and stream videos.
- **Subscriptions**: Subscribe-unsubscribe, Stats of Subscribers and Channel Follow functionalities.
- **Comment and Like System**: Interact with videos and tweets using comments and likes.
- **Playlist Creation**: Manage video playlists.
- **Admin Dashboard**: Manage users, content, and get system-level insights.

## **Technologies Used**

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Middleware**: CORS, Cookie-Parser, Multer (for file uploads)
- **Environment Management**: dotenv
- **Utilities**: Nodemon (development), ESLint (code linting)

## **Project Structure**

The project follows a modular structure to keep the codebase clean, scalable, and maintainable.

### **Folder Structure**

```plaintext
.
├── node_modules
├── public               # Contains static assets
├── src
│   ├── controllers      # Route logic (business logic)
│   │   ├── comment.controller.js
│   │   ├── dashboard.controller.js
│   │   ├── healthcheck.controller.js
│   │   ├── like.controller.js
│   │   ├── playlist.controller.js
│   │   ├── subscription.controller.js
│   │   ├── tweet.controller.js
│   │   ├── user.controller.js
│   │   └── video.controller.js
│   ├── db               # Database configuration
│   │   └── index.js
│   ├── middlewares      # Custom middlewares (auth, multer, etc.)
│   │   ├── auth.middleware.js
│   │   └── multer.middleware.js
│   ├── models           # Mongoose schemas
│   │   ├── comment.model.js
│   │   ├── like.model.js
│   │   ├── playlist.model.js
│   │   ├── subscription.model.js
│   │   ├── tweet.model.js
│   │   ├── user.model.js
│   │   ├── video.model.js
│   ├── routes           # API routes
│   │   ├── comment.routes.js
│   │   ├── dashboard.routes.js
│   │   ├── healthcheck.routes.js
│   │   ├── like.routes.js
│   │   ├── playlist.routes.js
│   │   ├── subscription.routes.js
│   │   ├── tweet.routes.js
│   │   ├── user.routes.js
│   │   └── video.routes.js
│   ├── utils            # Utility functions
│   │   ├── ApiError.js
│   │   ├── ApiResponse.js
│   │   ├── asyncHandler.js
│   │   ├── cloudnary.js
│   ├──app.js           # Main entry point
│   ├── constants.js
│   └── index.js
└── package.json         # Project metadata and dependencies
```

## **Installation**

### **Requirements**
- **Node.js** (version 14.x or above)
- **MongoDB** (local or cloud instance)

### **Setup Instructions**

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/MediaFusion.git
   ```

2. **Navigate into the project directory**:
   ```bash
   cd MediaFusion
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Environment Configuration**:
   - Create a `.env` file in the root directory and add the following:
     ```bash
     PORT=8080
     CORS_ORIGIN=http://localhost:3000
     MONGO_URI=your_mongo_database_uri
     JWT_SECRET=your_jwt_secret_key
     ```
   - Replace the values with your actual MongoDB URI and JWT secret.

5. **Start the application**:
   ```bash
   npm start
   ```

   The server will run at `http://localhost:8080`.

## **API Endpoints**

### **User Routes**
- **POST /api/v1/users/register**: Register a new user.
- **POST /api/v1/users/login**: Authenticate a user and return a JWT.
- **GET /api/v1/users/profile**: Get the logged-in user's profile.

### **Health Check**
- **GET /api/v1/healthcheck**: Check the status and health of the server.

### **Tweet Routes**
- **POST /api/v1/tweets**: Create a new tweet.
- **GET /api/v1/tweets**: Get all tweets.
- **GET /api/v1/tweets/:id**: Get a specific tweet by ID.
- **PATCH /api/v1/tweets/:id**: Update a tweet by ID.
- **DELETE /api/v1/tweets/:id**: Delete a tweet by ID.

### **Video Routes**
- **POST /api/v1/videos**: Upload a new video.
- **GET /api/v1/videos**: Get all videos.
- **GET /api/v1/videos/:id**: Get a specific video by ID.
- **PATCH /api/v1/videos/:id**: Update a video by ID.
- **DELETE /api/v1/videos/:id**: Delete a video by ID.

### **Comment Routes**
- **POST /api/v1/comments**: Add a comment on a tweet or video.
- **GET /api/v1/comments**: Retrieve all comments.
- **DELETE /api/v1/comments/:id**: Delete a comment by ID.

### **Like Routes**
- **POST /api/v1/likes**: Like or unlike a tweet or video.

### **Subscription Routes**
- **POST /api/v1/subscriptions**: Subscribe to a user.
- **GET /api/v1/subscriptions**: Get subscriptions for the logged-in user.

### **Playlist Routes**
- **POST /api/v1/playlist**: Create a new playlist.
- **GET /api/v1/playlist**: Get all playlists.

### **Admin Dashboard Routes**
- **GET /api/v1/dashboard**: Admin route to get system-level insights.

## **Middleware**

- **Authentication Middleware**: Secures private routes and verifies JWT tokens.
- **Multer Middleware**: Handles file uploads for videos using Multer.

## **Error Handling**
The API utilizes centralized error handling with custom error messages for invalid routes, bad requests, authentication errors, and more.

