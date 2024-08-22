import express from "express"
import cors from "cors"
import {createServer} from "http"
import  {Server} from "socket.io"
import connectDB from "./db/index.js"
import { ChatMessage } from "./models/message.model.js"

const app= express()
const server = createServer(app)
app.use(cors({

    origin:"http://localhost:5173"
}))
app.use(express.json())

app.use(express.urlencoded({
    extended:true
}))



connectDB().then(()=>{
    const CHAT_BOT = 'ChatBot'
let ChatRoom = ''
let allUsers =[]
let chatRoomUsers

const io = new Server(server ,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET" ,"POST"]
    }
})


io.on('connection' , (socket)=>{
    console.log(`User connected to ${socket.id}`)


    socket.on('join_room', (data) => {
        const { username, roomId } = data;
        console.log(`${username} joined room: ${roomId}`);  // Log this
        ChatRoom = roomId;
    
        allUsers.push({ id: socket.id, username, roomId });
    
        chatRoomUsers = allUsers.filter((user) => user.roomId === roomId);
    
        socket.to(roomId).emit('chatroom_users', chatRoomUsers);
        socket.emit('chatroom_users', chatRoomUsers);
    
        socket.join(roomId);
        let __createdtime__ = Date.now();
        console.log(`Emitting receive_message to room: ${roomId}`);  // Log this
    
        socket.to(roomId).emit('recieve_message', {
            messageContent: `${username} has joined the chat room`,
            username: CHAT_BOT,
            __createdtime__
        });
        
        socket.emit('recieve_message', {
            messageContent: `Welcome ${username}`,
            roomId,
            username: CHAT_BOT,
            __createdtime__
        });

    });

    socket.on('send_message',async(data)=>{
        try {
            const {messageContent,username , roomId,__createdtime__ } = data
            io.in(roomId).emit('recieve_message' ,data)
            const newMessage = await ChatMessage.create({
                message:messageContent,
                username,
                roomID:roomId,
                __createdtime__
        
            })
            console.log(newMessage)
        } catch (error) {
            console.error(error)
            
        }
    })

    socket.on('leave_room' , (data)=>{
        const {username , roomId , __createdtime__}= data
        socket.leave(roomId)
        allUsers = chatRoomUsers.filter((user) => user.username != username);

        socket.to(roomId).emit('chatroom_users' , allUsers)
        socket.to(roomId).emit('recieve_message' , {
            username:CHAT_BOT,
            messageContent:`${username} has let the chat`,
            __createdtime__
        })
        console.log('user has left the room')

    })


    socket.on('disconnect', ()=>{
        const __createdtime__ = Date.now()
        console.log(`user disconnected from the chat`)
        const user = allUsers.find((user) => user.id == socket.id);
        if(user?.username){
            allUsers = chatRoomUsers.filter((e) => e.id != user.id );
            socket.to(ChatRoom).emit('chatroom_users', allUsers);
            socket.to(ChatRoom).emit('recieve_message', {
              messageContent: `${user.username} has disconnected from the chat.`,
              username:CHAT_BOT,
              __createdtime__
            });
      
        }

    })



})


app.get('/getMessages', async (req, res) => {
    const { roomId } = req.query;
    const page = parseInt(req.query.page, 10) || 0; 
    const limit = 10;

    try {
        if (!roomId) {
            return res.status(400).json({ msg: "Room ID is required" });
        }

        const totalMessages = await ChatMessage.countDocuments({ roomID: roomId });
        const numberOfPages = Math.ceil(totalMessages / limit);

        if (page < 0 || page >= numberOfPages) {
            return res.status(400).json({ msg: "Invalid page number" });
        }

        const roomMessages = await ChatMessage.find({ roomID: roomId })
            .sort({ createdAt: -1 })
            .skip(page * limit)
            .limit(limit);

        if (!roomMessages.length && page > 0) {
            return res.status(404).json({ msg: "No messages found for this page" });
        }

        return res.status(200).json({
            msg: "Chats retrieved successfully",
            roomMessages,
            totalMessages,
            numberOfPages,
            currentPage: page
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Server error" });
    }
});



server.listen(process.env.PORT, ()=>{
    console.log(`The server is running on ${process.env.PORT} `)
})

}

)

