const express = require('express');

const router = express.Router();
const {
  createUser,
  userSignIn,
  uploadProfile,
  signOut,
  deleteUser,
  addPostIdToPostList,
  editProfileUser,
  addFollower,
  addFollowing,
  addAdoption,
  addNotification,
  getAllUsers,
  getUser,
  getAdoptionList,
  getFollowers,
  getFollowing
} = require('../controllers/user');

const { isAuth } = require('../middlewares/auth');
const {
  validateUserSignUp,
  userVlidation,
  validateUserSignIn
} = require('../middlewares/validation/user');

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

router.post('/create-user', validateUserSignUp, userVlidation, createUser);
router.post('/get-user', getUser);
router.get('/get-all-users', getAllUsers);
router.post('/sign-in', validateUserSignIn, userVlidation, userSignIn);
router.post('/sign-out', isAuth, signOut);
router.post(
  '/upload-profile',
  isAuth,
  uploads.single('profile'),
  uploadProfile
);
router.patch('/edit-profile/:id', editProfileUser);
router.delete('/delete-user/:id', deleteUser);

router.post('/add-post-user/:id', addPostIdToPostList);
router.delete('/delete-post-user/:id');

router.post('/add-follower/:id', addFollower);
router.get('/get-followers/:id', getFollowers);
router.patch('/delete-follower/:id');

router.post('/add-following/:id', addFollowing);
router.get('/get-following/:id', getFollowing);
router.patch('/delete-following/:id');

router.post('/add-adoption/:id', addAdoption);
router.get('/get-adoption-list/:id', getAdoptionList);
router.patch('/delete-all-adoption/:id');

router.post('/add-notification/:id', addNotification);
router.patch('/delete-notification/:id');

module.exports = router;