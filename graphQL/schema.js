import gql from 'graphql-tag';

// A schema is a collection of type definitions (hence "typeDefs") that together define the "shape" of queries that are executed against
// your data.

// Means we are telling from the client side what type of query we can d_id
const typeDefs = gql`  # Tagged Template Literals

#The "Query" type is special: it lists all of the available queries that clients can execute, along with the return type for each. In this
# case, the "greet" query returns a string.

type User {
    _id: ID!   # This is graphQL ID or you can also say that it is a string _id: ID 
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    quotes: [Quote]
}

type QuoteWithName {
    _id: ID!
    firstName: String!
    lastName: String!
}

type Quote {
    name: String!
    by: QuoteWithName!  # This is graphQL ID or similar with the javascript string data type and ! = exclamation sign is a mandatory sign 
}

type Query{  
    users: [User]
    user(_id: ID!): User
    quotes: [Quote]
    IndividualQuote(by: ID!): [Quote]  # The exclamation ! infront of the ID so is means it must be mandatory to prov_ide the ID in the function 
}

type Token{
    token: String!
}

type Mutation{
    signUpUser(userNew: UserInput!): User  # So it means on the basis of these arguments they will return the User type
    signInUser(userSign: AuthInput): Token
    createQuote(name: String!): String
}

input UserInput{
    firstName: String!
    lastName: String!
    email: String!
    password: String!
}

input AuthInput{
    email: String!
    password: String!
}
`

export default typeDefs;