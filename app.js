const express = require('express');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const users = require('./routes/users');
const customer = require('./routes/customer');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = express();
//CORS Middleware
app.use(cors({ origin: "http://localhost:4200", credentials: true }))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));




//Database Setup
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB Connections successfull'))
  .catch(()=>console.log("Could not establish database connection"));



//Set Static folder
app.use(express.static(__dirname + '/dist/frontend'));

app.get('/', function(req,res){
res.sendFile(path.join(__dirname, '/dist/frontend', 'index.html'))
});


//PORT
const port = process.env.PORT || 5000;


//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

//Index Route
app.get('/',(req,res)=>{
    res.send('Invalid Endpoint')
})

//User Routes
app.use('/users',users);
// customer routes
app.use('/customers',customer);


//Start Server
app.listen(port, () => {
  console.log(`App running on port ${port}... `);
});