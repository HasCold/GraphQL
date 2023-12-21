import {useQuery} from '@apollo/client'
import { GET_ALL_QUOTES } from "../gqlOperations/queries"

// The benefit of the use of Apollo Client makes the code maintainable, can be able to do auto-caching by the apollo-client and we can also use the apollo client hooks   

const Home = () => {
  
  // You can use like this way if you dont want to use apolloCLient package
  // useEffect(() => {   
  //   fetch("http://localhost:4000", {
  //     method: "POST",   // method will always be the POST in GraphQL
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       query:`
  //       query getUserById($userId: ID!){
  //         user(_id: $userId){
  //           firstName
  //           lastName
  //           email
  //         }
  //       }
  //       `, 
  //       variables: {
  //         userId: "6581b0ba7915bb2cf95b6ee5"
  //       }
  //     })
  //   })
  //   .then(res => res.json())
  //   .then(data => console.log(data));
  // }, [])

  const {loading, error, data} = useQuery(GET_ALL_QUOTES);

  if(loading){  // When the network request is ongoing so the loading will be true
    return <h1>Loading...</h1>
  }

  if(error){
    console.log(error.message);
  }

  if(data.quotes.length == 0){
    return <h2>No Quotes Available</h2>
  }

  return (
    <div className="container">

    {data.quotes.map(quote => {
      return(
      <blockquote key={quote.by._id}>
        <h6>{quote.name}</h6>
        <p className="rigth-align">~{quote.by.firstName}</p>
      </blockquote>
      )
    })}

    </div>
  )
}

export default Home