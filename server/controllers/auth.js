import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { cloudinaryUpload } from "../middleware/multerMiddleware.js";
import { sendResetEmail } from "../mailer/Mailer.js";
const register = async (req, res) => {
  console.log(req.body);

  try {
    const { firstName, lastName, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email is already registered. Please use a different email.",
      });
    }

    // let result;

    // if (req.file) {
    //   result = await cloudinaryUpload(req.file);
    //   console.log("Cloudinary upload result:", result);
    //   req.body.profilePicture = result;
    // }
    
    const userRole = role || "user";

    const hashPass = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashPass,
      role: userRole,
      // profilePicture: result.secure_url,
    });


    if (!user) {
      throw new Error("Something went wrong while signing up");
    }

    console.log("Request body after Cloudinary upload:", req.body);

    res.status(200).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



const login = async (req, res) => {
  
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    const payload = {
      id: user._id,
      email: user.email,
      password: user.password,
      role: user.role,
    };

    const token = jwt.sign({ payload }, process.env.JWT_SECRET);
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res
      .cookie("token", token, options)
      .status(200)
      .json({
        success: true,
        message: "Login successful",
        token,
        user: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          token
        },
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const logout = async (req, res) => {
    res.cookie('token', null, {
        expires: new Date(0),
        httpOnly: true
    });
    
    res.status(200).json({ success: true, message: 'Logged out successfully' });
}


const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const resetToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '10m' });

    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpires = Date.now() + 10 * 60 * 1000;

    await user.save();

    const resetLink = `http://localhost:5173/reset-password/${user._id}/${resetToken}`;

    await sendResetEmail({ to: user.email, resetLink });

    res.json({
      success: true,
      message: "Password reset link sent to your email",
    });

  } catch (error) {
    console.error('Error in forgotPassword:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error in forgotPassword',
    });
  }
};

const resetPassword = async (req, res) => {
  const { id, resetToken } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
    
    if (!decoded || !decoded._id) {
      return res.status(400).json({
        Status: 'Failed',
        message: 'Invalid reset token',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await User.findByIdAndUpdate(
      { _id: id },
      { password: hashedPassword },
    );

    res.json({ Status: 'Success' });
  } catch (error) {
    console.error('Error in resetPassword:', error);

    if (error.name === 'TokenExpiredError') {
      return res.status(400).json({
        Status: 'Failed',
        message: 'Reset token has expired',
      });
    }

    res.status(500).json({ Status: 'Internal Server Error' });
  }
};



export { register, login , logout , resetPassword,forgotPassword };

