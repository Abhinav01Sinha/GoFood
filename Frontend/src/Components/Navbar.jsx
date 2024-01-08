import React, { useState } from "react";
import { BsCart4 } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "react-bootstrap";
import { useCart } from "../Context/CartContext";
import { useOrder } from "../Context/OrderContext";

import toast from "react-hot-toast";

export default function Navbar() {
  const notify = () => toast.success("Logged Out Successfully");

  let [cart, setCart, cartTotal] = useCart();
  let [order, setOrder] = useOrder();

  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    notify();
    setCart([]);
    setOrder([]);
    cartTotal = 0;
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-dark bg-success navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div className="navbar-brand fs-2" to="/">
            GoFood
          </div>

          <div className="collapse navbar-collapse fw-bold" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/"
                >
                  <FaHome /> Home
                </Link>
              </li>

              {/* If LoggedIn then display MyOrder , Cart and logout else display SignUp or Login */}

              {localStorage.getItem("authToken") ? (
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/myorders"
                >
                  MyOrders
                </Link>
              ) : (
                ""
              )}
            </ul>

            {/* When Not LoggedIn AND Logout */}
            {!localStorage.getItem("authToken") ? (
              <div className="d-flex ">
                <Link
                  className="btn bg-white text-success mx-1 fw-bold"
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  className="btn bg-white text-success mx-1 fw-bold"
                  to="/createuser"
                >
                  SignUp
                </Link>
              </div>
            ) : (
              <div className="d-flex ">
                <Link
                  className="btn bg-white text-success mx-1 fw-bold "
                  to="/cart"
                >
                  <BsCart4 /> Cart{" "}
                  <Badge pill bg="danger">
                    {cart.length}
                  </Badge>
                </Link>

                <div
                  className="btn bg-danger text-white mx-1 fw-bold"
                  onClick={handleLogOut}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
