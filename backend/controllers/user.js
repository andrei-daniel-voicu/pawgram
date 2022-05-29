const jwt = require('jsonwebtoken');
const User = require('../models/user');
const sharp = require('sharp');
const cloudinary = require('../helper/imageUpload');

exports.createUser = async (req, res) => {
  const isNewUser = await User.isThisEmailInUse(req.body["email"]);
  if (!isNewUser)
    return res.json({
      success: false,
      message: 'This email is already in use, try sign-in',
    });
  const user = await User(req.body);
  await user.save();
  const newUser = {'email': user["email"], 'username': user["username"]}
  res.json({ success: true, user });
};

exports.userSignIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne(
    {
    'email': { $in: email}},
    function (err, obj) {
      if(err) return console.log(err);
      console.log("obj ", obj);
    }
  );
  if (!user)
    return res.json({
      success: false,
      message: 'user not found, with the given email!',
    });

  const isMatch = await user.comparePassword(password);
  if (!isMatch)
    return res.json({
      success: false,
      message: 'email / password does not match!',
    });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  let oldTokens = user.tokens || [];

  if (oldTokens.length) {
    oldTokens = oldTokens.filter(t => {
      const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
      if (timeDiff < 86400) {
        return t;
      }
    });
  }

  await User.findByIdAndUpdate(user._id, {
    tokens: [...oldTokens, { token, signedAt: Date.now().toString() }],
  });

  const userInfo = {
    _id : user._id,
    type: user.type,
    fullname: user.fullname,
    email: user.email,
    avatar: user.avatar ? user.avatar : '',
    username: user.username,
    patreonLink: user.patreonLink,
    // postList: user.postList,
    // followingList: user.followingList,
    // followersList: user.followersList,
    // adoptionList: user.adoptionList
  };

  res.json({ success: true, user: userInfo, token});
};

exports.uploadProfile = async (req, res) => {
  const { user } = req;
  if (!user)
    return res
      .status(401)
      .json({ success: false, message: 'unauthorized access!' });

  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      public_id: `${user._id}_profile`,
      width: 500,
      height: 500,
      crop: 'fill',
    });

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { avatar: result.url },
      { new: true }
    );
    res
      .status(201)
      .json({ success: true, message: 'Your profile has updated!' });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'server error, try after some time' });
    console.log('Error while uploading profile image', error.message);
  }
};

exports.editProfileUser = async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = [
    'date',
    'type',
    'username',
    'password',
    'email',
    'fullname',
    'patreonLink',
    'postList',
    'followingList',
    'adoptionRequestList',
    'notificationList',
    'avatar',
    'tokens'
  ]
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' })
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id,
       req.body, 
       { new: true, runValidators: true })
    
    if (!user) {
        return res.status(404).send()
    }

    res.send(user)
  } catch (e) {
      res.status(400).send(e)
  }
}

exports.addPostIdToPostList = async (req, res) => {
  console.log("add Post to User", req.params.id, req.body)
  const updates = Object.keys(req.body)
  const allowedUpdates = ['id']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' })
  }
  try {
      const user = await User.updateOne(
          { _id: req.params.id},
          {"$push": { "postList": req.body.id } }
        ).exec();
      
      if (!user) {
          return res.status(404).send()
      }

      res.send(user)
  } catch (e) {
      res.status(400).send(e)
  }
};

exports.signOut = async (req, res) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: 'Authorization fail!' });
    }

    const tokens = req.user.tokens;

    const newTokens = tokens.filter(t => t.token !== token);

    await User.findByIdAndUpdate(req.user._id, { tokens: newTokens });
    res.json({ success: true, message: 'Sign out successfully!' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
      const user = await User.findByIdAndDelete(req.params.id)

      if (!user) {
          res.status(404).send()
      } else {
          res.send(user)
      }
  } catch (e) {
      console.log(e)
      res.status(500).send()
  }
};

exports.addFollower = async (req, res) => {
  console.log("Aici")
  const updates = Object.keys(req.body)
  const allowedUpdates = ['id']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
  if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' })
  }
  console.log("Follower", req.body)

  try {
      const user = await User.updateOne(
          { _id: req.params.id},
          {"$push": { "followersList": req.body } }
        ).exec();

      if (!user) {
          return res.status(404).send()
      }

      res.send(user)
  } catch (e) {
      res.status(400).send(e)
  }
};

exports.addFollowing = async (req, res) => {
  console.log("Aici")
  const updates = Object.keys(req.body)
  const allowedUpdates = ['id']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
  if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' })
  }
  console.log("Following", req.body)

  try {
      const user = await User.updateOne(
          { _id: req.params.id},
          {"$push": { "followingList": req.body } }
        ).exec();

      if (!user) {
          return res.status(404).send()
      }

      res.send(user)
  } catch (e) {
      res.status(400).send(e)
  }
};

exports.addAdoption = async (req, res) => {
  console.log("Aici")
  const updates = Object.keys(req.body)
  const allowedUpdates = ['id']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
  if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' })
  }
  console.log("adoption", req.body)

  try {
      const user = await User.updateOne(
          { _id: req.params.id},
          {"$push": { "adoptionRequestList": req.body } }
        ).exec();

      if (!user) {
          return res.status(404).send()
      }

      res.send(user)
  } catch (e) {
      res.status(400).send(e)
  }
};

exports.addNotification = async (req, res) => {
  console.log("Aici")
  const updates = Object.keys(req.body)
  const allowedUpdates = ['id']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
  if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' })
  }
  console.log("adoption", req.body)

  try {
      const user = await User.updateOne(
          { _id: req.params.id},
          {"$push": { "notificationList": req.body } }
        ).exec();

      if (!user) {
          return res.status(404).send()
      }

      res.send(user)
  } catch (e) {
      res.status(400).send(e)
  }
};