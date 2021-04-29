// Import dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const cors = require("cors");

const app = express();


// Import routes


app.use(express.json({ extended: false }));

app.use(bodyParser.json());
app.use(cookieParser());


app.user(express.static('client/build'))

const { User } = require('./models/user');
const { Post } = require('./models/post');
const { auth } = require('./middleware/auth');
const { Comment } = require('./models/comment');


//allow cors
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000" || "http://localhost:3001" || "http://localhost:3002"
  }));

  //allow static folder
  app.use('/uploads', express.static(__dirname + '/uploads'));







require("dotenv-flow").config();

// parse req of content type json
app.use(bodyParser.json());


mongoose.connect(
    process.env.DBHOST || "mongodb+srv://root:qHylQxUUVt8VVgPt@cluster0.emxz4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }
).catch(error => console.log("Error connecting to MongoDB :" + error));

mongoose.connection.once('open', () => console.log("Connected succesfully to MongoDB"));



// post, put, delete -> "CRUD"

require('./routes')(app, User, auth, Post, Comment);


if(process.env.NODE_ENV === 'production'){
    const path = require('path')
    app.get('/*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'../client','build','index.html'))
    })
}


const PORT = process.env.PORT || 3001;

// Starting server function
app.listen(PORT, function(){
    console.log("Server is UP on port :" + PORT)
})



module.exports = app;