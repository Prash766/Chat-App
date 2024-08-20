import express from "express"
import cors from "cors"
import {createServer} from "http"
import  {Server} from "socket.io"
import connectDB from "./db/index.js"
import { ChatMessage } from "./models/message.model.js"

const app= express()
const server = createServer(app)
app.use(cors({

    origin:"http://localhost:5174"
}))
app.use(express.json())


connectDB().then(()=>{
    const CHAT_BOT = 'ChatBot'
let ChatRoom = ''
let allUsers =[]

const io = new Server(server ,{
    cors:{
        origin:"http://localhost:5174",
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
    
        const chatRoomUsers = allUsers.filter((user) => user.roomId === roomId);
    
        socket.to(roomId).emit('chatroom_users', chatRoomUsers);
        socket.emit('chatroom_users', chatRoomUsers);
    
        socket.join(roomId);
        let __createdtime__ = Date.now();
        console.log(`Emitting receive_message to room: ${roomId}`);  // Log this
    
        socket.to(roomId).emit('recieve_message', {
            message: `${username} has joined the chat room`,
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
})

app.get('/' , (req, res)=>{
    res.send("<h1>HEY THERE </h1>")
})


server.listen(process.env.PORT, ()=>{
    console.log(`The server is running on ${process.env.PORT} `)
})

}

)

