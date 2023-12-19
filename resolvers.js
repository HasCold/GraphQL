import {users, quotes} from "./config/fakeDB.js";
import {randomBytes} from "crypto";
import mongoose from "mongoose";
import { errorHandler } from "./middleware/errorHandler.js";
import generateToken from "./config/generateToken.js";
const UserModel = mongoose.model("User"); 

const resolvers = {
    Query: {
        users: () => users,
        quotes: () => quotes,
        user: (_, args) => users.find(user => user._id === args._id), // Basically first argument is the root element which it could itself so there is "_" and the second argument is their field;
        IndividualQuote: (_, args) => quotes.filter(quote => quote.by === args.by) // Basically first argument is the root element which it could itself so there is "_" and the second argument is their field;
    },

    // In GraphQL, if something not resolve properly like in the User schema the quote field does n't resolve succesfully so we have to define the logic in the resolvers separately by ourself ; In quotes field there parent is User schema so on every filter we get user 
    // or we can say somthing like this the first argument is the root/parent 

    User: {
        quotes: (user) => quotes.filter(quote => quote.by === user._id) // Filter method return each element one by one from the array
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
        }
    }
} 

export default resolvers;