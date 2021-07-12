const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const jwtDecode = require('jwt-decode');


// Signup funtion
exports.signup = (req,res,next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        corpName: req.body.corpName
    });

    console.log(newUser);

    User.addUser(newUser,(err,user) =>{

        if(err){
            if(err.code === 11000){
                res.json({
                    success: false,
                    message: "Email ID already Exist",
                })
            } else{
                res.json({
                    success: false,
                    message: "Failed to create User",
                    error: err
                })
          }
        } else {
            res.json({
                success: true,
                message: "User Registration successful",
                
            })
        }
    });
}

// Login funtion
exports.login = async (req,res,next) => {
    
    User.getUserByEmail(req.body.email, (err,user)=>{
        if (err) throw err;

        if(!user){
            return res.json({
                success: false,
                message: "User Not found",

            })
        }

        User.comparePassword(req.body.password, user.password, (err, isMatch)=>{
            if(err) throw err;

            if(isMatch){
                const token = jwt.sign({user}, process.env.JWT_SECRET_KEY ,{
                    expiresIn: 604800 // 1 week
                });

                res.json({
                    success: true,
                    token: "JWT " + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        corpName: user.corpName,
                        email: user.email,
                        premium : user.premium,
                        role:user.role,
                        token: token
                    }
                });
            }
            else{
                return res.json({
                    success: false,
                    message: "Invalid Password"
                })
            }
        })
    })
}

// Dashboard funtion
exports.dashboard = async (req,res,next) => {

    // console.log(req.headers);

    res.json({
        status:"Success",
        user: req.user
    });

}

// Validate funtion

exports.validate =  (req,res,next) => {
    // 1) Get the token and check if it exist

  
   if(req.headers.authorization){

    let value = req.headers.authorization;
    let [jwt, newToken]= value.split(' ')
    // console.log(jwt);
    // const token = newToken;
    const decoded = jwtDecode(newToken);
      //The User is Logged in.
  
        res.json({                          
            authenticated : true,
            username : decoded.user.name
        })
  }

    else{
        res.json({
            authenticated: false,
            username: null
        })
    }
}

