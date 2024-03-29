import { useQuery } from "@apollo/client";
import { MY_PROFILE } from "../gqlOperations/queries";
import {useNavigate} from "react-router-dom"

const Profile = () => {

    const navigate = useNavigate();
    const {loading, error, data} = useQuery(MY_PROFILE);

    if(!localStorage.getItem("token")){
        navigate("/login");
        return <h1>Unauthorized User!</h1>
    }

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

export default Profile