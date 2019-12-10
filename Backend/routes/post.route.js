const express = require('express');
const router = express.Router();
const PostController=require('../controllers/post.controller');

router.route('/').get(PostController.index);
router.route('/postsorted/:userId').get(PostController.listPostSorted);
router.route('/trending/:userId').get(PostController.listPostTrending);
router.route('/:id').get(PostController.find);
router.route('/create').post(PostController.create);
router.route('/addcomment/:postId').post(PostController.addComment);
router.route('/deletecomment/:postId').delete(PostController.deleteComment);
router.route('/findtitle/:title').get(PostController.findByTitle);
router.route('/findauthor/:userid').get(PostController.findByAuthor);

router.route('/updatelike/:postId').put(PostController.updateLike);
router.route('/update/:id').put(PostController.update);
router.route('/delete/:id').put(PostController.delete);

module.exports = router;