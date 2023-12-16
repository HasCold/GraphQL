import {ApolloServer} from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import gql from 'graphql-tag';
import {ApolloServerPluginLandingPageLocalDefault, ApolloServerPluginLandingPageProductionDefault} from '@apollo/server/plugin/landingPage/default';
import {users, quotes} from "./fakeDB.js";

// In GraphQL, we have three things query , mutation and resolver

// A schema is a collection of type definitions (hence "typeDefs") that together define the "shape" of queries that are executed against
// your data.

// Means we are telling from the client side what type of query we can did
const typeDefs = gql`  # Tagged Template Literals

#The "Query" type is special: it lists all of the available queries that clients can execute, along with the return type for each. In this
# case, the "greet" query returns a string.

type User {
    id: ID   # This is graphQL ID or you can also say that it is a string id: ID 
    firstName: String
    lastName: String
    email: String
    password: String
    quotes: [Quote]
}

type Quote {
    quote: String
    by: ID!  # This is graphQL ID or similar with the javascript string data type and ! = exclamation sign is a mandatory sign 
}

type Query{  
    users: [User]
    user(id: ID!): User
    quotes: [Quote]
    IndividualQuote(by: ID!): [Quote]  # The exclamation ! infront of the ID so is means it must be mandatory to provide the ID in the function 
}
`

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
    }
} 

// Create new Apollo server instance
const server = new ApolloServer({
    typeDefs,  // typeDefs: typeDefs
    resolvers, // resolvers: resolvers 
    plugins: [
        ApolloServerPluginLandingPageLocalDefault({footer: false})
    ]
});

const {url} = await startStandaloneServer(server, {
    listen: {port: 4000}
});

console.log(`Server ready at: ${url}`);

// Query:- GET method which means we have to get the data from server
// Mutation: POST, PUT, DELETE which means to perform the operation on server side