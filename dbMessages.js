import mongoose from 'mongoose'
//const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema ({
    message: String,
    user: String,
    timeStamp: String,
    received: Boolean
});

const Messages = mongoose.model('messagingschema', messageSchema);
export default Messages;