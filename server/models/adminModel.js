import mongoose from "mongoose";

const adminSchema=new mongoose.Schema({
    name:{
        type :String,
        require:true
    },
    password:{
        type: String,
        required:true
     }
})

const Admin= mongoose.model('Admin',adminSchema)
export default Admin