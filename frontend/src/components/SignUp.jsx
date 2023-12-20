import { useState } from "react"
import "../styles/app.css"

const SignUp = () => {

    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
    }
    
  return (
    <div className="container my-container">
        <h5>Login!!</h5>
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
              <button className="btn #673ab7 deep-purple" type="submit">Submit</button>
            </form>
    </div>
  )
}

export default SignUp