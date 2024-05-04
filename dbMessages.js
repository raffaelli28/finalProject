import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema ({
    message: String,
    user: String,
    timeStamp: String,
    received: Boolean
});

export default mongoose.model('messagingschema', messageSchema)