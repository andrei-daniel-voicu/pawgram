const jwt = require('jsonwebtoken');
const Message = require('../models/message');
const sharp = require('sharp');
const cloudinary = require('../helper/imageUpload');

exports.createMessage = async (req, res) => {
    const post = new Message(req.body)
    try {
        console.log(req.body)
        await post.save()
        res.status(201).send(post)
    } catch (e) {
        console.log(res.body)
        res.status(400).send(e)
    }
};

exports.getMessageById = async (req, res) => {
    const _id = req.params.id

    try {
        const message = await Message.findById(_id)

        if (!message) {
            console.log(message)
            return res.status(404).send()
        }

        res.send(message)
    } catch (e) {
        res.status(500).send()
    }
};

exports.deleteMessage = async (req, res) => {
    try {
        const message = await Message.findByIdAndDelete(req.params.id)

        if (!message) {
            res.status(404).send()
        } else {
            res.send(message)
        }
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
};
