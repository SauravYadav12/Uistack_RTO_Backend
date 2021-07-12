const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    name:{
        type: String
    },
    email:{
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type: String,
        enum:['super-admin','admin','marketing','support','user'],
        default: 'user'
    },
    active:{
        type: Boolean,
        default: true,
        select: false
    },
    premium:{
        type: Boolean,
        default:false,
        select: true
    },
    plan:{
        type: String,
        enum: ['free','platinum','business'],
        default: 'free'
    },
    corpName:{
        type:String,
        required: true
    }
}, {
    timestamps: true
})


const User =  mongoose.model('User',UserSchema);
module.exports = User;

// Get user By ID
module.exports.getUserById =  function(id,callback){
    User.findById(id, callback);
}


// Adding a User
module.exports.addUser =  function(newUser, callback){
    console.log("Models", newUser)
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(newUser.password,salt,(err,hash)=>{
            if(err){
                console.log(err);
            } else{
            newUser.password = hash;
            newUser.save(callback);
         }
        });
    });
}

// Get User by Email 

module.exports.getUserByEmail = function(email, callback){
    const query = {email:email}
    User.findOne(query,callback);
}


// Compare password
module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword,hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch)
    })
}