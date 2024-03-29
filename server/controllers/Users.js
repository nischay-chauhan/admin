import mongoose from 'mongoose';
import Post from '../models/Post.js';
import User from '../models/User.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

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
                profilePicture: user.profilePicture,
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

const getAdminPosts = async (req, res) => {
    try {
      const { userId } = req.params;
      console.log(userId);
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).json({
          success: false,
          message: 'Invalid user id found',
        });
      }
  
      const posts = await Post.find({ author: userId })
        .populate('author', 'firstName lastName')
        .exec();
  
      if (!posts) {
        return res.status(404).json({
          success: false,
          message: 'No posts found for the given user id',
        });
      }
  
      const user = await User.findById(userId);
  
      res.json({
        success: true,
        user: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
        posts,
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Internal server error for getting admin posts',
      });
    }
  };
  
  const updateProfilePicture = async (req, res) => {
    const { userId } = req.params;
    const profilePicturepath = req.file?.path;
  
    if (!profilePicturepath) {
      return res.status(400).json({
        success: false,
        message: "Profile picture is required"
      });
    }
  
    try {
      const profilePicture = await uploadOnCloudinary(profilePicturepath);
      if (!profilePicture.url) {
        return res.status(400).json({
          success: false,
          message: "Profile picture failed to upload to Cloudinary"
        });
      }
  
      const prevuser = await User.findById(userId);
      const user = await User.findByIdAndUpdate(userId, {
        $set: {
          profilePicture: profilePicture.url
        },
      },
      { new: true }
      ).select("-password");

      res.json({
        success: true,
        message: "Profile picture updated successfully"
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal server error while changing the profile picture"
      });
    }
  };
  

export { getUserProfile , updateUserProfile , getAllPosts , getAdminPosts , updateProfilePicture};
