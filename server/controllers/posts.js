import Post from "../models/post.js"
import User from "../models/user.js"

export const createPost = async (req , res) =>
{
    try{
        const { userId , descreption , picturePath } = req.body;
        const user = await User.findbyId(userId);
        const newPost = new Post({
            userId,
            firstName : user.firstName,
            lastName: user.lastName,
            location : user.location,
            descreption ,
            userPicturePath: user.picturePath,
            picturePath,
            likes:{},            
            comments:{}
        })
        await newPost.save();
        const post = await Post.find();
        res.status(201).json(post);

    }catch(err){
        res.status(409).json({message:err.message});
    }
}


export const likePost = async (req, res) =>
{
    try{
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findbyId(id);
        const isLiked = post.likes.get(userId);

        if(isLiked){
            post.likes.delete(userId);
        }
        else{
            post.likes.set(userId , true);
        }
        const updatePost = await post.findbyIdandUpdate(
            id,
            { likes : post.likes },
            { new : true }

        )


        res.status(200).json();
    }catch(err){
        res.status(404).json({message:err.message});
    }
}


export const getUserPosts = async(req , rea) =>
{
    try{
        const { userId } = req.params;
        const post = await post.findbyId({userId});
        res.status(200).json(post);
    }
    catch (err){
        res.status(400).json({ message : err.message});
    }
}

export const getFeedPosts = async (req, res) => {
    try {
      const post = await Post.find();
      res.status(200).json(post);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };