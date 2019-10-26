const User = require("../models/user.model");
const mongoose = require("mongoose");
const moment = require("moment");

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
    let password = req.body.password;
    let user = new User({
      name: name,
      birthday: birthday,
      avatar: avatar,
      phone: phone,
      email: email,
      password: password
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
    try{
        let userDelete = await User.deleteOne({_id: id});
            res.json({
                message:"User deleted"
            });  
    }catch(err) {
        res.json(err);
      };
  }
  
};
