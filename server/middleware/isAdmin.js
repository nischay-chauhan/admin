import jwt from "jsonwebtoken";

function isAdmin(req, res, next) {
  try {
    const token = req.cookies.token || req.header("Authorization").replace("Bearer ", "");
    console.log(token);
    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const userRole = decoded.payload.role;
    console.log(userRole);
    if (userRole !== 'admin') {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    req.user = decoded.payload;

    next();
  } catch (error) {
    console.error(error); 
    res.status(401).json({ success: false, message: 'Unauthorized' });
  }
}

export default isAdmin;
