import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import PrimayBtn from "../Buttons/PrimayBtn";

function MealCard({ meal }) {
  const { _id, title, image, rating, price } = meal;

  return (
    <div className="w-full max-w-sm flex flex-col bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img className="rounded-t-lg flex-grow" src={image} alt={title} />

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
          <Link to={`/meal-details/${_id}`}>
            <button className="btn bg-blue-700 hover:bg-blue-800 text-white">
              Show Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MealCard;
