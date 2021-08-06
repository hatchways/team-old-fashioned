const colors = require('colors');
const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const socketCookieParser = require('./utils/socketCookieParser');
const cors = require('cors');
const { notFound, errorHandler } = require('./middleware/error');
const connectDB = require('./db');
const { join } = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const jwt = require('jsonwebtoken');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const conversationRouter = require('./routes/conversation');
const s3Router = require('./routes/s3');
const contestRouter = require('./routes/contest');
const notificationRouter = require('./routes/notification');
const paymentRouter = require('./routes/payment');
const submissionRouter = require('./routes/submission');
const emailRouter = require('./routes/email');
const { socketCreateNotification } = require('./controllers/notification');

const { json, urlencoded } = express;
require('dotenv').config();
connectDB();
const app = express();
const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: '*',
    credentials: true,
  },
});

let connectedUsers = [];
const addUser = (email, socketId) => {
  const user = connectedUsers.find((u) => u.email === email);
  if (!user) {
    connectedUsers.push({ email, socketId });
  } else {
    user.socketId = socketId;
  }
};

const removeUser = (socketId) => {
  connectedUsers = connectedUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (email) => {
  return connectedUsers.find((user) => user.email === email);
};

io.on('connection', (socket) => {
  let cookies = socketCookieParser(socket.handshake.headers.cookie);
  try {
    let verifiedToken = jwt.verify(cookies.token, process.env.JWT_SECRET);
    console.log('connected - verifiedToken', verifiedToken);
  } catch (err) {
    socket.disconnect();
    console.log('invalid token - socket disconnected');
  }

  socketCreateNotification(socket, connectedUsers);

  // add user to logged in
  socket.on('USER_LOGIN', (data) => {
    addUser(data, socket.id);
    io.to(socket.id).emit('loggedin');
    io.emit('GET_USERS', connectedUsers);
  });

  socket.on('SEND_MESSAGE', ({ receiver, conversationId, message }) => {
    const receiverId = getUser(receiver);
    if (receiverId) {
      io.to(receiverId.socketId).emit('GET_MESSAGE', { conversationId, message });
    }
  });

  socket.on('disconnect', () => {
    // remove user from logged in
    removeUser(socket.id);
    io.emit('GET_USERS', connectedUsers);
  });
});

if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
}
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/upload', s3Router);
app.use('/contest', contestRouter);
app.use('/notifications', notificationRouter);
app.use('/conversation', conversationRouter);
app.use('/submission', submissionRouter);
app.use('/payments', paymentRouter);

app.use('/email', emailRouter);
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')));

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname), 'client', 'build', 'index.html'));
} else {
  app.get('/', (req, res) => {
    res.send('API is running');
  });
}

app.use(notFound);
app.use(errorHandler);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});

module.exports = { app, server };
