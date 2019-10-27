const User = require("../models/user.model");
const Post = require("../models/user.post");
const mongoose = require("mongoose");
const moment = require("moment");

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
  findByTilte: async (req, res) => {
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
    let {title} = req.body;
    let {description} = req.body;
    let {image} = req.body;
    let {author} = req.body;
    let createdDate = moment().format("DD/MM/YYYY")
    let user = new User({
      title: title,
      description: description,
      image: image,
      author: author,
      totalLike: 0,
      totalComment: 0,
      totalSaved: 0,
      createdDate: createdDate
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
  }
};
