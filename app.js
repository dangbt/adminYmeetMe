const express = require('express');
const app = express();
const path = require('path');
const staticPath = 'public';
const publicPath = 'assets';
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const User = require('./server/models/user');
const Role = require('./server/models/role');
const Address = require('./server/models/address');
const Advertise = require('./server/models/advertise');
const Hobby = require('./server/models/hobby');
const Image = require('./server/models/image');
const LikedUser = require('./server/models/likedUser');
const ChatRoom = require('./server/models/chatRoom');
const Message = require('./server/models/message');
const Notification = require('./server/models/notification');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;

// const DBstring = process.env.NODE_ENV === 'production' ? 
//     'mongodb://admin:admin1@ds163700.mlab.com:63700/youmeetme'
//     : 'mongodb://localhost/youmeetme';

const DBstring = 'mongodb://admin:admin1@ds163700.mlab.com:63700/youmeetme';

mongoose.connect(DBstring);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
    origin: true,
    credentials: true
}))
//session 
app.use(session({
    secret: 'youmeetme',
    resave: false,
    saveUninitialized: false,
    httpOnly: true,
    cookie: {
        maxAge: 15 * 60 * 1000,
    },
    store: new MongoStore({
        url:    DBstring,
        ttl: 15 * 60,
    })
      
    
}));

// route
require('./server/routes/addressRoute')(app);
require('./server/routes/advertiseRoute')(app);
require('./server/routes/hobbyRoute')(app);
require('./server/routes/imageRoute')(app);
require('./server/routes/likeUserRoute')(app);
require('./server/routes/chatRoomRoute')(app);
require('./server/routes/messageRoute')(app);
require('./server/routes/notificationRoute')(app);
require('./server/routes/roleRoute')(app);
require('./server/routes/userRoute')(app);
require('./server/routes/indexRoute')(app);


// require('http').globalAgent.maxSockets = Infinity
var http = require('http').Server(app);
var io = require('socket.io')(http);
// const redisAdapter = require('socket.io-redis');
// app.io.adapter(redisAdapter({ host: 'localhost', port: 8080 }));
io.on('connection', (socket) => {

    socket.on('create-room', (room) => {
        socket.join(room);
    })
    socket.on('message', ({ roomID, message } = {}, callback) => {
         io.in(roomID).emit('message', message)
         callback();
    })
    socket.on('leave-room', (roomID) => {
        socket.leave(roomID)
    })
    io.on('disconnect', (socket) => {
    })
})


// serve static assets normally
app.use(express.static(__dirname + '/public'))

app.get(/^((?!\/apii)(\/[a-z\-]*)*)*$/, (req, res) => {
    res.sendFile(path.join(__dirname, staticPath, '/index.html'))
});

// host assets save image....
app.use('/assets', express.static(path.join(__dirname, publicPath)));

http.listen(PORT, () => console.log("Magic happens on port: " + PORT))

