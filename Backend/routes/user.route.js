const express = require('express');
const router = express.Router();
const UserController=require('../controllers/user.controller');
const upload=require('../utils/upload');

router.route('/').get(UserController.index);
router.route('/:id').get(UserController.find);
router.route('/profile/:id').get(UserController.userProfile);
router.route('/create').post(UserController.create);
router.route('/findname/:name').get(UserController.findByName);
router.route('/update/:id').put(UserController.update);
router.route('/savepost/:userId').put(UserController.savePost);
router.route('/savenote').post(UserController.saveNote);
router.route('/notes/:userId').get(UserController.getNote);
router.route('/checknote').put(UserController.checkNote);
router.route('/deletenote').delete(UserController.deleteNote);
router.route('/delete/:id').delete(UserController.delete);
//router.route('/upload/avatar/:userId').post(upload.single('avatar'),UserController.updateAvatar);
router.route('/upload/avatar/:userId').put(UserController.updateAvatar);
router.route('/login').post(UserController.login);
router.route('/login/app').post(UserController.loginApp);
router.route('/savedpost/:id').get(UserController.getSavedPost);
router.route('/push-token/:id').put(UserController.pushToken);
router.route('/notifications/:id').get(UserController.getNoitificaions);
router.route('/follow').post(UserController.updateFollow);

module.exports = router;