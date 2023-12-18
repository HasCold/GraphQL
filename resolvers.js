import {users, quotes} from "./fakeDB.js";
import {randomBytes} from "crypto";

// The calculation part in which the query logic contain is the resolver part
// Basically Resolver contains the query and mutation logic part
const resolvers = {
    Query: {
        users: () => users,
        quotes: () => quotes,
        user: (_, args) => users.find(user => user.id === args.id), // Basically first argument is the root element which it could itself so there is "_" and the second argument is their field;
        IndividualQuote: (_, args) => quotes.filter(quote => quote.by === args.by) // Basically first argument is the root element which it could itself so there is "_" and the second argument is their field;
    },

    // In GraphQL, if something not resolve properly like in the User schema the quote field does n't resolve succesfully so we have to define the logic in the resolvers separately by ourself ; In quotes field there parent is User schema so on every filter we get user 
    // or we can say somthing like this the first argument is the root/parent 

    User: {
        quotes: (user) => quotes.filter(quote => quote.by === user.id) // Filter method return each element one by one from the array
    },

    Mutation: {
        signUpUserDummy: (_, {userNew}) => {   // you can also write like in this syntax args.userNew
            const id = randomBytes(5).toString("hex")  // Return 10-digits random string
            users.push({
                id,
                ...userNew
            });

            return users.find(user => user.id === id);  // This will return that user which we will created
        } // First arguemnt is the parent User type which is undefined and in the second argument is the parameters we have described in the schema like firstName, lastName etc.  
    }
} 

export default resolvers;