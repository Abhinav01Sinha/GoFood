import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useCart } from "../Context/CartContext";
import { useOrder } from "../Context/OrderContext";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

export default function Cart() {
  let [cart, setCart, cartTotal] = useCart();

  const removeItem = (ind) => {
    let myCart = [...cart];
    myCart.splice(ind, 1);
    setCart(myCart);
    toast.success("Item Removed!");
  };

  let [order, setOrder] = useOrder();

  const navigate = useNavigate();
  const notify = () => toast.success("Order Placed Successfully");

  const checkOut = () => {
    {
      if (cartTotal === 0) {
        toast.error("Your Cart is Empty!");
      } else {
        let myCart = [...cart];
        setOrder([...order, myCart]);
        toast.success("Order Placed Successfully");
        setCart([]);
        cartTotal = 0;
        navigate("/myOrders");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div>
        <div className="container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md">
          <table className="table table-hover ">
            <thead className=" text-success fs-4">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Option</th>
                <th scope="col">Amount</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((food, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{food.name}</td>
                  <td>{food.quantity}</td>
                  <td>{food.size}</td>
                  <td>{food.total}</td>
                  <td>
                    <button
                      type="button"
                      className="btn p-0"
                      onClick={() => removeItem(index)}
                    >
                      <MdDelete />
                    </button>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <h1 className="fs-2">Total Price: {cartTotal}/-</h1>
          </div>
          <div>
            <button className="btn bg-success mt-5 " onClick={checkOut}>
              {" "}
              Check Out{" "}
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
