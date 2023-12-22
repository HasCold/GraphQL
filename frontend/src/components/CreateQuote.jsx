import { useState } from "react"
import {useMutation} from "@apollo/client"
import {CREATE_QUOTE} from "../gqlOperations/mutation"

const CreateQuote = () => {
 
    const [quote, setQuote] = useState("");
    const [createQuote, {loading, error, data}] = useMutation(CREATE_QUOTE, {
        refetchQueries: [
            "GetAllQuote",
            "GetMyProfile",
            "GetUserById"
        ]
    });  // Apollo Client will cache the data in the Home Page Layout so if you want to re-executed the queries so you have to specifically mention in the useMutation hook options by giving the name of the method and name of the mutation 

    const handleSubmit = (e) => {
        e.preventDefault();
        createQuote({
            variables:{
                quote: quote
            }
        })
    }

    if(loading) return <h1>Loading...</h1>

    if(error){
        console.log(error.message);
    }

    return (
    <div className="container my-container">
        {
            error && <div className="red card-panel">{error.message}</div>
        }
        {
            data && <div className="green card-panel">{data.quote}</div>
        }
        <form onSubmit={handleSubmit}>
        <input 
        type="text"
        value={quote}
        onChange={(e) => setQuote(e.target.value)}
        placeholder="Write your quote here"
        />
        <button className="btn green" type="submit">Create</button>
        </form>
    </div>
  )
}

export default CreateQuote