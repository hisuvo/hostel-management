import PrimayBtn from "../../../shared/Buttons/PrimayBtn";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import Lodder2 from "../../../components/Lodder/Lodder2";

const AllMealTable = () => {
  const axiosSecure = useAxiosSecure();
  const [meals, setMeals] = useState([]);
  const [sortBy, setSortBy] = useState("likes");
  const [order, setOrder] = useState("desc");

  // deleted meal
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure to delete",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // ---
        await axiosSecure
          .delete(`/delete-meal/${id}`)
          .then((res) => {
            if (res.data.acknowledged) {
              Swal.fire({
                title: "Deleted",
                icon: "success",
              });
              setMeals((prev) => prev.filter((meal) => meal._id !== id)); //
            }
          })
          .catch((error) => {
            Swal.fire(error.message);
          });
      }
    });
  };

  // meal likes and review_count sort order
  useEffect(() => {
    const fetchMeals = async () => {
      await axiosSecure
        .get(`/meals/sortOrder`, { params: { sortBy, order } })
        .then((res) => {
          setMeals(res.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };

    fetchMeals();
  }, [sortBy, order]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Meals</h2>

      {/* Search and Sort Controls */}
      <div className=" p-6 bg-blue-950 rounded-md">
        {/* Sort Buttons */}
        <div className="flex justify-start items-center gap-4">
          <label className="text-xl font-semibold">Sort By:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 px-2 rounded-md outline-blue-500"
          >
            <option value="likes">Likes</option>
            <option value="reviews_count">Reviews Count</option>
          </select>

          <label className="text-xl font-semibold">Order:</label>
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="p-2 px-2 rounded-md outline-blue-500"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
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

          {meals.length > 0 ? (
            <tbody>
              {meals.map((meal, index) => (
                <tr key={meal?._id}>
                  <td>{++index}</td>
                  <td>{meal?.title}</td>
                  <td>{meal?.likes}</td>
                  <td>{meal?.reviews_count}</td>
                  <td>{meal?.rating}</td>

                  <td>{meal?.distributorName}</td>

                  <td className="flex gap-2">
                    <Link to={`/meal-details/${meal?._id}`}>
                      <PrimayBtn title={"view"} />
                    </Link>

                    <Link to={`/dashboard/update-meal/${meal?._id}`}>
                      <PrimayBtn title={"Update"} />
                    </Link>

                    <PrimayBtn
                      onClick={() => handleDelete(meal?._id)}
                      title={"Delete"}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <Lodder2 />
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default AllMealTable;
