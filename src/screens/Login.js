import React, {useState} from 'react';
import { Link , useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';



export default function Login() {
  const [cred, setcred] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify({
        email: cred.email,
        password: cred.password,
      }))
    const response = await fetch("http://localhost:15000/app/loginUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: cred.email,
        password: cred.password,
      }),
    });
    const json = await response.json()
    console.log(json);
    if (!json.success) {
      alert("Enter valid credentials");
    }
    if (json.success) {
      navigate("/")
      localStorage.setItem("user",cred.email)
      localStorage.setItem("authToken",json.authToken)
      
    }
  };
  const onChange = (event) => {
    setcred({ ...cred, [event.target.name]: event.target.value });
  };

  return (
    <>
    <Navbar/>
      <div className="container">
        
        <form onSubmit={handleSubmit}>
          
          <div className="mb-3 mt-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={cred.email}
              onChange={onChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={cred.password}
              onChange={onChange}
            />
          </div>
         
          

          <button type="submit" className=" m-3 btn btn-primary">
            Submit
          </button>
          <Link to="/signuser" className="m-3 btn btn-warning">
            Not a user, SignUp
          </Link>
        </form>
      </div>
    </>
  )
}
