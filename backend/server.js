const dotenv = require('dotenv');
dotenv.config();
const http = require('http');
const app = require('./app');
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const projectModel = require('./models/project.model')



const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors : {
        origin : '*'
    }
});

io.use( async (socket,next)=>{

    try {
        
    const token = socket.handshake.auth?.token || socket.handshake.headers.authorization?.split(' ')[1];
    const projectId = socket.handshake.query.projectId;

    if(!mongoose.Types.ObjectId.isValid(projectId)){
        return next(new Error('Invalid projectId'))
    }

    socket.project = await projectModel.findById(projectId);


    if(!token){
        return next(new Error('Authentication Error'));
    }

    const decoded = jwt.verify(token , process.env.JWT_SECRET);

    if(!decoded){
        next(new Error('Authentication Error'));
    }

    socket.user = decoded;
    next();
    
    } catch (error) {
        
        next(error);
    }
})




io.on('connection', socket => {

    socket.roomId = socket.project._id.toString()

    console.log('a user connected ');

    console.log((socket.project._id).toString())
    socket.join(socket.roomId);

    socket.on('project-message', data=>{

        const message = data.message;

        const aiPresentInMessage = message.includes('@ai');

        if(aiPresentInMessage){
            socket.emit('project-message',{
                message :  'AI is present in the message '
            })

            return ;
        }

        console.log(data)
        socket.broadcast.to(socket.roomId).emit('project-message', data);
    })

  socket.on('event', data => { /* … */ });
  socket.on('disconnect', () => { 
    console.log('user disconnected');
    socket.leave(socket.roomId);
   });
});

const PORT = process.env.PORT || 5000;


server.listen(PORT,()=>{
    console.log(`Server listening at port ${PORT}`);
    
})