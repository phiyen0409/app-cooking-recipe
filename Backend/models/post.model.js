const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema=new Schema({
    title: String,
    description: String,
    image: String,
    author:{type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
    // author: String,
    totalLike: Number,
    totalComment: Number,
    totalSaved: Number,
    createdDate: Date,
    userLiked:[{type: mongoose.Schema.Types.ObjectId, ref: 'Users'}],
    comments:[{
        user : {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
        content : String,
        date: String
    }],
    ingredients:[{
        name: String,
        weight: String
    }],
    detail:[{
        step: Number,
        title: String,
        image: String,
        content: String
    }],
    isHide:{
        type: Boolean,
        default: false
    }
});
const Post = mongoose.model('Posts',PostSchema);

module.exports = Post;