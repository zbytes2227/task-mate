import argon2 from "argon2";
import User from "@/models/Users";
import connectDb from "@/middleware/mongoose";
import Cluster from "@/models/Clusters";
import jwt from "jsonwebtoken";
import { serialize } from 'cookie';


const handler = async (req, res) => {

    if (req.method == 'POST') {
        try {
            const email = await User.findOne({ email: req.body.email });
            if (email) {
                return res
                    .status(400)
                    .json({ success: false, msg: "This email is already registered, try login." });
            }

            const hashedPassword = await argon2.hash(req.body.password);
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
            });

            let user = await newUser.save();
            const newCluster = new Cluster({
                user_id: user._id,
                cluster_name: "Welcome to Task Mate...."
            });
            await newCluster.save();
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
            return res.setHeader('Set-Cookie', serialize('access_token', token, {
                httpOnly: true,
                sameSite: "strict",
                 secure: true, 
                path: '/',
                }))
                .json({ success: true, msg: "Congrats! Account has been created.." });
        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, msg: "Server error" });
        }

    }


};

export default connectDb(handler);