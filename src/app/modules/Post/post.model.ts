import { model, Schema } from "mongoose";
import { TPost } from "./post.interfase";



const CommentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    comment: { type: String}
  },
  { timestamps: true }
);


const PostSchema = new Schema<TPost>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    authorId: { type: String},
    authorName: { type: String},
    images: { type: String},
    category: { type: String, required: true },
    tags: { type: [String] },
    isPremium: { type: Boolean, default: false },
    description: { type: String, required: true },
    upvotesCount: { type: Number, default: 0 },
    upvotedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [CommentSchema]  
  },
  { timestamps: true }
);

export const Post = model<TPost>("post", PostSchema);