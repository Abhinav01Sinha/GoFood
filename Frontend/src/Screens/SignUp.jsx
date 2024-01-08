import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function SignUp() {
  const notify = () => toast.success("Signed Up Successfully");

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation,
      }),
    });

    const output = await response.json();

    if (!output.success) {
      alert("Invalid Credentials !!!");
    } else {
      localStorage.setItem("authToken", output.authToken);
      notify();
      navigate("/");
    }
  };

  return (
    <>
      <Navbar />
      <div className="mt-4 d-flex align-items-center justify-content-center">
        <div className="card mb-3">
          <div className="row g-0 ">
            <div className="col-md-4">
              <img
                src="https://miro.medium.com/v2/resize:fit:1024/1*tNeNC4ewO0oEyijovZIkDQ.jpeg"
                className="img-fluid rounded-start"
                alt="..."
                style={{ height: "100%" }}
              />
            </div>
            <div className="col-md-7 mx-auto">
              <div className="card-body ">
                <h2 className="mb-4 text-center">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="InputName" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="InputName"
                      name="name"
                      value={credentials.name}
                      onChange={handleChange}
                    />
                  </div>

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
                    <div id="emailHelp" className="form-text">
                      We'll never share your email with anyone else.
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="Address" className="form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="geolocation"
                      name="geolocation"
                      value={credentials.geolocation}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
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

                  <button type="submit" className="m-3 btn btn-success">
                    Submit
                  </button>

                  <Link to={"/login"} className="m-3 btn btn-danger">
                    {" "}
                    Already a User
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
