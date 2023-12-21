import {gql} from "@apollo/client";

// When we gave the operation name so it is the convention we must follow everything write in the uppercase letter

export const GET_ALL_QUOTES = gql`  # Tagged Template Literals
  query GetAllQuote{
      quotes {
        name
        by {
          _id
          firstName
        }
    }
}
`