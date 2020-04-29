require('dotenv').config()

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

//routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');



const app = express();

//DB Connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(()=>{ console.log('DB CONNECTED')}).catch(err => console.log(err))

//Port
const PORT = 8000


//middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


/* app.use((req, res, next) => {
    res.set({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Authorization'
    })
    next();
  }) */


//Routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', orderRoutes);


//starting server
app.listen(PORT, ()=>{
    console.log(`app is running on ${PORT}`);
})