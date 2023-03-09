const express = require('express');
const path = require('path');
// const createError = require('http-errors');
const dotenv = require('dotenv');
const db = require('./config/connection');
const bodyParser = require('body-parser');
const http = require('http');

const { errorHandler } = require('./middlewares/error');
const cors = require('cors');

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(bodyParser.json({ limit: '15mb' })); //Whatever size you feel you require
app.use(
  bodyParser.urlencoded({
    limit: '15mb',
    extended: true,
    parameterLimit: 100000, //Amount of parameters you feel is required
  })
);

const userRouter = require('./routes/user');
const expertRouter = require('./routes/expert');
const adminRouter = require('./routes/admin');

// server
const server = http.createServer(app);

//socket.io
const io = require('socket.io')(server, {
  cors: {
    origin: 'https://care4pets.life',
    methods: ['GET', 'POST'],
  },
});

app.use('/', userRouter);
app.use('/expert', expertRouter);
app.use('/admin', adminRouter);

// Making Build Folder as Public
app.use(express.static(path.join(__dirname, '../client/build/')));

app.use(errorHandler);

// for server
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

global.onlineUsers = new Map(); // holds all active sockets

io.on('connection', (socket) => {
  //take userId and socketId from user
  socket.on('addUser', (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on('sendMessage', ({ from, to, message, time }) => {
    const sendUserSocket = onlineUsers.get(to);
    if (sendUserSocket) {
      io.to(sendUserSocket).emit('getMessage', {
        from,
        message,
        time,
      });
    } else {
      console.log('user is offline');
    }
  });
});

db.connect((err) => {
  if (err) console.log('Connection Error' + err);
  else console.log('Database Connected to port 27017');
});

server.listen(3001, () => {
  console.log('Server started on 3001');
});
