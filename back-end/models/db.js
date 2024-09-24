import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const Signup = new Schema(
    {
        name: { type: String, required: true,unique:true },
        password: { type: String, required: true },
        highScore: { type: Number, default: 0 }
    }
);

const User=mongoose.model('User',Signup)
export default User;