import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function() {
  const [Cred, setCred] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify({
        name: Cred.name,
        email: Cred.email,
        password: Cred.password,
        location: Cred.location,
      }))
    const response = await fetch("http://localhost:15000/app/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: Cred.name,
        email: Cred.email,
        password: Cred.password,
        location: Cred.location,
      }),
    });
    const json = await response.json()
    console.log(json);
    if (!json.success) {
      alert("Enter valid credentials");
    }
  };
  const onChange = (event) => {
    setCred({ ...Cred, [event.target.name]: event.target.value });
  };

  return (
    <>
    <Navbar/>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3 mt-3">
            <label htmlFor="exampleInputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={Cred.name}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={Cred.email}
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
              value={Cred.password}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputLocation" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              name="location"
              value={Cred.location}
              onChange={onChange}
            />
          </div>
          

          <button type="submit" className=" m-3 btn btn-primary">
            Submit
          </button>
          <Link to="/login" className="m-3 btn btn-warning">
            Already a user, LogIn
          </Link>
        </form>
      </div>
    </>
  );
}
