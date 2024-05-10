const mongoose = require('mongoose') 
 

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        // unique:true
    },
    email:{
        type:String,
        required:true,
        // unique:true
    },
    password:{
        type:String,
        required:true,
        // unique:true
    },
    posts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'post'
    }],
    profilePic:{
        type:String,
        default:'default.jpg',
    }
})


module.exports = mongoose.model('user' ,userSchema)
 