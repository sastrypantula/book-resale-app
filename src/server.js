const express = require('express')
const app = express();
require('dotenv').config();
const main =  require('../config/db')
const cookieParser =  require('cookie-parser');
const redisClient=require('../config/redis')
const authRouter = require('./routes/userAuth');
const buyerRouter = require('./routes/buyerRouter');
const sellerRouter = require('./routes/sellerRouter');

app.use(express.json());
app.use(cookieParser());


app.use('/user', authRouter);
app.use('/buyer',buyerRouter);
app.use('/seller',sellerRouter);

const InitalizeConnection = async ()=>{
    try{
await Promise.all([main(), redisClient.connect()]);
app.listen(process.env.PORT, () => {
    console.log("Server listening at port number: " + process.env.PORT);
});
}
catch(err){
    console.log("Error Occurred: "+err); 
}
}
InitalizeConnection();