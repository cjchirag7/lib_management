const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');

// Loading routers
const bookRouter = require('./routes/api/bookRouter')

const app= express();


// Bodyparser Middleware
app.use(bodyParser.json());

// DB config 
const mongoURI = require('./config/keys').mongoURI;

// Connect to mongo
mongoose.connect(mongoURI,{ useNewUrlParser: true, useCreateIndex: true })
.then(()=> {console.log("MongoDB Connected");})
.catch(err => console.log(err));


// Use routes
app.use('/api/books',bookRouter);

const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`Server started running on port ${port}`));