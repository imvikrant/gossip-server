const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    messageId: {
        type: String,
        required: true,
        unique: true
    },
    messages: {
        type: [],
        default: []
    } 
})


messageSchema.statics.addMessage = async function(username1, username2, msg) {
    const str = username1 < username2 ? `${username1}-${username2}`: `${username2}-${username1}`

    const Message = this;

    let message = await Message.findOne({messageId: str})

    if (!message)
        message = new Message({messageId: str})
    
    message.messages = message.messages.concat(msg)

    try {
        await message.save();
        return true;
    } catch(e) {
        return false;
    }    
}

messageSchema.statics.getMessages = async function (username1, username2) {
    const str = username1 < username2 ? `${username1}-${username2}`: `${username2}-${username1}`

    const Message = this;
    
    let message = await Message.findOne({messageId: str})

    if (!message)
        return null;
    else
        return message.messages;

} 

const Message = mongoose.model('messages', messageSchema)

module.exports =  Message;