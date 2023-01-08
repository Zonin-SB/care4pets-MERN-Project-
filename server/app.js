const express = require('express');
const createError = require('http-errors');
const dotenv=require('dotenv')
const db=require('./config/connection')
// const multer  = require('multer')
// const path = require('path');
// const upload = require('./middlewares/fileUpload')
// const fileURLToPath=require('url')
var bodyParser = require('body-parser')

const cors = require('cors');

const app = express();

dotenv.config()

app.use(cors());
app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({limit:'50mb',extended:true}));

app.use(bodyParser.json({ limit: "15mb" })); //Whatever size you feel you require
app.use(bodyParser.urlencoded({
  limit: "15mb",
  extended: true,
  parameterLimit: 100000, //Amount of parameters you feel is required
}));


const userRouter=require('./routes/user')
const expertRouter=require('./routes/expert')
const adminRouter=require('./routes/admin')



app.use('/',userRouter)
app.use('/expert',expertRouter)
app.use('/admin',adminRouter)

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


db.connect((err)=>{
  if(err) console.log("Connection Error"+err);
  else console.log("Database Connected to port 27017");

})

app.listen(3001, () => {
  console.log('Server started on 3001');
});
