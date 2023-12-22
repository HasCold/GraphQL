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

export const MY_PROFILE = gql`
  query GetMyProfile{
    user:myProfile{
      email
      firstName
      lastName
      quotes {
        name
        by{
          _id
        }
      }
    }
  }
`

export const GET_USER_BY_ID = gql`
  query GetUserById($userId: ID!){
    user(_id: $userId){
      firstName
      lastName
      email
      quotes{
      name
      by{
         _id
      }
      }
    }
  }
`