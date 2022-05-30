const jwt = require('jsonwebtoken');
const Adoption = require('../models/adoption');
const User = require('../models/user');
const sharp = require('sharp');
const cloudinary = require('../helper/imageUpload');

exports.createAdoption = async (req, res) => {
    try {
        const adoption = new Adoption(req.body)
        await adoption.save()
        // console.log("Adoption", adoption, adoption.animalId, adoption._id)
        const user = await User.updateOne(
            { _id: adoption.animalId},
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
    const _id = req.params.id
    try {
        const adoption = await Adoption.findByIdAndDelete(req.params.id)

        if (!adoption) {
            res.status(404).send()
        } else {
            const user = await User.updateOne(
                { _id: req.body.id},
                {"$pullAll": { "adoptionRequestList": [req.params.id] } }
                ).exec();
            
            if (!user) {
                return res.status(404).send()
            }
            res.send(adoption)
        }
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
};