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
    password: {type: String, required: [true, "Không được bỏ trống"], index: true},
    listPostsCreated: [{type: mongoose.Schema.Types.ObjectId, ref: 'Posts'}],
    listLikesPost:[{type: mongoose.Schema.Types.ObjectId, ref: 'Posts'}],
    listNote:[{type: mongoose.Schema.Types.ObjectId, ref: 'Posts'}],
    listSaved: [{type: mongoose.Schema.Types.ObjectId, ref: 'Posts'}]
});
const User = mongoose.model('Users',UserSchema);

module.exports = User;