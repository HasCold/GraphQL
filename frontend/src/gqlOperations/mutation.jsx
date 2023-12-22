import {gql} from "@apollo/client"

// When we gave the operation name so it is the convention we must follow everything write in the uppercase letter

export const SIGNUP_USER = gql`  # Tagged Template Literals
    mutation createUser($userInfo: UserInput!){
  user:signUpUser(userNew: $userInfo){   # user is a alias keyword
    firstName
  }
}
`
export const SIGNIN_USER = gql`
    mutation signInUser($userlogin: AuthInput){
    user:signInUser(userSign: $userlogin){
            token
        }
    }
`

export const CREATE_QUOTE = gql`
  mutation DoQuote($quote: String!){
  quote:createQuote(name: $quote)
} 
`