const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const mongoURI = process.env.MONGODB

const initializeDatabase = async()=>{
    await mongoose.connect(mongoURI)
    .then(()=>console.log("Connected successfully"))
    .catch((error)=>console.error("Connection failed",error))
}

module.exports = {initializeDatabase}