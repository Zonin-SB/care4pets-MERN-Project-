const express = require('express');
const createError = require('http-errors');
const dotenv = require('dotenv');
const db = require('./config/connection');
const bodyParser = require('body-parser');
const http = require('http');

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
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use('/', userRouter);
app.use('/expert', expertRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});
// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

global.onlineUsers = new Map(); // holds all active sockets

io.on('connection', (socket) => {
  console.log('user connected');
  //take userId and socketId from user
  socket.on('addUser', (userId) => {
    console.log('add user');
    onlineUsers.set(userId,socket.id)
  //  console.log(global.onlineUsers);
  });

  socket.on('sendMessage', ({ from, to, message, time }) => {
    // console.log(from);
    // console.log(to);
    // console.log(message);
    // console.log(time);
    const sendUserSocket = onlineUsers.get(to);
    // console.log(sendUserSocket,'user sock');
    if(sendUserSocket){

      // const messages={message:message,time:time}
      // let values={}
      // values.from=from,
      // values.to=to,
      // values.messages=messages
      // io.to(sendUserSocket).emit("getMessage",values)
      io.to(sendUserSocket).emit("getMessage",{
        from,
        message,
        time
      })
    }else{
      console.log('user is offline');
    }
  });
});

// socket.current.emit("sendMessage",{
//   from:userId,
//   to:id,
//   message:message,
//   time:time,
// })

db.connect((err) => {
  if (err) console.log('Connection Error' + err);
  else console.log('Database Connected to port 27017');
});

server.listen(3001, () => {
  console.log('Server started on 3001');
});

// app.listen(3001, () => {
//   console.log('Server started on 3001');
// });
