const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router;
const dotenv = require('dotenv');
dotenv.config();
const app=express();
const port=process.env.PORT||3000;
const serveIndex = require('serve-index');
app.use('/public', express.static('public'), serveIndex('public', {'icons': true}));




const upload = require('./utils/upload');
//app.use('./uploads', express.static('uploads'));
// app.use(upload);
//app.use('/public',express.static('public'));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit:50000}));


const userRoutes=require('./routes/user.route');
const postRoutes=require('./routes/post.route');
const fileRoutes=require('./routes/file.route');
//mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_CONNECTION);
mongoose.connection.once(`open`,()=>{
    console.log('MONGODB Database is connected');
    app.listen(port,()=>console.log('Server started at PORT '+port));
});
// mongoose.connect(process.env.DB_CONNECTION, {useUnifiedTopology: true, useCreateIndex: true}).then(() => {
//     console.log('MONGODB Database is connected');
//     app.listen(port,()=>console.log('Server started at PORT '+port));
// });
//mongoose.set('useFindAndModify', false);

const user=require('./models/user.model');
const post=require('./models/post.model');

// const hostname = process.env.host;
// app.listen(port,hostname, function(){
//     console.log('Server listening on port '+port);
// });
// const host = process.env.HOST;
// const port = process.env.PORT;
// app.listen(port,host ,function(){
//     console.log('Server listening on port '+host+":"+port);
// });

app.use('/user', userRoutes);
app.use('/post', postRoutes);
app.use('/file', fileRoutes);