const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema=new Schema({
    name: String,
    birthday: String,
    avatar: String,
    phone: String,
    email: {type: String,
        lowercase: true,
        unique: true,
        required: [true, "Không được bỏ trống"],
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        index: true},
    password: String,
    listPostsCreated: [{type: mongoose.Schema.Types.ObjectId, ref: 'Posts'}],
    listLikesPost:[{type: mongoose.Schema.Types.ObjectId, ref: 'Posts'}],
    listNotes:[{
        post: {type: mongoose.Schema.Types.ObjectId, ref: 'Posts'},
        listIngre: [{
            ingreName: String,
            ingreWeight: String,
            ingreCheck: Boolean
        }]
    }],
    listPostsSaved: [{type: mongoose.Schema.Types.ObjectId, ref: 'Posts'}],
    tokens: [],
    notifications: [],
});
const User = mongoose.model('Users',UserSchema);

module.exports = User;