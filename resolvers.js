import {randomBytes} from "crypto";
import mongoose from "mongoose";
import { errorHandler } from "./middleware/errorHandler.js";
import generateToken, { decryptToken } from "./config/generateToken_verifyToken.js";
import jwt from "jsonwebtoken";

const UserModel = mongoose.model("User"); 
const QuoteModel = mongoose.model("Quote");

const resolvers = {
    Query: {
        users: async () => await UserModel.find({}),
        quotes: async () => await QuoteModel.find({}).populate({
            path: "by",
            select: "firstName lastName"
        }),
        user: async (_, args) => await UserModel.findOne({_id: {$eq: args._id}}), // Basically first argument is the root element which it could itself so there is "_" and the second argument is their field;
        IndividualQuote: async (_, args) => await QuoteModel.find({by: {$eq: args.by}}), // Basically first argument is the root element which it could itself so there is "_" and the second argument is their field;
        
        myProfile: async (_, args, contextValue) => {
            try {
                if(!contextValue.authToken) return errorHandler(false, 401, "Token Verification Failed"); 

                return await UserModel.findOne({_id: decryptToken(contextValue.authToken)});
            } catch (error) {
                return errorHandler(true, 500, error.message);
            }
        }
    }, 

    // In GraphQL, if something not resolve properly like in the User schema the quote field does n't resolve succesfully so we have to define the logic in the resolvers separately by ourself ; In quotes field there parent is User schema so on every filter we get user 
    // or we can say somthing like this the first argument is the root/parent 

    User: {
        quotes: async (user) => await QuoteModel.find({by: {$eq: user._id}}) 
        // quotes: (user) => quotes.filter(quote => quote.by === user._id) // Filter method return each element one by one from the array
    },

    Mutation: {
        signUpUser: async (_, {userNew}) => {
            try {
                const user = await UserModel.findOne({email: {$eq: userNew.email}});
                if(user) return errorHandler(false, 403, "User already exist !");
            
                const userModelInstance = new UserModel();
                const hashedPassword = await userModelInstance.hashedPassword(userNew.password);
    
                const newUser = await new UserModel({...userNew, password: hashedPassword});
                 return await newUser.save()  // IF you check in the User schema which is made in the schema.js file so you will see at the end we will return the User
            } catch (error) {
                return errorHandler(true, 500, error.message);
            } 
        },

        signInUser: async (_, {userSign}) => {
            try {
                const user = await UserModel.findOne({email: {$eq: userSign.email}});
                if(!user) return errorHandler(false, 401, "User doesn't exist with this email");

                const doMatch = await user.comparePassword(userSign.password, user.password) ;
                if(!doMatch) return errorHandler(false, 401, "email or password is invalid");

                const token = generateToken(user._id);
                return {token}

            } catch (error) {
                throw errorHandler(false, 500, error.message);
            }
        },

        createQuote: async (_, args, contextValue) => {  // First Argument (_) is for the root or parent element which is undefined , second argument is for the arguments which we recieve from the client side also defined in our schema and third argument is context act as a middleware function just like in express but we will implement the logic part in our resolvers
            try {

                if(!contextValue.authToken){
                    return errorHandler(false, 401, "Token Verification Failed"); 
                }else if (contextValue.authToken){
 
                    const userQuote = await new QuoteModel({name: args.name, by: decryptToken(contextValue.authToken)});
                    await userQuote.save();
                    
                    return "Quote saved successfully !"
                }

            } catch (error) {
                throw errorHandler(false, 501, "Quote couldn't be saved");
            }
        }
    }
} 

export default resolvers;