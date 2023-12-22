import { useQuery } from "@apollo/client";
import {useParams} from "react-router-dom";
import { GET_USER_BY_ID } from "../../gqlOperations/queries";

const OtherUserProfile = () => {

    const {userId} = useParams();
    const {loading, error, data} = useQuery(GET_USER_BY_ID, {
        variables:{
            userId   // key-value pair both are same so we directly wrote the userId variable 
        }
    });

    if(loading) return <h1>Profile is loading...</h1>

    if(error){
        console.log(error)
    }

  return (
    <div className='container my-container'>
        <div className="center-align">
            {/* Use of this website for robot image :- https://robohash.org/ */}
        <img 
        className="circle"
        style={{border: "2px solid black", marginTop: "10px"}}
        src={`https://robohash.org/${data.user.firstName}.png?size=200x200`}
        />
            <h5>{data.user.firstName} {data.user.lastName}</h5>
            <h6>Email - {data.user.email}</h6>
        </div>

        <h3>Your Quotes</h3>
        { data.user.quotes.map(quote => (
            <>
        <blockquote key={quote.by._id}>
            <h6>{quote.name}</h6>
        </blockquote>
            </>
        )) }

    </div>
  )
}

export default OtherUserProfile;