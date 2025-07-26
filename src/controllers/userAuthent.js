const User =  require("../models/user")
const Book = require("../models/book") // Import Book model for populate to work
const validate = require('../utils/validator');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const redisClient = require('../../config/redis.js')

const register = async (req,res)=>{
    
    try{
        // Debug: Check what we're receiving
        console.log("Request body:", req.body);
        console.log("Request headers:", req.headers);
        
        // Handle text/plain content-type (parse JSON string)
        let bodyData = req.body;
        if (typeof req.body === 'string') {
            bodyData = JSON.parse(req.body);
        }
        
        // Check if bodyData exists
        if (!bodyData) {
            throw new Error("Request body is missing");
        }
        
        // validate the data;
       validate(bodyData); 
      const {name, email, password, role}  = bodyData;
      bodyData.password = await bcrypt.hash(password, 10);

    //
    
     const user =  await User.create(bodyData);
     const token =  jwt.sign({_id:user._id , email:email},process.env.JWT_KEY,{expiresIn: 60*60});
     res.cookie('token',token,{maxAge: 60*60*1000});
     res.status(201).send("User Registered Successfully");
    }
    catch(err){
        res.status(400).send("Error: "+err);
    }
}


const login = async (req,res)=>{

    try{
        // Debug: Check what we're receiving
        console.log("Login - Request body:", req.body);
        console.log("Login - Request headers:", req.headers['content-type']);
        
        // Handle both JSON and text/plain content-type
        let bodyData = req.body;
        if (typeof req.body === 'string') {
            bodyData = JSON.parse(req.body);
        }
        
        const {email, password} = bodyData;

        if(!email)
            throw new Error("Invalid Credentials");
        if(!password)
            throw new Error("Invalid Credentials");

          const user = await User.findOne({ email });
if (!user) throw new Error("Invalid Credentials");

const match = await bcrypt.compare(password, user.password);
if (!match) throw new Error("Invalid Credentials");


        const token =  jwt.sign({_id:user._id , email:email},process.env.JWT_KEY,{expiresIn: 60*60});
        res.cookie('token',token,{maxAge: 60*60*1000});
        res.status(200).send("Logged In Succeessfully");
    }
    catch(err){
        res.status(401).send("Error: "+err);
    }
}


// logOut feature

const logout = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(400).send("No token provided.");
    }

    // Decode token just to get its expiry
    const payload = jwt.decode(token);

    if (!payload || !payload.exp) {
      return res.status(400).send("Invalid token.");
    }

    // Block token in Redis until it naturally expires
    await redisClient.set(`token:${token}`, 'Blocked');
    await redisClient.expireAt(`token:${token}`, payload.exp);

    // Clear cookie from the browser
    res.cookie("token", null, {
      expires: new Date(Date.now())
    });

    res.send("Logged Out Successfully");
  } catch (err) {
    res.status(503).send("Error: " + err.message);
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const role = req.user.role;

    const user = await User.findById(userId)
      

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: `${role} profile fetched`,
      data: user
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};






module.exports = { register, login, logout,getProfile};

