import jwt, { decode } from 'jsonwebtoken';
import User from '../models/User.js';

const authenticateUser = async (req, res, next) => {
    try {
        const token =  req.cookies.token || req.header("Authorization").replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized: Token is missing',
            });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if (!decodedToken) {
            throw new Error("invalid token");
        }

        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};

export default authenticateUser;
