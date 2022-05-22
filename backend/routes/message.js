const express = require('express');

const router = express.Router();
const {
  createMessage,
  getMessageById,
  deleteMessage
} = require('../controllers/message');

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

router.post('/create-message', createMessage);git 
router.delete('/delete-message/:id', deleteMessage);
router.get('/get-message/:id', getMessageById);

module.exports = router;
