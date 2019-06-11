const app = require('express')();
const server = require('http').Server(app)
const io = require('socket.io')(server, {
    serveClient: false
})
const cors = require('cors')
const bodyParser = require('body-parser')

//router imports
const authRoutes = require('./express_routes/auth_routes')

// local imports
require('./mongoose_config') 

// import socket 
const initializeSocket = require('./socket');

// Mongoose models
const User = require('./db_models/users')
const Message = require('./db_models/messages')



io.set("origins", "*:*");
app.use(cors())
app.use(bodyParser.json())
app.use('/', authRoutes)

const port = process.env.PORT || 3000;

// start the socket server
require('./socket')(io)

server.listen(port, () => {
    console.log('server is listening on port ' + port)
})