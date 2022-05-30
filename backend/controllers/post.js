const jwt = require('jsonwebtoken');
const Post = require('../models/post');
const User = require('../models/user');
const sharp = require('sharp');
const cloudinary = require('../helper/imageUpload');

exports.createPost = async (req, res) => {
    // const _id = req.params.id
    // console.log("Aici")
    const post = new Post(req.body)
    try {
        // console.log(req.body)
        await post.save()
        const user = await User.updateOne(
            { _id: req.params.id},
            {"$push": { "postList": post._id } }
            ).exec();

        
        if (!user) {
            return res.status(404).send()
        }
      
        res.status(201).send(post)
    } catch (e) {
        console.log(res.body)
        res.status(400).send(e)
    }
};

exports.getPostsUser = async (req, res) => {
    const _id = req.params.id
    // console.log("User id", _id)
    try {
        const user = await User.findById(_id)

        if (!user) {
            // console.log(post)
            return res.status(404).send()
        }
    
        // console.log("User", user, user["postList"])
        const posts = await Post.find({
            '_id': { $in: user["postList"]}
        });

        res.send(posts)
    } catch (e) {
        res.status(500).send()
    }
};

exports.getPostsFollowing = async (req, res) => {
    const users = req.body
    const idsArr = users.map((x) => x["postList"])
    const ids = [].concat.apply([], idsArr);
    try {
        const posts = await Post.find({
            '_id': { $in: ids}
        });
        if (posts.length === 0) {
            return res.status(404).send()
        }
        const post = posts.sort((a, b) =>
          a.date > b.date ? 1 : -1);
        res.send(post)
    } catch (e) {
        res.status(500).send()
    }
};

exports.getPostById = async (req, res) => {
    const _id = req.params.id

    try {
        const post = await Post.findById(_id)

        if (!post) {
            console.log(post)
            return res.status(404).send()
        }

        res.send(post)
    } catch (e) {
        res.status(500).send()
    }
};

exports.editPost = async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = [
        'text',
        'date',
        'videoLink',
        'photoLink']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!post) {
            return res.status(404).send()
        }

        res.send(post)
    } catch (e) {
        console.log("Not good", res)
        res.status(400).send(e)
    }
};

exports.deleteComment = async (req, res) => {
    const post = new Post(req.body)
    try {
        console.log(req.body)
        await post.save()
        res.status(201).send(post)
    } catch (e) {
        console.log(res.body)
        res.status(400).send(e)
    }
};

exports.editComment = async (req, res) => {
    const post = new Post(req.body)
    try {
        console.log(req.body)
        await post.save()
        res.status(201).send(post)
    } catch (e) {
        console.log(res.body)
        res.status(400).send(e)
    }
};

exports.addComment = async (req, res) => {
    console.log("Aici")
    const updates = Object.keys(req.body)
    const allowedUpdates = ['text', 'id', 'userId', 'date', 'likeList']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    console.log("Comentariul", req.body)

    // const request = {id: , ...req.body}

    try {
        const post = await Post.updateOne(
            { _id: req.params.id},
            {"$push": { "commentList": req.body } }
          ).exec();

        
        if (!post) {
            return res.status(404).send()
        }

        res.send(post)
    } catch (e) {
        res.status(400).send(e)
    }
};

exports.addLike = async (req, res) => {
    console.log("Aici")
    const updates = Object.keys(req.body)
    const allowedUpdates = ['id']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    console.log("Like", req.body)

    // const request = {id: , ...req.body}

    try {
        const post = await Post.updateOne(
            { _id: req.params.id},
            {"$push": { "likesList": req.body.id } }
          ).exec();

        
        if (!post) {
            return res.status(404).send()
        }

        res.send(post)
    } catch (e) {
        res.status(400).send(e)
    }
};

exports.deleteLike = async (req, res) => {
    const post = new Post(req.body)
    try {
        console.log(req.body)
        await post.save()
        res.status(201).send(post)
    } catch (e) {
        console.log(res.body)
        res.status(400).send(e)
    }
};

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id)

        if (!post) {
            res.status(404).send()
        } else {
            res.send(post)
        }
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
};

exports.unlikeComment = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id)

        if (!post) {
            res.status(404).send()
        } else {
            res.send(post)
        }
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
};

exports.likeComment = async (req, res) => {
    console.log("Aici")
    const updates = Object.keys(req.body)
    const allowedUpdates = ['id']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    console.log("Like", req.body)

    // const request = {id: , ...req.body}

    try {
        const post = await Post.updateOne(
            { _id: req.params.id},
            {"$push": { "likesList": req.body.id } }
          ).exec();

        
        if (!post) {
            return res.status(404).send()
        }

        res.send(post)
    } catch (e) {
        res.status(400).send(e)
    }
};