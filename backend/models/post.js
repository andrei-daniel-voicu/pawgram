const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true,
    trim: true
  },
  text: {
    type: String,
    required: true,
    unique: true,
  },
  photoLink: {
    type: String,
    required: true,
  },
  videoLink: {
    type: String,
    required: true,
  },
  commentList: [{ type: Object }],
  likesList: 
    [{ 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
});


module.exports = mongoose.model('Post', postSchema);
