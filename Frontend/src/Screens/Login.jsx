import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const notify = () => toast.success("Logged In Successfully");

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Assigning if LoggedIn or Not
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const output = await response.json();

    if (!output.success) {
      alert("Invalid Credentials !!!");
    } else {
      localStorage.setItem("authToken", output.authToken);
      //console.log(localStorage.getItem("authToken"));
      notify();
      navigate("/");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="d-flex align-items-center justify-content-center">
        <div className="card mt-4 " style={{ width: "28rem" }}>
          <img
            src="https://media.istockphoto.com/id/1224866140/vector/fast-takeaway-food-paper-bag-for-delivery.jpg?s=612x612&w=0&k=20&c=ObpFFOisE3EpprepSSohMEwd8OLgdG2MgSxBZqsC0KM="
            className="card-img-top"
            alt="..."
            style={{ height: "16rem" }}
          />
          <div className="card-body">
            <h2 className="m-4 text-center">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                />
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
                  value={credentials.password}
                  onChange={handleChange}
                />
              </div>

              <div className="d-flex align-items-center justify-content-center">
                <button type="submit" className="m-3 btn btn-success">
                  Login
                </button>

                <Link to={"/createuser"} className="m-3 btn btn-danger">
                  {" "}
                  New User
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
