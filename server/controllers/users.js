import { format } from "morgan";
import User from "../models/user.js"

export const getUser = async (req , res) =>
{
    try{
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    }
    catch(error){
        res.status(404).json({ message : error.message });
    }
}   

export const getUserFriends = async (req , res) =>
{
    try{
        const { id } = req.params;
        const user = await User.findById(id);
        const friends = await Promise.all(
            user.friends.map((id) => user.findById(id))
        );
        const formattedFriends = friends.map(
            ({_id , firsrName , lastName , occupation , location , picturePath}) =>{
                return {_id , firsrName , lastName , occupation , location , picturePath};
            }
        );
        res.status(200).json(formattedFriends);
    } catch(err){
        res.status(404).json({ message : err.message });
    }
}

export const addRemoveFriend = async (req , res) =>
{
    try{
        const { id , friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if(user.friends.includes(friendId)){
            user.friends = user.friends.filter((id) !== friendId);
            friend.friends = friend.friends.filter((id) !== id);
        }
        else{
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        const formattedFriends = friends.map(
            ({_id , firsrName , lastName , occupation , location , picturePath}) =>{
                return {_id , firsrName , lastName , occupation , location , picturePath};
            }
        );
        res.status(200).json(formattedFriends);
    }
    catch(err){
        res.status(404).json({ message : err.message });
    }
}