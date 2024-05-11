const express = require('express');
require('./config/connect');
const userRoute= require('./routes/user');
const adminRoute= require('./routes/admin');

const cors = require('cors');
const app = express();
const userapi= require('./routes/user')
const adminapi= require('./routes/admin')

app.use(express.json());
app.use(cors());



app.use('/user',userapi);
app.use('/user',userRoute);

app.use('/admin',adminapi);
app.use('/admin',adminRoute);



app.listen( 3000 , ()=>{
    console.log('server work');
});