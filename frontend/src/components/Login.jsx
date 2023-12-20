import { useState } from "react"
import "../styles/app.css"

const Login = () => {
  
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {

    setFormData({
      ...formData,  // previous object field copy
      [e.target.name]: e.target.value   // you can see the target value in the console
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  }
  
  return (
    <div className="container my-container">
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
              <button className="btn #673ab7 deep-purple" type="submit">Login</button>
            </form>
    </div>
  )
}

export default Login