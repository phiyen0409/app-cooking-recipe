const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router;
const dotenv = require('dotenv');
dotenv.config();
const multer = require('multer');
const upload = multer({dest:'./Image/'})

const app=express();
const port=3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



const userRoutes=require('./routes/user.route');
const postRoutes=require('./routes/post.route');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_CONNECTION, {useUnifiedTopology: true, useCreateIndex: true}).then(() => {
    console.log('MONGODB Database is connected')
});
//mongoose.set('useFindAndModify', false);

const user=require('./models/user.model');
const post=require('./models/post.model');

app.listen(port,function(){
    console.log('Server listening on port '+port);
});
app.use('/user', userRoutes);
app.use('/post', postRoutes);