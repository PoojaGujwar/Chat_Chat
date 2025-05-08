const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    createAt:{
        type:Date,
        default:Date.now
    }
})
userSchema.methods.comparePassword=async function(password){
    return bcrypt.compare(password,this.password)
}
module.exports = mongoose.model("User",userSchema)