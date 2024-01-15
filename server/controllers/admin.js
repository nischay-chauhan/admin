import User from '../models/User.js';
import Post from '../models/Post.js';
const getAdminProfile = async (req, res) => {
  try {
  const admin = await User.findById(req.user.id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found',
      });
    }

    res.json({
      _id: admin._id,
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
      role: admin.role,
      profilePicture:admin.profilePicture,
    });
  } catch (error) {
    console.error(error); 
    res.status(500).json({
      success: false,
      message: 'Internal server error', 
    });
  }
};

const getAllusers = async (req, res) => {
  try{
    const Users = await User.find({});
    res.json({
      success: true,
      users: Users
    })

  }catch(error){  
    console.log(error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
}

const createPost = async (req , res) => {

  try {
  const {title , content} = req.body;
    console.log(req.user)
  const {id : authorId} = req.user; //from isAdmin middleware
   
  const newPost = await Post.create({
    title,
    content,
    author : authorId,
  });

  res.status(201).json({
    success : true,
    message : "Post created Successfully",
    post : newPost
  })
}catch(error){
  console.log(error)
  res.status(500).json({
    success : false,
    message : "Internal server error"
  })
}
}

const deleteUser = async(req , res) => {
  try{
    const {id} = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    res.json({
      success : true,
      message : "User deleted successfully",
      user : deletedUser
    })
  }catch(error){
    console.log(error)
    res.status(500).json({
      success : false,
      message : "Internal server error"
    })
  }
}



export { getAdminProfile , getAllusers , createPost , deleteUser };
