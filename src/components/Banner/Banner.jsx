import React from "react";
import Container from "../../shared/Container/Container";

function Banner() {
  return (
    <div className="bg-blue-900 dark:bg-blue-950 min-h-[calc(100vh-150px)] flex justify-center items-center px-4">
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
            className="w-3/4 md:w-1/2 px-4 py-2 text-gray-700 dark:bg-gray-50 rounded-l-md focus:outline-none"
          />
          <button className="bg-white text-blue-600 dark:bg-blue-500 dark:text-gray-50 px-6 py-2 font-semibold rounded-r-md hover:bg-gray-200">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default Banner;
