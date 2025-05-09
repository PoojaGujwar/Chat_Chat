const {initializeDatabase} = require('./db/db.connection')
const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
const Message = require('./models/Message')
const User = require("./models/User")
const authRoutes = require('./routes/auth')
const {Server} = require('socket.io')
const server = http.createServer(app)

const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000",
    },
})

app.use(cors())
app.use(express.json())
initializeDatabase()

app.use("/auth",authRoutes)

io.on("connection",(socket)=>{
    console.log("Connected successfully",socket.id)

    socket.on("send_message",async(data)=>{
        const {sender,receiver,message} = data
        const newMessage = new Message({sender,receiver,message})
        await newMessage.save()
        socket.broadcast.emit("receive_message",data)
    })
    socket.on("disconnected",()=>{
        console.log("User disconnected",socket.id)
    })
})

app.get("/messages",async(req,res)=>{
    const {sender,receiver} = req.query
    try{
        const message = await Message.find({$or:[{sender,receiver},{sender:receiver,receiver:sender}]}).sort({createdAt:1})

        res.json(message)
    }catch(error){
        res.status(500).json({message:"Error fetching message"})
    }
})

app.get("/users",async(req,res)=>{
    const {currentUser} = req.query
    try{
        const user = await User.find({username:{$ne:currentUser}})
        res.json(user)
    }catch(error){
        res.status(500).json({message:"Error fetching users"})
    }
})

const PORT = 5001|| process.env.PORT
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})