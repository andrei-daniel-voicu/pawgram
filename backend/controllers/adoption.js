const jwt = require('jsonwebtoken');
const Adoption = require('../models/adoption');
const sharp = require('sharp');
const cloudinary = require('../helper/imageUpload');

exports.createAdoption = async (req, res) => {
    const adoption = new Adoption(req.body)
    try {
        console.log("Ok", adoption)
        await adoption.save()

        const user = await User.updateOne(
            { _id: req.params.id},
            {"$push": { "adoptionRequestList": adoption._id } }
            ).exec();

        
        if (!user) {
            return res.status(404).send()
        }
        res.status(201).send(adoption)
    } catch (e) {
        res.status(400).send(e)
    }
};

exports.getAdoptionById = async (req, res) => {
    const _id = req.params.id

    try {
        const adoption = await Adoption.findById(_id)

        if (!adoption) {
            console.log(adoption)
            return res.status(404).send()
        }

        res.send(adoption)
    } catch (e) {
        res.status(500).send()
    }
};

exports.deleteAdoption = async (req, res) => {
    try {
        const adoption = await Adoption.findByIdAndDelete(req.params.id)

        if (!adoption) {
            res.status(404).send()
        } else {
            res.send(adoption)
        }
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
};
