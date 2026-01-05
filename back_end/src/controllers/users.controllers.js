import userModel from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import purchaseModel from '../models/purchase.model.js';

export const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const userExists = await userModel.findOne({ email: email });
        if (userExists) {
            return res.status(400).json({
                message: 'user already exists'
            })
        }
        const hash = await bcrypt.hash(password, 10);
        const newUser = await userModel.create({
            firstName,
            lastName,
            email,
            password: hash
        })
        return res.status(201).json({
            user: newUser,
            message: 'user signedUp successfully'
        })
    }
    catch (err) {
        return res.status(500).json({
            message: 'internal server error',
            error: err.message
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: 'user not found'
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({
                message: 'invalid credentials'
            })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 24 * 60 * 60 * 1000 // 60 days
        });
        return res.status(200).json({
            message: 'login successful',
            token
        })
    }
    catch (err) {
        return res.status(500).json({
            message: 'internal server error',
            error: err.message
        })
    }
}

export const logout = (req, res) => {
    try {
        res.clearCookie('token',{
            sameSite: "lax",
            secure: false,
            path: "/",
            httpOnly:true
        });
        return res.status(200).json({
            message: 'logout successful'
        })
    }
    catch (err) {
        return res.status(500).json({
            message: 'internal server error',
            error: err.message
        })
    }
}

export const purchases = async (req, res) => {
    try {
        const userId = req.user.id
        const allPurchases = await purchaseModel.find({ userId }).populate('courseId')
        const purchasedCourses = allPurchases.map(function (obj) {
            return obj.courseId
        })
        return res.status(200).json({
            purchasedCourses,
            message: 'purchased courses fetched successfully'
        })
    }
    catch (err) {
        return res.status(500).json({
            message: 'internal server error',
            error: err.message
        })
    }
}