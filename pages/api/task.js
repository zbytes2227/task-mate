import argon2 from "argon2";
import User from "@/models/Users";
import jwt from "jsonwebtoken";
import { parse } from "cookie";
import Cluster from "@/models/Clusters";
import connectDb from "@/middleware/mongoose";


const handler = async (req, res) => {

    if (req.method == 'PUT') {
        console.log(req.body);
        let cluster_id = req.body.cluster_id;
        let task_id = req.body.task_id;
        let req_method = req.body.method;
        
        if (req_method) {
            let is_completed = req.body.is_completed
            Cluster.updateOne(
                { _id: cluster_id, "tasks._id": task_id },
                { $set: { "tasks.$.is_completed": !is_completed } }
            )
                .then(result => {
                    res.json({ success: true, msg: "DONE", res: result });
                })
                .catch(error => {
                    res.json({ success: false, msg: "ERROR" });
                    console.log(error);
                });
        } else {
            Cluster.updateOne(
                { _id: cluster_id },
                { $pull: { tasks: { _id: task_id } } }
            )
                .then(result => {
                    res.json({ success: true, msg: "DONE", res: result });
                })
                .catch(error => {
                    res.json({ success: false, msg: "ERROR" });
                    console.log(error);
                });
        }
    }


    if (req.method == 'POST') {
        // console.log(req.cluster_id);
        const cluster = await Cluster.findOne({ _id: req.body.cluster_id })
        if (!cluster) {
            console.error('err');
            res.json({ success: false, msg: "ERROR" });
        } else {
            // console.log(cluster);
            let newTask = {
                task_name: req.body.task_name,
                description: req.body.description,
                is_completed: req.body.is_completed,
            }
            cluster.tasks.push(newTask);
            let n_cluster = await cluster.save();
            res.json({ success: true, msg: "Task Added Successfully", cluster: n_cluster });
        }
    }
}



export default connectDb(handler);