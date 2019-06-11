const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: 5,
        required: true,
        unique: true
    },

    socketId: {
        type: String,
        default: ""
    }, 

    connectedUsers: {
        type: [String]
    }
})

userSchema.methods.setSocketId = async function(socketId) {
    const user = this;

    try {
        user.socketId = socketId;
        user.save();
    } catch (error) {
        return false;
        console.log(error)
    }
    return true;
}   

const User = mongoose.model('users', userSchema);

module.exports = User