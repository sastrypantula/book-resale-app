const express = require('express')
const app = express();
require('dotenv').config();
const main =  require('./config/db')
const cookieParser =  require('cookie-parser');
const redisClient=require('./config/redis')

app.use(express.json());
app.use(cookieParser());

const authRouter = require('./src/routes/userAuth');
app.use('/user', authRouter);

main()
.then(async ()=>{
     await redisClient.connect();
    app.listen(process.env.PORT, ()=>{
        console.log("Server listening at port number: "+ process.env.PORT);
    })
})
.catch(err=> console.log("Error Occurred: "+err)); 