import React from "react";
import PrimayBtn from "../../../shared/Buttons/PrimayBtn";

const RequestedMeals = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Requested Meals</h2>

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
              <th>Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {/* Example Row 3 */}
            <tr>
              <td>1</td>
              <td>Spaghetti Bolognese</td>
              <td>200</td>
              <td>50</td>

              <td className="flex gap-2">
                <PrimayBtn title={"Delete"} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestedMeals;
