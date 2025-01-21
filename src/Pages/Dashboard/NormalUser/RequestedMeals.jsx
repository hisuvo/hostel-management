import React, { useContext } from "react";
import PrimayBtn from "../../../shared/Buttons/PrimayBtn";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublice from "../../../Hooks/useAxiosPublice";
import { AuthContext } from "../../../Auth/AuthProvider/AuthProvider";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const RequestedMeals = () => {
  const axiosPublice = useAxiosPublice();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  // user email specifice requestMeal collect from database
  const { data: requestMeals = [], refetch } = useQuery({
    queryKey: ["request-meals"],
    queryFn: async () => {
      const res = await axiosPublice.get(`/meal/request/${user?.email}`);
      return res.data;
    },
  });

  // delete user unLike meal
  const handleRequestCancle = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to cancle requested meal",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // delete meal
        await axiosSecure
          .delete(`/delete/request-mela/${id}`)
          .then((res) => {
            refetch();
            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: "Your Meal has been deleted.",
            });
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: `${error.message}`,
            });
          });
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Requested Meals ({requestMeals.length})
      </h2>

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
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {requestMeals.map((request, index) => (
              <tr key={request._id}>
                <td>{++index}</td>
                <td>{request?.title}</td>
                <td>{request?.likes}</td>
                <td>{request?.reviews_count}</td>
                <td>
                  <span
                    className={`badge ${
                      request?.status === "delivered"
                        ? "badge-success text-white"
                        : "badge-secondary"
                    } `}
                  >
                    {request?.status}
                  </span>
                </td>

                <td
                  className={`flex gap-2 ${
                    request?.status === "delivered" ? "btn-disabled" : " "
                  }`}
                >
                  <PrimayBtn
                    onClick={() => handleRequestCancle(request?._id)}
                    title={"Cancel"}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestedMeals;
