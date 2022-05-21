const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  patreonLink: {
    type: String,
    required: true,
  },
  postList:
    [{ 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }],
  followingList:
    [{ 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
  followersList:
    [{ 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
  adoptionRequestList: 
    [{ 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AdoptionRequest'
    }],
  notificationList: [{ type: Object }],
  avatar: String,
  tokens: [{ type: Object }]
});

userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    bcrypt.hash(this.password, 8, (err, hash) => {
      if (err) return next(err);

      this.password = hash;
      next();
    });
  }
});

userSchema.methods.comparePassword = async function (password) {
  if (!password) throw new Error('Password is mission, can not compare!');

  try {
    const result = await bcrypt.compare(password, this.password);
    return result;
  } catch (error) {
    console.log('Error while comparing password!', error.message);
  }
};

userSchema.statics.isThisEmailInUse = async function (email) {
  if (!email) throw new Error('Invalid Email');
  try {
    const user = await this.findOne({ email });
    if (user) return false;

    return true;
  } catch (error) {
    console.log('error inside isThisEmailInUse method', error.message);
    return false;
  }
};

module.exports = mongoose.model('User', userSchema);
