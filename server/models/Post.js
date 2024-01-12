import mongoose from "mongoose";
import User from "./User.js";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    comments: {
        // Placeholder for potential future comments
    },
});

const Post = mongoose.model('Post', postSchema);

export default Post;
