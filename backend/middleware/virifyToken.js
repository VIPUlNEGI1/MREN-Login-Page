import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.startsWith('Bearer ') ? req.headers.authorization.split(' ')[1] : null);
  if (!token) return res.status(401).json({ success: false, message: "Unauthorized - no token provided" });

  try {
    if (!process.env.JWT_SECRET) throw new Error("JWT secret is not defined");
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return res.status(401).json({ success: false, message: "Unauthorized - invalid token" });
    
    req.userId = decoded.userId; // Ensure this line sets the userId
    console.log("Decoded token:", decoded); // Log the decoded token for debugging
    next();
  } catch (error) {
    console.log("Error in verification", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
