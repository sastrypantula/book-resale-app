const mongoose = require('mongoose');
const {Schema} = mongoose;

const sellerSchema = new Schema({
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
    book:{
        type:[{
            bookId:{
                type:String,
                required:true
            },
            bookName:{
                type:String,
                required:true
            },
            bookPrice:{
                type:Number,
                required:true
            },
            bookImage:{
                type:String,
                required:true
            }
        }],
        required:true
    },
    bookssold:{
        type:Number,
        default:0
    },
    password:{
        type:String,
        required: true
    }
},{
    timestamps:true
});


const seller = mongoose.model("seller",sellerSchema);

module.exports = seller;
