const User = require("../models/user.model");
const Post = require("../models/post.model");
const mongoose = require("mongoose");
const moment = require("moment");
const ImageHelper = require("../utils/ImageHelper");

module.exports = {
  index: async (req, res) => {
    try {
      let posts = await Post.find();
      if (posts < 1) {
        return res.json({
          message: "No post created"
        });
      } else {
        res.json(posts);
      }
    } catch (err) {
      res.json(err);
    }
  },
  listPostSorted:async (req, res) => {
    try {
      let posts = await Post.find().populate({path: 'author'}).populate({path: 'comments.user'}).sort({ createdDate: 'desc' });
      let {userId}=req.params;
      let user=await User.findById(userId);
      let listResult=[];
      for (let i=0; i<posts.length;i++){
        let date=moment(posts[i].createdDate).format("DD/MM/YYYY hh:mm A").toString();
        let isLiked;
        let isSaved;
        if (posts[i].userLiked.includes(userId)) {
          isLiked=true;
        } else {
          isLiked=false;
        }
        if (user.listPostsSaved.includes(posts[i]._id)) {
          isSaved=true;
        } else {
          isSaved=false;
        }
        listResult.push({
          _id:posts[i]._id,
          title: posts[i].title,
          description: posts[i].description,
          image: posts[i].image,
          author:posts[i].author.name,
          author_id: posts[i].author._id,
          totalLike: posts[i].totalLike,
          totalComment: posts[i].totalComment,
          totalSaved: posts[i].totalSaved,
          createdDate: date,
          userLiked:posts[i].userLiked,
          comments:posts[i].comments,
          ingredients:posts[i].ingredients,
          detail:posts[i].detail,
          isLiked: isLiked,
          isSaved: isSaved
        });
        console.log(listResult);
      }
      if (posts < 1) {
        return res.json({
          message: "No post created"
        });
      } else {
        res.json(listResult);
      }
    } catch (err) {
      res.json(err);
    }
  },
  find: async (req, res) => {
    let id = req.params.id;
    try {
      let post = await Post.findById(id);
      if (post < 1) {
        return res.json({
          message: "No post created"
        });
      } else {
        res.json(user);
      }
    } catch (err) {
      res.json(err);
    }
  },
  findByAuthor: async (req, res) => {
    let userid = req.params.userid;
    try {
      let post = await Post.find({ author: userid });
      if (post < 1) {
        return res.json({
          message: "Not found"
        });
      } else {
        res.json(post);
      }
    } catch (err) {
      res.json(err);
    }
  },
  findByTitle: async (req, res) => {
    let title = req.params.title;
    try {
      let posts = await Post.find({ title: { $regex: title } });
      if (posts < 1) {
        return res.json({
          message: "Not found"
        });
      } else {
        res.json(posts);
      }
    } catch (err) {
      res.json(err);
    }
  },
  create: async (req, res) => {
    try {
      let image;
      let { title } = req.body;
      let { description } = req.body;
      let { author } = req.body;
      let createdDate = moment();
      let { ingredients } = req.body;
      let { detail } = req.body;
      if (req.body.image === undefined) {
        image="";
      }
      else{
        let fileName = await ImageHelper.saveImageBase64("./public/uploads",req.body.image);
        image = fileName;
      }

      for(let i=0;i<detail.length;i++){
        if(detail[i].image===undefined){
          detail[i].image = "";
        }
        else{
          let fileName = await ImageHelper.saveImageBase64("./public/uploads",detail[i].image);
          detail[i].image = fileName;
        }
      }
      let post = new Post({
        title: title,
        description: description,
        image: image,
        author: author,
        totalLike: 0,
        totalComment: 0,
        totalSaved: 0,
        createdDate: createdDate,
        ingredients: ingredients,
        detail: detail
      });
      // let user= await User.findById(author).populate('listPostsCreated');
      let user = await User.findById(author);
      // post.author=user;
      await post.save();
      user.listPostsCreated.push(post);
      await user.save();
      res.status(201).json({
        message: "Post created"
      });
      
    } catch (err) {
      console.log(err);
    }
  },
  update: async (req, res) => {
    let post = await Post.findById(req.params.postId);
    let { title } = req.body;
    let { description } = req.body;
    let { image } = req.body;
    let { ingredients } = req.body;
    let { detail } = req.body;

    post.title = title;
    post.description = description;
    post.image = image;
    post.ingredients = ingredients;
    post.detail = detail;
  },
  // update: async (req, res) => {
  //   let { id } = req.params;
  //   let user = await User.findById(id);
  //   if (!user) {
  //     return res.status(500).json({
  //       message: "No user"
  //     });
  //   }
  //   let { name } = req.body;
  //   let birthday = moment(req.body.birthday, "DD/MM/YYYY").format("DD/MM/YYYY");
  //   let { avatar } = req.body;
  //   let { phone } = req.body;
  //   user.name = name;
  //   user.birthday = birthday;
  //   user.avatar = avatar;
  //   user.phone = phone;
  //   user
  //     .save()
  //     .then(result => {
  //       console.log(result);
  //       res.status(201).json({
  //         message: "User updated"
  //       });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       res.status(500).json({
  //         error: err
  //       });
  //     });
  // },
  // delete: async (req, res) => {
  //   let { id } = req.params;
  //   let user = await User.findById(id);
  //   if (!user) {
  //     return res.status(500).json({
  //       message: "No user"
  //     });
  //   }
  //   try {
  //     let userDelete = await User.deleteOne({ _id: id });
  //     res.json({
  //       message: "User deleted"
  //     });
  //   } catch (err) {
  //     res.json(err);
  //   }
  // },
  updateLike: async (req, res) => {
    try {
      let post = await Post.findById(req.params.postId);
      let user = await User.findById(req.body.userId);
      if (post.userLiked.includes(user._id)) {
        post.userLiked.remove(user);
        post.totalLike-=1;
        await post.save();
        user.listLikesPost.remove(post);
        await user.save();
        res.status(201).json({
          message: "Updated unlike"
        });
      } else {
        post.userLiked.push(user);
        post.totalLike+=1;
        await post.save();
        user.listLikesPost.push(post);
        await user.save();
        res.status(201).json({
          message: "Updated like"
        });
      }
    } catch (err) {
      console.log(err);
    }
  },
  addComment: async(req,res)=>{
    try{
      let post = await Post.findById(req.params.postId);
      let {user}=req.body;
      let {content}=req.body;
      let date = moment().format("DD/MM/YYYY hh:mm A");
      let comment={"user": user, "content": content,"date": date};
      post.comments.push(comment);
      post.totalComment+=1;
      await post.save();
      res.status(201).json({
        message: "Comment added"
      });
    }catch(err){
      console.log(err)
    }
  },
  deleteComment: async(req,res)=>{
    try{
      let post = await Post.findById(req.params.postId);
      let commentId=req.body.commentId;
      post.comments.remove({_id: commentId});
      post.totalComment-=1;
      await post.save();
      res.status(201).json({
        message: "Comment deleted"
      });
    }catch(err){
      console.log(err);
    }
  }
  
};
