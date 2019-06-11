const User = require('./db_models/users')
const Message = require('./db_models/messages')



module.exports = function (io) {
    io.on('connection', async function (socket) {

        // on connection first check if user exists
            // if exists then just set socket id
            // else create a new user
        const username = socket.handshake.query.username;
        console.log(username)
        
        let user;
        user = await User.findOne({username})
    
        if (!user) {
            user = new User({username, socketId: socket.id})
            await user.save()
        }
        else 
            user.setSocketId(socket.id)
        
        socket.on('addNewUser', async (username) => {
            const user = await User.findOne({socketId: socket.id})
            const userToBeAdded = await User.findOne({username})
            if (userToBeAdded) {
                user.connectedUsers = user.connectedUsers.concat(username)
                user.save();
            }
        })
    
        socket.on('newMessage', async ({message, username}) => {
            const userToSend = await User.findOne({username})
            const userWhoSent = await User.findOne({socketId: socket.id})
    
            Message.addMessage(username, userWhoSent.username, message)        
            
            if (userToSend.socketId)
                io.to(userToSend.socketId).emit('newMessage', {username, message})
        })
    
        // delete socket Id (make offline) for user
        socket.on('disconnect', async () => {
            const user = await User.findOne({socketId: socket.id});
            user.setSocketId('')
        })
    }
    )
}