import React from "react";
import PrimayBtn from "../../../shared/Buttons/PrimayBtn";

const AllMealTable = () => {
  // const [sortField, setSortField] = useState(""); // To track the current sort field

  // const handleSort = (field) => {
  //   setSortField(field);
  //   // Call server-side sorting logic here with the field (likes or reviews_count)
  //   console.log(`Sorting by ${field}`);
  // };
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Meals</h2>

      {/* Search and Sort Controls */}
      <div className="flex justify-end items-center mb-6">
        {/* Sort Buttons */}
        <div className="flex gap-4">
          <button
            //ToDo: onClick={() => handleSort("likes")}
            className={`btn btn-sm ${
              // sortField === "likes" ? "btn-active" : ""
              true === "likes" ? "btn-active" : ""
            }`}
          >
            Sort by Likes
          </button>
          <button
            //TODO: onClick={() => handleSort("reviews_count")}
            className={`btn btn-sm ${
              // sortField === "reviews_count" ? "btn-active" : ""
              true === "reviews_count" ? "btn-active" : ""
            }`}
          >
            Sort by Reviews Count
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* Table Header */}
          <thead>
            <tr>
              <th></th>
              <th>Meal Title</th>
              <th>Likes</th>
              <th>Reviews Count</th>
              <th>Rating</th>
              <th>Distributor</th>
              <th>Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {/* Example Row 3 */}
            <tr>
              <td>3</td>
              <td>Spaghetti Bolognese</td>
              <td>200</td>
              <td>50</td>
              <td>
                <div className="rating">
                  <input
                    type="radio"
                    name="rating-3"
                    className="mask mask-star-2 bg-yellow-400"
                    checked
                    readOnly
                  />
                  <span>4.8</span>
                </div>
              </td>
              <td>Michael Johnson</td>
              <td className="flex gap-2">
                <PrimayBtn title={"view"} />
                <PrimayBtn title={"Update"} />
                <PrimayBtn title={"Delete"} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllMealTable;
