import User from '../models/User.js';

const getAdminProfile = async (req, res) => {
  try {

   console.log(req.user)

    const admin = await User.findById(req.user.id);
    console.log(admin)

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
    });
  } catch (error) {
    console.error(error); 
    res.status(500).json({
      success: false,
      message: 'Internal server error', 
    });
  }
};

export { getAdminProfile };
