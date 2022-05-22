const express = require('express');

const router = express.Router();
const {
    createAdoption,
    getAdoptionById,
    deleteAdoption
} = require('../controllers/adoption');

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

router.post('/create-adoption', createAdoption);
router.get('/get-adoption-request/:id', getAdoptionById);
router.delete('/delete-adoption/:id', deleteAdoption);

module.exports = router;
