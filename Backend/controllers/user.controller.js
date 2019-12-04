const User = require("../models/user.model");
const Post = require("../models/post.model");
const mongoose = require("mongoose");
const moment = require("moment");
const upload = require("../utils/upload");
const ImageHelper = require("../utils/ImageHelper");

module.exports = {
  index: async (req, res) => {
    try {
      let users = await User.find();
      if (users < 1) {
        return res.json({
          message: "No user created"
        });
      } else {
        res.json(users);
      }
    } catch (err) {
      res.json(err);
    }
  },
  find: async (req, res) => {
    let id = req.params.id;
    try {
      let user = await User.findById(id);
      if (user < 1) {
        return res.json({
          message: "No user created"
        });
      } else {
        res.json(user);
      }
    } catch (err) {
      res.json(err);
    }
  },
  findByName: async (req, res) => {
    let name = req.params.name;
    try {
      let users = await User.find({ name: { $regex: name } });
      if (users < 1) {
        return res.json({
          message: "Not found"
        });
      } else {
        res.json(users);
      }
    } catch (err) {
      res.json(err);
    }
  },
  create: async (req, res) => {
    let name = req.body.name;
    let birthday = moment(req.body.birthday, "DD/MM/YYYY").format("DD/MM/YYYY");
    let avatar = req.body.avatar;
    let phone = req.body.phone;
    let email = req.body.email;
    // let password = req.body.password;
    let user = new User({
      name: name,
      birthday: birthday,
      avatar: avatar,
      phone: phone,
      email: email
      // password: password
    });
    user
      .save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "User created"
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  },
  update: async (req, res) => {
    let { id } = req.params;
    let user = await User.findById(id);
    if (!user) {
      return res.status(500).json({
        message: "No user"
      });
    }
    let { name } = req.body;
    let birthday = moment(req.body.birthday, "DD/MM/YYYY").format("DD/MM/YYYY");
    let { phone } = req.body;

    user.name = name;
    user.birthday = birthday;
    user.phone = phone;
    user
      .save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "User updated"
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  },
  delete: async (req, res) => {
    let { id } = req.params;
    let user = await User.findById(id);
    if (!user) {
      return res.status(500).json({
        message: "No user"
      });
    }
    try {
      await User.deleteOne({ _id: id });
      res.json({
        message: "User deleted"
      });
    } catch (err) {
      res.json(err);
    }
  },
  login: async (req, res) => {
    try {
      let { email } = req.body.user;
      console.log(email);
      user = await User.findOne({ email: email });
      if (!user) {
        let newUser = new User({
          name: req.body.user.name,
          email: req.body.user.email,
          avatar: req.body.user.photoUrl
        });
        newUser.save().then(result => {
          return res.json({
            message: "New user created!",
            data: result
          });
        });
      } else {
        res.json(user);
      }
    } catch (err) {
      console.log(err);
    }
  },
  savePost: async (req, res) => {
    try {
      let user = await User.findById(req.params.userId);
      let post = await Post.findById(req.body.postId);
      if (user.listPostsSaved.includes(post._id)) {
        user.listPostsSaved.remove(post);
        await user.save();
        res.status(201).json({
          message: "Updated unsaved"
        });
      } else {
        user.listPostsSaved.push(post);
        await user.save();
        res.status(201).json({
          message: "Updated saved"
        });
      }
    } catch (err) {
      console.log(err);
    }
  },
  saveNote: async (req, res) => {
    try {
      let user = await User.findById(req.body.userId);
      let post = await Post.findById(req.body.postId);
      let ingrePost = post.ingredients;
      let ingreNote = [];
      var i;
      for (i = 0; i < ingrePost.length; i++) {
        ingreItem = {
          ingreName: ingrePost[i].name,
          ingreWeight: ingrePost[i].weight,
          ingreCheck: 0
        };
        ingreNote.push(ingreItem);
      }
      let note = { post: post._id, listIngre: ingreNote };
      user.listNotes.push(note);
      await user.save();
      res.status(201).json({
        message: "Added note"
      });
    } catch (err) {
      console.log(err);
    }
  },
  getNote: async (req, res) => {
    try {
      let user = await User.findById(req.params.userId).populate({
        path: "listNotes.post"
      });
      let ingreNote = user.listNotes;
      if (ingreNote < 1) {
        return res.json({
          message: "No note"
        });
      } else {
        res.json(ingreNote);
      }
    } catch (err) {
      console.log(err);
    }
  },
  checkNote: async (req, res) => {
    try {
      let { userId } = req.body;
      let { noteId } = req.body;
      let { ingreId } = req.body;
      let user = await User.findById(userId);
      let flag;
      for (let i = 0; i < user.listNotes.length; i++) {
        if (user.listNotes[i]._id == noteId) {
          let note = user.listNotes[i];
          for (let j = 0; j < note.listIngre.length; j++) {
            if (note.listIngre[j]._id == ingreId) {
              flag = note.listIngre[j].ingreCheck;
              break;
            }
          }
        }
      }
      await User.findOneAndUpdate(
        { _id: userId },
        {
          $set: {
            "listNotes.$[a].listIngre.$[b].ingreCheck": flag ? false : true
          }
        },
        { arrayFilters: [{ "a._id": noteId }, { "b._id": ingreId }] }
      );

      res.status(201).json({
        message: "updated check note"
      });
    } catch (err) {
      console.log(err);
    }
  },
  deleteNote: async (req, res) => {
    try {
      let user = await User.findById(req.body.userId);
      let { noteId } = req.body;
      user.listNotes.remove({ _id: noteId });
      await user.save();
      res.status(201).json({
        message: "Deleted note"
      });
    } catch (err) {
      console.log(err);
    }
  },
  updateAvatar: async (req, res) => {
    // try {
    //   // let savImage = upload.single('avatar');
    //   //   savImage(req,res,function(err) {
    //   //     if(err) {
    //   //         return  res.status(400).json({
    //   //           message : "Error uploading file."
    //   //         });
    //   //     }
    //   // });
    //   // console.log(req.file);
    //   if (req.file === undefined) {
    //     return res.status(400).json({ message: "No file received" });
    //   } else {
    //     let user = await User.findById(req.params.userId);
    //     user.avatar = req.file.path;
    //     user.save()
    //       .then(result=>{
    //         return res.json({
    //           message: "File is uploaded successfully!",
    //           data: result
    //       });
    //     });
    //   }
    // } catch (err) {
    //   console.log(err);
    //   return res.status.json({
    //     error: err
    //   });
    // }

    try {
      if (req.body.avatar === undefined) {
        return res.status(400).json({ message: "No file received" });
      } else {
        let callBack;
        let fileName = await ImageHelper.saveImageBase64(
          "./public/uploads",
          req.body.avatar
        );
        let user = await User.findById(req.params.userId);
        console.log(fileName);
        user.avatar = fileName;
        user.save().then(result => {
          return res.json({
            message: "File is uploaded successfully!",
            data: result
          });
        });
      }
    } catch (err) {
      console.log(err);
      return res.status.json({
        error: err
      });
    }
  },
  userProfile: async (req, res) => {
    let id = req.params.id;
    try {
      let user = await User.findById(id);
      console.log(user);
      let posts = await Post.find({ author:id,isHide: false })
        .populate({ path: "comments.user" })
        .sort({ createdDate: "desc" });
        let totalRecipe = posts.length;
      let totalLike = 0;
      let totalComment = 0;
      let listResult = [];
      for (let i = 0; i < posts.length; i++) {
        totalLike = totalLike + posts[i].totalLike;
        totalComment = totalComment + posts[i].totalComment;
        let date = moment(posts[i].createdDate)
          .format("DD/MM/YYYY hh:mm A")
          .toString();
        let isLiked;
        let isSaved;
        if (posts[i].userLiked.includes(id)) {
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
      }
      console.log(listResult);
      if (user < 1) {
        return res.json({
          message: "No user created"
        });
      } else {
        res.json({
          user:user,
          posts: listResult,
          totalLike: totalLike,
          totalComment: totalComment,
          totalRecipe: totalRecipe
        });
      }
    } catch (err) {
      res.json(err);
    }
  },
  getSavedPost: async (req, res) => {
    try {
      let id = req.params.id;
      let user = await User.findById(id)
        .populate({ path: "listPostsSaved", match: { isHide: false } })
        .populate({
          path: "listPostsSaved",
          populate: [{ path: "comments.user" }, { path: "author" }]
        });
      let listResult = [];
      user.listPostsSaved.sort((a, b) => {
        if (a.createdDate > b.createdDate) {
          return -1;
        }
        if (a.createdDate < b.createdDate) {
          return 1;
        }
        return 0;
      });
      for (let i = 0; i < user.listPostsSaved.length; i++) {
        let date = moment(user.listPostsSaved[i].createdDate)
          .format("DD/MM/YYYY hh:mm A")
          .toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" });
        let isLiked;
        let isSaved;
        if (user.listPostsSaved[i].userLiked.includes(user._id)) {
          isLiked = true;
        } else {
          isLiked = false;
        }
        listResult.push({
          _id: user.listPostsSaved[i]._id,
          title: user.listPostsSaved[i].title,
          description: user.listPostsSaved[i].description,
          image: user.listPostsSaved[i].image,
          author: user.listPostsSaved[i].author.name,
          author_id: user.listPostsSaved[i].author._id,
          totalLike: user.listPostsSaved[i].totalLike,
          totalComment: user.listPostsSaved[i].totalComment,
          totalSaved: user.listPostsSaved[i].totalSaved,
          createdDate: date,
          userLiked: user.listPostsSaved[i].userLiked,
          comments: user.listPostsSaved[i].comments,
          ingredients: user.listPostsSaved[i].ingredients,
          detail: user.listPostsSaved[i].detail,
          isLiked: isLiked,
          isSaved: true
        });
      }
      if (listResult < 1) {
        return res.json({
          message: "No post saved"
        });
      } else {
        res.json(listResult);
      }
    } catch (err) {
      console.log(err);
    }
  },
  pushToken: async (req, res) => {
    try {
      let id = req.params.id;
      let token = req.body.token;
      let user = await User.findById(id);

      if (!user.tokens.includes(token)) {
        user.tokens.push(token);
        user
          .save()
          .then(result => {
            console.log(result);
            res.status(201).json({
              message: "update token successful"
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
          });
      }
      else{
        res.status(201).json({
          message: "Token is available!"
        });
      }
    } catch (error) {
      console.log(err);
    }
  },
  getNoitificaions : async (req, res) => {
    try {
      let id = req.params.id;
      let user = await User.findById(id);

      if(user != null)
      {
        res.status(200).json({
          message: "get data successful",
          notifications: user.notifications.reverse(),
        });
      }
      else{
        res.status(400).json({
          message: "User is not exist!",
        });
      }
      
    } catch (error) {
      console.log(err);
    }
  }
};
