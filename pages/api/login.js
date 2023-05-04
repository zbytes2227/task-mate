import argon2 from "argon2";
import User from "@/models/Users";
import connectDb from "@/middleware/mongoose";
import jwt from "jsonwebtoken";
import { serialize } from 'cookie';

const handler = async (req, res) => {

    if (req.method == 'POST') {
        try {
            let user;
            user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(401).json({ success: false, msg: "Login failed. Please check your email and password" });
            }
    
            const validPassword = await argon2.verify(user.password, req.body.password);
            if (!validPassword) {
                return res.status(401).json({ success: false, msg: "Login failed. Please check your email and password" });
            }
    
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "10h" });
            return res.setHeader('Set-Cookie', serialize('access_token', token, {
                httpOnly: true,
                sameSite: "strict",
                 secure: true, 
                path: '/',
                }))
                .json({ success: true, msg: "Login Successful" });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ success: false, msg: "Internal Server Error" });
        }
    }


};

export default connectDb(handler);