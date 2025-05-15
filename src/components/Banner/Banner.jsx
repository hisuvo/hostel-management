import React from "react";
import Container from "../../shared/Container/Container";

function Banner() {
  return (
    <div className="gradient-bg  min-h-[calc(100vh-100px)] flex justify-center items-center px-4">
      <div className="max-w-4xl mx-auto text-white text-center">
        <h1 className="text-2xl md:text-4xl font-bold mb-4">
          Welcome to the University Hostel
        </h1>

        <p className="text-base md:text-lg mb-8">
          Manage student meals, food reviews, and streamline hostel operations
          all in one place.
        </p>

        <div className="flex justify-center items-center">
          <input
            type="text"
            placeholder="Search by student or hostel..."
            className="w-3/4 md:w-1/2 px-4 p-3 text-gray-700 bg-gray-50 rounded-l-md focus:outline-none"
          />
          <button className=" text-gray-50 bg-blue-500 px-6 p-3 font-semibold rounded-r-md">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default Banner;
