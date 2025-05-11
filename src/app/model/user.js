import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  list:[{
    type: mongoose.Types.ObjectId,
    ref:"Snipp"
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export default mongoose.models.SnippUser||  mongoose.model("SnippUser", userSchema);