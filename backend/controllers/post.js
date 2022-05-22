const jwt = require('jsonwebtoken');
const Post = require('../models/post');
const sharp = require('sharp');
const cloudinary = require('../helper/imageUpload');

exports.createPost = async (req, res) => {
    // console.log("Here")
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