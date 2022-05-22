const express = require('express');

const router = express.Router();
const {
  createPost,
  editPost,
  addComment,
  editComment,
  deleteComment,
  deletePost,
  getPostById,
  getPostsUser,
  addLike,
  deleteLike,
  likeComment,
  unlikeComment
} = require('../controllers/post');

const multer = require('multer');

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb('invalid image file!', false);
  }
};
const uploads = multer({ storage, fileFilter });

router.post('/create-post/:id', createPost);
router.get('/get-post/:id', getPostById);
router.get('/get-all-posts/:id', getPostsUser);
router.patch('/edit-post/:id', editPost);
router.delete('/delete-post/:id', deletePost);

router.post('/add-comment/:id', addComment);
router.post('/add-like-to-comment/:id', likeComment);
router.delete('/delete-like-comment/:id', unlikeComment);
router.patch('/edit-comment/:id', editComment);
router.delete('/delete-comment/:id', deleteComment);

router.post('/add-like/:id', addLike);
router.delete('/delete-like/:id', deleteLike);

module.exports = router;
