const express = require('express');
const createError = require('http-errors');
const dotenv=require('dotenv')
const db=require('./config/connection')

const cors = require('cors');

const app = express();

dotenv.config()

app.use(cors());
app.use(express.json())

const userRouter=require('./routes/user')
const expertRouter=require('./routes/expert')
const adminRouter=require('./routes/admin')



app.use('/',userRouter)
app.use('/expert',expertRouter)
app.use('/admin',adminRouter)


db.connect((err)=>{
  if(err) console.log("Connection Error"+err);
  else console.log("Database Connected to port 27017");

})

app.listen(3001, () => {
  console.log('Server started on 3001');
});
