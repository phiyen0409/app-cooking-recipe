const express = require('express');
const router = express.Router();
const PostController=require('../controllers/post.controller');

router.route('/').get(PostController.index);
router.route('/:id').get(PostController.find);
router.route('/create/:userId').post(PostController.create);
router.route('/addcomment/:postId').post(PostController.addComment);
router.route('/deletecomment/:postId').delete(PostController.deleteComment);
router.route('/findtitle/:title').get(PostController.findByTitle);
router.route('/findauthor/:userid').get(PostController.findByAuthor);

router.route('/update/:postId').put(PostController.updateLike);
// router.route('/delete/:id').delete(PostController.delete);

module.exports = router;