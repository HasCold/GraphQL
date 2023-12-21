import { useState } from "react"
import "../../styles/app.css"
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { SIGNUP_USER } from "../../gqlOperations/mutation";

// SignUp is a mutation operation part
const SignUp = () => {

    const [formData, setFormData] = useState({});
    const [signUpUser, {loading, error, data}] = useMutation(SIGNUP_USER);  //  -->> Hook

    if(loading) return <h1>Loading...</h1>

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        signUpUser({
          variables: {
            userInfo: formData
          }
        });        
    }
    
  return (
    <div className="container my-container">
        {
          error && <div className="red card-panel">{error.message}</div>
        }
        {
          data && data.user && <div className="green card-panel">{data.user.firstName} is SignedUp. You can logged in now !</div>
        }
        <h5>SignUp!!</h5>
            <form onSubmit={(e) => handleSubmit(e)}>
            <input 
              type="text"
              placeholder="Enter your first name"
              name="firstName"
              onChange={handleChange}
              required
              />
              <input 
              type="text"
              placeholder="Enter your last name"
              name="lastName"
              onChange={handleChange}
              required
              />
              <input 
              type="email"
              placeholder="Enter your email"
              name="email"
              onChange={handleChange}  // both are same (e) => handleChange(e) || handleChange ; because when the react calls it they will automatically pass the event to the function
              required
              />
              <input 
              type="password"
              placeholder="Enter your password"
              name="password"
              onChange={handleChange}
              required
              />
              <Link to="/login">
              <p>Already have an account ? </p>
              </Link>
              <button className="btn #673ab7 deep-purple" type="submit">Submit</button>
            </form>
    </div>
  )
}

export default SignUp