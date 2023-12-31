import React from "react";

export default function Carousel() {
  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide carousel-fade "
    >
      <div className="carousel-inner">
        <div
          className="carousel-caption d-none d-md-block"
          style={{ zIndex: "5" }}
        >
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success text-white bg-success"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>

        <div className="carousel-item active" style={{ objectFit: "contain" }}>
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
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
