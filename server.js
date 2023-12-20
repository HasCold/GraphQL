import {ApolloServer} from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import {ApolloServerPluginLandingPageLocalDefault, ApolloServerPluginLandingPageProductionDefault} from '@apollo/server/plugin/landingPage/default';
import "./models/user.Model.js";
import "./models/quote.Model.js";
import typeDefs from "./graphQL/schema.js";
import resolvers from "./resolvers.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

// In GraphQL, we have three things query , mutation and resolver

// A schema is a collection of type definitions (hence "typeDefs") that together define the "shape" of queries that are executed against
// your data.

// The calculation part in which the query logic contain is the resolver part
// Basically Resolver contains the query and mutation logic part

dotenv.config();
connectDB();

// Create new Apollo server instance
const server = new ApolloServer({
    typeDefs,  // typeDefs: typeDefs  -->> Schema
    resolvers, // resolvers: resolvers  -->> Logic Define
    plugins: [
        ApolloServerPluginLandingPageLocalDefault({footer: false})
    ]
});

const {url} = await startStandaloneServer(server, {
    // Below the async context function act as a middleware in the graphQL server for the clientside when they will access somthing it will verify from the token;    
    context: async ({req, res}) => ({
        authToken: req.headers.authorization

    }),
    listen: {port: 4000}
});

console.log(`Server ready at: ${url}`);

// Query:- GET method which means we have to get the data from server
// Mutation: POST, PUT, DELETE which means to perform the operation on server side