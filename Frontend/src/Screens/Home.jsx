import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Card from "../Components/Card";

export default function Home() {
  const [category, setCategory] = useState([]);
  const [foodItem, setFooditem] = useState([]);
  const [search, setSearch] = useState("");

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();

    setFooditem(response[0]);
    setCategory(response[1]);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Navbar />
      <div
        id="carouselExampleIndicators"
        className="carousel slide carousel-fade "
      >
        <div className="carousel-inner">
          <div
            className="carousel-caption d-none d-md-block"
            style={{ zIndex: "5" }}
          >
            {/* Searchbar Logic */}
            <div className="d-flex justify-content-center" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={handleChange}
                value={search}
              />
            </div>
          </div>

          <div
            className="carousel-item active"
            style={{ objectFit: "contain" }}
          >
            <img
              src="https://source.unsplash.com/random/900x700/?burger"
              className=" slides d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/900x700/?pizza"
              className=" slides d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/900x700/?coffee"
              className="slides d-block w-100"
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="container">
        {/* Distributing on basis of category */}
        {category.map((cat, i) => {
          return (
            <div className="row mb-3" key={cat._id}>
              <h2 className="m-2">{cat.CategoryName}</h2>
              <hr />

              {/* Mapping after filtering items on basis of category */}
              {/* Searchbar Logic */}
              {foodItem.size !== 0 ? (
                foodItem
                  .filter(
                    (item) =>
                      item.CategoryName === cat.CategoryName &&
                      item.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((filterItems) => {
                    return (
                      <div className="col-12 col-md-6 col-lg-3 mt-2">
                        <Card
                          key={filterItems._id}
                          foodName={filterItems.name}
                          item={filterItems}
                          options={filterItems.options[0]}
                          ImgSrc={filterItems.img}
                        />
                      </div>
                    );
                  })
              ) : (
                <div>No Data Found</div>
              )}
            </div>
          );
        })}
      </div>

      <Footer />
    </>
  );
}
