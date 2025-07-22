const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    firstName:{
        type: String,
        required: true,
        minLength:3,
        maxLength:20
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        trim: true,
        lowercase:true,
        immutable: true,
    },
    role:{
        type:String,
        enum:['buyer','seller'],
        required:true,
    },
    booksPurchased:{
        type:[{
            bookId:{
                type:String,
                required:true
            },
            bookName:{
                type:String,
                required:true
            },
            purchasePrice:{
                type:Number,
                required:true
            },
            bookImage:{
                type:String,
                required:true
            },
            sellerId:{
                type:String,
                required:true
            },
            purchaseDate:{
                type:Date,
                default:Date.now
            }
        }],
        default:[]
    },
    password:{
        type:String,
        required: true
    }
},{
    timestamps:true
});


const User = mongoose.model("user",userSchema);

module.exports = User;
