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
    required: true
  },
  photoLink: {
    type: String,
  },
  videoLink: {
    type: String
  },
  commentList: [{ type: Object }],
  likesList: 
    [{ 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
});


module.exports = mongoose.model('Post', postSchema);
