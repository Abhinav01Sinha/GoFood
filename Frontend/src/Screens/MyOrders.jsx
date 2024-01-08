import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useOrder } from "../Context/OrderContext";

export default function MyOrders() {
  let [order, setOrder] = useOrder();

  return (
    <>
      <Navbar />
      <h2 className="text-center mt-3">MY ORDERS</h2>
      <div className="container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md">
        <table className="table table-hover ">
          <thead className=" text-success fs-4">
            <tr className="text-center">
              <th scope="col">#</th>
              <th scope="col">Ordered Items</th>
              <th scope="col">Size</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            {order.map((food, index) => (
              <tr>
                <th className="text-center" scope="row">
                  {index + 1}
                </th>
                <td className="text-center">
                  {food.map((item, i) => {
                    return <div>{item.name}</div>;
                  })}
                </td>
                <td className="text-center">
                  {food.map((item, i) => {
                    return <div>{item.size}</div>;
                  })}
                </td>
                <td className="text-center">
                  {food.map((item, i) => {
                    return <div>{item.quantity}</div>;
                  })}
                </td>
                <td className="text-center">
                  {food.map((item, i) => {
                    return <div>{item.total}</div>;
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
}
