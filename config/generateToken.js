import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateToken = async (userId) => {
    return jwt.sign({userId}, process.env.TOKEN_SECRET, {
        expiresIn: '1d', // expires after 24hrs
    })
}

export default generateToken;