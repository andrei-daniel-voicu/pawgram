const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        trim: true
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recipientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});


module.exports = mongoose.model('Message', messageSchema);
