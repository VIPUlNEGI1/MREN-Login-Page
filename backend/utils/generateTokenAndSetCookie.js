import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined. Please set it in the environment variables.");
    }

    // Generate JWT token
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });

    // Set the token as an HTTP-only cookie
    res.cookie("token", token, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production", // Ensure secure cookie in production
        sameSite: "strict", // Prevent CSRF attacks
        maxAge: 7 * 24 * 60 * 60 * 1000 // Set cookie expiration to 7 days
    });

    return token;
};
