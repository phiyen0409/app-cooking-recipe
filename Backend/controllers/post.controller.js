const User = require("../models/user.model");
const Post = require("../models/post.model");
const mongoose = require("mongoose");
const moment = require("moment");
const ImageHelper = require("../utils/ImageHelper");
const NotificationHelper = require("../utils/NotificationHelper");

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
  listPostSorted: async (req, res) => {
    try {
      let posts = await Post.find({ isHide: false })
        .populate({ path: "author" })
        .populate({ path: "comments.user" })
        .sort({ createdDate: "desc" });
      let { userId } = req.params;
      let user = await User.findById(userId);
      let listResult = [];
      for (let i = 0; i < posts.length; i++) {
        let date = moment(posts[i].createdDate)
          .format("DD/MM/YYYY hh:mm A")
          .toString();
        let isLiked;
        let isSaved;
        if (posts[i].userLiked.includes(userId)) {
          isLiked = true;
        } else {
          isLiked = false;
        }
        if (user.listPostsSaved.includes(posts[i]._id)) {
          isSaved = true;
        } else {
          isSaved = false;
        }
        listResult.push({
          _id: posts[i]._id,
          title: posts[i].title,
          description: posts[i].description,
          image: posts[i].image,
          author: posts[i].author.name,
          author_id: posts[i].author._id,
          totalLike: posts[i].totalLike,
          totalComment: posts[i].totalComment,
          totalSaved: posts[i].totalSaved,
          createdDate: date,
          userLiked: posts[i].userLiked,
          comments: posts[i].comments,
          ingredients: posts[i].ingredients,
          detail: posts[i].detail,
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
      let post = await Post.findById(id).populate({ path: "comments.user" });
      if (post < 1) {
        return res.json({
          message: "No post created"
        });
      } else {
        res.json(post);
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
      let { image } = req.body;
      let { title } = req.body;
      let { description } = req.body;
      let { author } = req.body;
      let createdDate = moment();
      let { ingredients } = req.body;
      let { detail } = req.body;
      if (image === undefined) {
        image = "";
      }

      for (let i = 0; i < detail.length; i++) {
        if (detail[i].image === undefined) {
          detail[i].image = "";
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
    try {
      let { id } = req.params;
      let post = await Post.findById(id);
      if (!post) {
        return res.status(500).json({
          message: "No post"
        });
      }
      let { image } = req.body;
      let { title } = req.body;
      let { description } = req.body;
      let { ingredients } = req.body;
      let { detail } = req.body;
      if (image === undefined) {
        image = "";
      } else if (
        req.body.image.includes(
          "https://cookingapp1.herokuapp.com/public/uploads/"
        )
      ) {
        image = req.body.image;
      }

      for (let i = 0; i < detail.length; i++) {
        if (detail[i].image === undefined) {
          detail[i].image = "";
        } 
        else if(req.body.detail[i].image.includes("https://cookingapp1.herokuapp.com/public/uploads/")){
          detail[i].image=req.body.detail[i].image;
        }
      }
      post.title = title;
      post.description = description;
      post.image = image;
      post.ingredients = ingredients;
      post.detail = detail;
      await post.save();
      res.status(201).json({
        message: "Post updated"
      });
    } catch (err) {
      console.log(err);
    }
  },
  delete: async (req, res) => {
    let { id } = req.params;
    let post = await Post.findById(id);
    post.isHide = true;
    await post.save();
    if (!post) {
      return res.status(500).json({
        message: "No post"
      });
    }
    try {
      res.json({
        message: "post deleted"
      });
    } catch (err) {
      res.json(err);
    }
  },
  updateLike: async (req, res) => {
    try {
      let post = await Post.findById(req.params.postId).populate({ path: "author" });
      let user = await User.findById(req.body.userId);
      let author = post.author;
      if (post.userLiked.includes(user._id)) {
        post.userLiked.remove(user);
        post.totalLike -= 1;
        await post.save();
        user.listLikesPost.remove(post);
        await user.save();
        
        for( var i = 0; i < author.notifications.length; i++){ 
          let notification =  author.notifications[i];
          if (notification.user._id.toString() == user._id.toString()) {
           
            author.notifications.splice(i, 1); 
            i--;
          }
       }
        
        await author.save();
        res.status(201).json({
          message: "Updated unlike"
        });
      } else {
        post.userLiked.push(user);
        post.totalLike += 1;
        await post.save();
        user.listLikesPost.push(post);
        await user.save();

        let listTokens = author.tokens;
        let title ="App Cooking Recipe";
        let body = user.name + " đã thích bài viết "+ post.title + " của bạn";

        author.notifications.push({
          user : user,
          content : body,
          time: moment().format("DD/MM/YYYY hh:mm A").toString(),
          title: title
        });

        NotificationHelper.sendNotification(listTokens, title, body, {}, null);
        await author.save();

       

        res.status(201).json({
          message: "Updated like"
        });
      }
    } catch (err) {
      console.log(err);
    }
  },
  addComment: async (req, res) => {
    try {
      let post = await Post.findById(req.params.postId);
      let { user } = req.body;
      let { content } = req.body;
      let date = new Date(
        new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
      );
      date = moment(date).format("DD/MM/YYYY hh:mm A");
      let comment = { user: user, content: content, date: date };
      post.comments.push(comment);
      post.totalComment += 1;
      await post.save();
      res.status(201).json({
        message: "Comment added"
      });
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      let post = await Post.findById(req.params.postId);
      let commentId = req.body.commentId;
      post.comments.remove({ _id: commentId });
      post.totalComment -= 1;
      await post.save();
      res.status(201).json({
        message: "Comment deleted"
      });
    } catch (err) {
      console.log(err);
    }
  }
};
