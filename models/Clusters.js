// mongoose.set('strictQuery', true);
const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  task_name: { type: String, required: true },
  description: { type: String },
  is_completed: { type: Boolean, default: false }
});

const Clustereschema = new mongoose.Schema({
  cluster_name:{ type: String, required: true },
  user_id: { type: String, required: true },
  tasks: [TaskSchema]
},
{collection:"all-Clusteres"}, { timestamps: true }
);

mongoose.models = {}
const Cluster = mongoose.model("cluster", Clustereschema)
module.exports = Cluster


