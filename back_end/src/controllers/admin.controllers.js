import bcrypt from "bcryptjs"
import adminModel from "../models/admin.model.js"
import jwt from "jsonwebtoken"

export const adminSignUp = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body

        const adminExists = await adminModel.findOne({
            email: email
        })
        if (adminExists) {
            return res.status(400).json({
                message: 'admin already exists'
            })
        }
        const hash = await bcrypt.hash(password, 10)
        const newAdmin = await adminModel.create({
            firstName,
            lastName,
            email,
            password: hash
        })
        return res.status(200).json({
            admin: newAdmin,
            message: 'admin registered successfully'
        })
    }
    catch (err) {
        return res.status(500).json({
            message: 'internal server error',
            error: err.message
        })
    }
}

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const admin = await adminModel.findOne({ email })
        if (!admin) {
            return res.status(400).json({
                message: 'admin not found'
            })
        }
        const ismatch = await bcrypt.compare(password, admin.password)
        if (!ismatch) {
            return res.status(400).json({
                message: 'invalid credentials'
            })
        }
        const token = jwt.sign({ id: admin._id }, process.env.JWT_ADMIN_SECRET)
        res.cookie("adminToken", token, {
            httpOnly: true,
            secure: false,       
            sameSite: "lax",
            path: "/",
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        });
        return res.status(200).json({
            message: 'admin login successful',
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

export const adminLogout = (req, res) => {
    try {
        res.clearCookie('adminToken',{
            httpOnly: true,
            secure: false,       
            sameSite: "lax",
        })
        return res.status(200).json({
            message: 'admin logged out successfully'
        })
    }
    catch (err) {
        return res.status(500).json({
            message: 'internal server error',
            error: err.message
        })
    }
}