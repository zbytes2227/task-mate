import User from "@/models/Users";
import jwt from "jsonwebtoken";
import { parse } from "cookie";
import Cluster from "@/models/Clusters";
import connectDb from "@/middleware/mongoose";


const handler = async (req, res) => {
    if (req.method == 'GET') {
        const cookies = parse(req.headers.cookie || "");
        const token = cookies.access_token;

        try {
            let decoded = await jwt.verify(token, process.env.JWT_SECRET);
            let user = await User.findOne({ _id: decoded._id });
            let user_clusters = await Cluster.find({ user_id: user._id });
            return res.json({ success: true, Clusters: user_clusters })
        } catch (er) {
            return res.json({ success: false, msg: "Unable to fetch your Clusters" });
        }
    }
    if (req.method == 'POST') {
        try {

            const cookies = parse(req.headers.cookie || "");
            const token = cookies.access_token;
            let decoded = await jwt.verify(token, "process.env.JWT_SECRET");
            const user = await User.findOne({ _id: decoded._id })
            if (user) {
                const cluster_name = await Cluster.findOne({ cluster_name: req.body.cluster_name })
                if (cluster_name) {
                    res.json({ success: false, msg: "Cluster Already Exists" });
                } else {
                    const newCluster = new Cluster({
                        user_id: decoded._id,
                        cluster_name: req.body.cluster_name,
                    });
                    await newCluster.save();
                    res.json({ success: true, msg: "Cluster Created Successfully" });
                }
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, msg: "Error While Creating Branch" });
        }
    }

};

export default connectDb(handler);