import mongoose from 'mongoose';
import Post from '../models/Post.js';
import User from '../models/User.js';

const getUserProfile = async (req, res) => {
    try {

        const userId = req.user.payload.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        res.status(200).json({
            success: true,
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const updateUserProfile = async (req, res) => {
    console.log(req.user);
    try {
        const userId = req.user.payload.id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized: Invalid user ID',
            });
        }

        const { firstName, lastName, email } = req.body;

        if (!firstName && !lastName && !email) {
            return res.status(400).json({
                success: false,
                message: 'Please provide at least one field to update (firstName, lastName, email)',
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        if (firstName) {
            user.firstName = firstName;
        }

        if (lastName) {
            user.lastName = lastName;
        }

        if (email) {
            user.email = email;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            success: true,
            message: 'User profile updated successfully',
            user: {
                _id: updatedUser._id,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                email: updatedUser.email,
                role: updatedUser.role,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getAllPosts = async(req , res) => {
    try{
    const posts = await Post.find().populate('author' , 'firstName lastName');

    res.json({
        success : true,
        posts,
    });
}catch(error){
    console.log(error);
    res.status(500).json({
        success : false,
        message : 'Internal server error',
    })
}
}

const getAdminPosts = async(req , res) => { 
    try{
        const {userId} = req.params;
        console.log(userId);
        if(!mongoose.Types.ObjectId.isValid(userId)){
            return res.status(404).json({
                success : false,
                message : 'Imvalid user id found',
            })
        }
        const user = await User.findById(userId);

        const adminPosts = await Post.find({author : userId});
        res.json({
            success : true,
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
              },
            posts : adminPosts,
        });

    }catch(error){
        console.error(error);
        res.status(500).json({
            success : false,
            message : 'Internal server error for getting admin posts',
        })
    }
}

export { getUserProfile , updateUserProfile , getAllPosts , getAdminPosts};
