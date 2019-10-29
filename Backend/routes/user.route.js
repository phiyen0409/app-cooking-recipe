const express = require('express');
const router = express.Router();
const UserController=require('../controllers/user.controller');

router.route('/').get(UserController.index);
router.route('/:id').get(UserController.find);
router.route('/create').post(UserController.create);
router.route('/findname/:name').get(UserController.findByName);
router.route('/update/:id').put(UserController.update);
router.route('/savepost/:userId').put(UserController.savePost);
router.route('/savenote/:userId').post(UserController.saveNote);
router.route('/deletenote/:userId').delete(UserController.deleteNote);
router.route('/delete/:id').delete(UserController.delete);
router.route('/upload/avatar/:id').post(UserController.updateAvatar);

module.exports = router;