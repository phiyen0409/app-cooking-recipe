const User = require("../models/user.model");
const Post = require("../models/post.model");
const mongoose = require("mongoose");
const moment = require("moment");
const upload = require("../utils/upload");

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
    let { avatar } = req.body;
    let { phone } = req.body;
    user.name = name;
    user.birthday = birthday;
    user.avatar = avatar;
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
      let userDelete = await User.deleteOne({ _id: id });
      res.json({
        message: "User deleted"
      });
    } catch (err) {
      res.json(err);
    }
  },
  login: async (req, res) => {
    try {
      let { email } = req.body;
      user = await User.findOne({ email: email });
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
      let user = await User.findById(req.params.userId);
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
      let note = { post: post._id, title: post.title, listIngre: ingreNote };
      user.listNotes.push(note);
      await user.save();
      res.status(201).json({
        message: "Added note"
      });
    } catch (err) {
      console.log(err);
    }
  },
  deleteNote: async (req, res) => {
    try {
      let user = await User.findById(req.params.userId);
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
    try {
      // let savImage = upload.single('avatar');
      //   savImage(req,res,function(err) {
      //     if(err) {
      //         return  res.status(400).json({
      //           message : "Error uploading file."
      //         });
      //     }
      // });
      // console.log(req.file);
      if (req.file === undefined) {
        return res.status(400).json({ message: "No file received" });
      } else {
        let user = await User.findById(req.params.userId);
        user.avatar = req.file.path;
        user.save()
          .then(result=>{
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
  }
};
