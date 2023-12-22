import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateToken = async (userId) => {
    return jwt.sign({userId}, process.env.TOKEN_SECRET, {
        expiresIn: '1d', // expires after 24hrs
    })
}

export const decryptToken = (id) => {
    const {userId} = jwt.verify(id, process.env.TOKEN_SECRET);
    return userId;
}

export default generateToken;