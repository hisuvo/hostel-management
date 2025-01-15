import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

function MealCard({ meal }) {
  const { _id, title, image, rating, price } = meal;

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      {/* <img className="p-8 rounded-t-lg" src={image} alt={title} /> */}
      <img
        className="p-2 rounded-t-lg"
        src={
          "https://www.ourhappymess.com/wp-content/uploads/2024/04/Blueberry-Loaf-Cake-square-featured-768x768.jpg"
        }
        alt={title}
      />
      <div className="px-5 pb-5">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <div className="flex items-center mt-2.5 mb-5">
          <div>
            <Rating style={{ maxWidth: 120 }} value={Math.floor(rating)} />
          </div>
          <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-800 ms-3">
            {Math.floor(rating)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            ${price}
          </span>
          <Link
            to={`/meal-details/${_id}`}
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Show Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MealCard;
