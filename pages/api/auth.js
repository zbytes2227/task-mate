import argon2 from "argon2";
import User from "@/models/Users";
import connectDb from "@/middleware/mongoose";
import jwt from "jsonwebtoken";
import { serialize } from 'cookie';
import { parse } from "cookie";

const handler = async (req, res) => {

    if (req.method == 'GET') {

        const cookies = parse(req.headers.cookie || "");
        const token = cookies.access_token;

        try {
            // Verify the JWT token
            let decoded = await jwt.verify(token, process.env.JWT_SECRET);
            // console.log(decoded._id);
            let user = await User.findOne({ _id: decoded._id });
            // let user_Cluster = await Cluster.findOne({ user_id: user._id });
            // console.log(user_Cluster);

            if (user) {
                decoded = { name: user.name, email: user.email };
                // console.log(decoded);
            }


            return res.status(200).json({ success: true, msg: "send", user_details: decoded, });
            
        } catch (err) {
            // Handle invalid or expired token
            return res.status(400).json({ success: false, msg: "s" });

        };
    }
}

export default connectDb(handler);