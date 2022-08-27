const express=require('express');
const app=express();
const morgan=require('morgan');
const mongoose=require('mongoose');
const cors=require('cors')

require('dotenv/config');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');



app.use(cors());
app.options('*',cors());

const api=process.env.API_URL;

//middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
app.use(errorHandler);


//Routes
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');


app.use(api+'/products',productsRoutes);
app.use(api+'/categories',categoriesRoutes);
app.use(api+'/orders',ordersRoutes);
app.use(api+'/users',usersRoutes);


//Database
mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>{
    console.log('Database ready..')
}).catch((err)=>{
    console.log(err)
})

app.listen(3001,()=>{
    // console.log('Hello Deepu')
    // console.log(api);
    console.log('Server is running at http://localhost:3001');
})