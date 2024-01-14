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
    if (userRole !== 'admin') {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    // if (req.method === 'DELETE' && req.originalUrl.includes('/admin/users/')) {
    //   if (userRole === 'admin') {
    //     return res.status(403).json({ success: false, message: 'Admins cannot delete admins' });
    //   }
    // }
    
    req.user = decoded.payload;

    next();
  } catch (error) {
    console.error(error); 
    res.status(401).json({ success: false, message: 'Unauthorized' });
  }
}

export default isAdmin;
