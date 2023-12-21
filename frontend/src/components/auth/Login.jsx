import { useState } from "react"
import "../../styles/app.css"
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { SIGNIN_USER } from "../../gqlOperations/mutation";

const Login = () => {
  
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const [signInUser, {loading, error, data}] = useMutation(SIGNIN_USER, {
    onCompleted(data){
      localStorage.setItem("token", data.user.token);
      navigate("/")      
    }
  });  // signUpUser is a mutate function which works as a method like POST 

  if(loading) return <h1>Loading...</h1>

  const handleChange = (e) => {

    setFormData({
      ...formData,  // previous object field copy
      [e.target.name]: e.target.value   // you can see the target value in the console
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    signInUser({
      variables:{
        userlogin: formData
      }
    })
  }
  
  return (
    <div className="container my-container">
        {error && <div className="red card-panel">{error.message}</div>}
        <h5>Login!!</h5>
            <form onSubmit={(e) => handleSubmit(e)}>
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
              <Link to="/signup">
              <p>Dont have an account ? </p>
              </Link>
              <button className="btn #673ab7 deep-purple" type="submit">Login</button>
            </form>
    </div>
  )
}

export default Login