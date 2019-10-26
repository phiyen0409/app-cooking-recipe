const express = require('express');
const router = express.Router();
const UserController=require('../controllers/user.controller');

router.route('/').get(UserController.index);
router.route('/:id').get(UserController.find);
router.route('/create').post(UserController.create);
router.route('/findname/:name').get(UserController.findByName);
router.route('/update/:id').put(UserController.update);
router.route('/delete/:id').delete(UserController.delete);

module.exports = router;