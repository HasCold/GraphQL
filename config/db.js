import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors"

dotenv.config();

const connectDB = async () => {
    try {
        const success = await mongoose.connect(process.env.MONGO_URI);

        console.log(colors.cyan.underline(`MongoDB Atlas successfully connected : ${success.connection.host}`))
    } catch (error) {
        console.log(colors.red.bold(error.message));
        process.exit();
    }
}

export default connectDB;