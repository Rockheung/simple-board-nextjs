import mongoose, { Document, Schema } from "mongoose";

const PostSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  author: String,
  body: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// interface IPost {
//   title: string;
//   author: string;
//   mainText: string;
//   createdAt: Date;
// }

PostSchema.methods.len = function () {
  return this.body.length;
};

export default mongoose.models["Post"] ?? mongoose.model("Post", PostSchema);
