# ChitChat - MERN Chat App

ChitChat is a full-stack chat application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The app provides real-time chat functionality with features such as friend requests, profile management, and user search. It uses Socket.io for real-time communication and JWT-based authentication and authorization.

## Features

- **Authentication**: 
  - Signup using email, username, password, and avatar picture.
  - Login using either email or username.
  - JWTs used for secure authentication and authorization.

- **Profile Management**:
  - Update profile information including username, name, email, and password.
  - Upload avatar using `multer`.

- **Friends Management**:
  - Accept or decline friend requests.
  - View and manage friends list.
  - Search through your friends.
  - Chat with friends directly from the friends list.
  - Remove friends from your list.

- **User Search**:
  - Search for other users and send them friend requests.

- **Chat**:
  - Select from past conversations or start a new chat.
  - Real-time messaging using `Socket.io`.
  - Messages are delivered only between two friends by storing online users' socket IDs in Redis.

- **Logging**:
  - Used `morgan` for HTTP request logging in the backend.

## Technologies Used

### Backend:
- **Node.js** and **Express.js**: For building the server and API.
- **MongoDB**: NoSQL database used to store user information, chats, and friends.
- **Mongoose.js**: ODM library for MongoDB.
- **Socket.io**: For real-time communication between users.
- **JWT (JSON Web Token)**: For secure authentication and authorization.
- **Multer**: For handling file uploads (user avatars).
- **Redis**: Used to store online users' socket IDs for efficient message delivery.
- **Morgan**: For logging HTTP requests.

### Frontend:
- **React.js**: For building the user interface.
- **React Router**: For handling routing in the app.
- **Axios**: For making API requests to the backend.

## Setup and Installation

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running
- Redis installed and running

### Installation Steps

1. Clone the repository:
```
git clone https://github.com/Abobakr7/ChitChat.git
cd ChitChat
```

2. Install server-side dependencies:
```
cd backend
npm install
```

3. Install client-side dependencies:
```
cd frontend
npm install
```

4. Create a `.env` file in the `backend` folder with the following environment variables:
```
PORT=
JWT_SECRET=
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
FE_URL=

# databases
DB_URI=
TEST_DB_URI=
REDIS_URI=
TEST_REDIS_URI=

# nodemailer
USER_EMAIL=
USER_PASSWORD=

# cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

5. Run the backend server:
```
cd backend
npm run start
```

6. Run the frontend development server:
```
cd ../frontend
npm run dev
```

### Usage
- Signup/Login: Create an account or log in using your email or username.
- Profile: Update your profile details, including your avatar.
- Friends: Manage your friends list, accept/decline requests, and start a chat.
- Search: Find users and send them friend requests.
- Chat: Start a real-time chat with your friends.
