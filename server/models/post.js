import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    location: String,
    descreption : String,
    picturePath : String,
    userpicturePath : String, 
    likes: {
        type: Map,
        of: Boolean,
    },
    comments: {
        types : Array,
        default : [],
    },

}, { TimeRanges : true}
)

const Post = mongoose.model("Post" , postSchema);

export default Post;