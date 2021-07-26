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
const submissionRouter = require('./routes/submission');

const { json, urlencoded } = express;
require('dotenv').config();
connectDB();
const app = express();
const server = http.createServer(app);

const NEW_MSG = 'new_msg';
const io = socketio(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
});

io.on('connection', (socket) => {
  let cookies = socketCookieParser(socket.handshake.headers.cookie);
  try {
    let verifiedToken = jwt.verify(cookies.token, process.env.JWT_SECRET);
    console.log('connected - verifiedToken', verifiedToken);
  } catch (err) {
    socket.disconnect();
    console.log('invalid token - socket disconnected');
  }

  socket.on(NEW_MSG, (data) => {
    console.log('data', data);
  });

  socket.on('disconnect', () => {
    //socket.leave(room);
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
