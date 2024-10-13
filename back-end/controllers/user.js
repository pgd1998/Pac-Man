import User from "../models/db.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
    const { name, password } = req.body;
    try {
        const existingUser = await User.findOne({ name })
        if (existingUser) {
            return res.status(400).json({message:"User already exists"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, password: hashedPassword });
        await newUser.save()

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token, user: newUser });
    } catch (error) {
        res.status(500).json({message:'Server Error',error})
    }
}

export const login = async (req, res) => {
    const { name, password } = req.body;
    try {
        const user = await User.findOne({ name })
        if (!user) {
            return res.status(400).json({message:'Invalid Credentials'})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({message:'Invalid Credentials'})
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
        // res.status(200).json({ token, user: {name:user.name} })
        const userName = user.name;

        res.status(200).json({ token, userName })
    } catch (error) {
        res.status(500).json({message:'Server Error',error})
    }
}

export const logout = async (req, res) => {
    res.status(200).json({message:'Logged out successfully'})
}

export const update = async (req, res) => {
    const { userId, highScore } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({message:'User not found'})
        }
        user.highScore = Math.max(user.highScore, highScore);
        await user.save();
        res.status(200).json({message:"New High score!",highScore:user.highScore})
    } catch (error) {
        res.status(500).json({message:'Server Error',error})
    }
}