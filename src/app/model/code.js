import mongoose from "mongoose";

const codeSchema = new mongoose.Schema({
    title:{

    },
    description:{

    },
     body:{

     },
     createdAt: {
    type: Date,
    default: Date.now,
  },
     user:[{
         type: mongoose.Types.ObjectId,
         ref:"SnippUser"
       }],
       


})
export default mongoose.models.Snipp||mongoose.model("Snipp", codeSchema);
