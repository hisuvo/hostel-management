import React, { useEffect, useState } from "react";

import MealCards from "../../../components/MealCards/MealCards";
import useAxiosPublice from "../../../Hooks/useAxiosPublice";

function Meals() {
  const axiosPublice = useAxiosPublice();
  const [meals, setMeals] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    const fetchMeals = async () => {
      await axiosPublice
        .get(
          `/meals?search=${search}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}`
        )
        .then((res) => {
          setMeals(res.data);
        });
    };
    fetchMeals();
  }, [search, category, minPrice, maxPrice]);

  return (
    <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 mb-14">
      {/* search meal section */}
      <div className="p-6 bg-blue-200 rounded-lg mb-6">
        <h1 className="text-2xl font-bold  mb-4">Search Meals</h1>
        <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search Input */}
          <div>
            <input
              type="text"
              placeholder="Search meals"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-3 border border-blue-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 border border-blue-100 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
            >
              <option value="">Categories</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Dinner">Dinner</option>
              <option value="Lunch">Lunch</option>
            </select>
          </div>

          {/* Min Price Input */}
          <div>
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full p-3 border border-blue-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>

          {/* Max Price Input */}
          <div>
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full p-3 border border-blue-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>
        </form>
      </div>

      {/* Meal cards display */}
      {meals.length > 0 ? (
        <MealCards items={meals} />
      ) : (
        <div>
          <p className="text-4xl text-blue-900 text-center">No meals found</p>
        </div>
      )}
    </div>
  );
}

export default Meals;
