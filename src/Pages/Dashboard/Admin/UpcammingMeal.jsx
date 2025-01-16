import React from "react";

function UpcammingMeal() {
  document.title = "Hostel M. | upcommig meal";
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Upcomming Meals</h2>

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
        </div>
      </div>
    </div>
  );
}

export default UpcammingMeal;
