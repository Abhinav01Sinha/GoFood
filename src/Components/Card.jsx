//---------------------- MY CARD -----------------

import React, { useState, useRef, useEffect } from "react";
import { BiRupee } from "react-icons/bi";
import { useCart } from "../Context/CartContext";

export default function Card({ item }) {
  let optionKeys = Object.keys(item.options[0]);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const priceRef = useRef();

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  let total = qty * parseInt(item.options[0][size]);

  // Adding to Cart
  const [cart, setCart] = useCart();

  return (
    <div className="card mb-4">
      <img
        src={item.img}
        className="card-img-top"
        style={{ height: "190px", objectFit: "fill" }}
      />
      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>
        {/* <p className="card-text">{item.description}</p> */}

        <label htmlFor="qty">Quantity</label>
        <select
          className="my-3 mx-2 bg-success"
          name="qty"
          id="qty"
          onChange={(e) => setQty(e.target.value)}
        >
          {Array.from(Array(6), (e, i) => {
            return (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            );
          })}
        </select>

        <label htmlFor="size">Size</label>
        <select
          className="my-3 mx-2 bg-success"
          name="size"
          id="size"
          ref={priceRef}
          onChange={(e) => setSize(e.target.value)}
        >
          {/* Getting keys of an Object  */}
          {optionKeys.map((opt, i) => {
            return (
              <option key={i + 1} value={opt}>
                {opt}
              </option>
            );
          })}
        </select>
        <br />
        <div className="fs-5">
          Total Price : <BiRupee />
          {total}{" "}
        </div>
        <hr />
        <div className="d-flex align-items-center justify-content-center mt-2">
          <button
            className="btn btn-success text-white fw-bold"
            onClick={() => {
              setCart([
                ...cart,
                {
                  name: item.name,
                  size: size,
                  quantity: qty,
                  total: total,
                  date: Date().substring(0, 20),
                },
              ]);
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
