// export const errorHandler = async (res, statusCode = 500, message = "Internal Server Error") => {
//     return res.status(statusCode).json({
//         success: false,
//         message
//     })
// };

export const errorHandler = async (success, statusCode = 500, message = "Internal Server Error") => {
    const error = new Error(message);
    error.statusCode = statusCode;
    error.success = success;
    throw error;
} 
