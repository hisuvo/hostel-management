import { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useRequest from "../../../Hooks/useRequest";
import PrimayBtn from "../../../shared/Buttons/PrimayBtn";
import Swal from "sweetalert2";

function ServeMeal() {
  const axiosSecure = useAxiosSecure();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRequests, setFilterRequests] = useState([]);
  const [requests, refetch] = useRequest();

  // server user meal
  const handleServe = (id) => {
    Swal.fire({
      title: "Are you want to served?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure
          .patch(`/request-served/${id}`, {
            status: "delivered",
          })
          .then((res) => {
            if (res.data.acknowledged) {
              Swal.fire({
                title: "Delivered",
                icon: "success",
              });
              refetch();
            }
          });
      }
    });
  };

  // Todo: get search data

  const handleSearch = () => {
    axiosSecure
      // .get(`/requester/search?name=${searchQuery}&email=${searchQuery}`)
      .get(`/requester/search?value=${encodeURIComponent(searchQuery)}`)
      .then((res) => {
        setFilterRequests(res.data);
      })
      .catch((error) => {
        Swal.fire("Search error --->", error.message);
      });
  };

  const displayedRequest = searchQuery ? filterRequests : requests;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Requested user ({requests.length})
      </h2>

      {/* Search Bar */}
      <div className="bg-blue-100 p-4 rounded-md">
        <div className="form-control  max-w-md ">
          <div className="input-group flex gap-2 ">
            <input
              type="text"
              placeholder="Search by username or email"
              className="input input-bordered w-full"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <PrimayBtn onClick={handleSearch} title={"Search"} />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* Table Header */}
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Username</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {displayedRequest.map((request, index) => (
              <tr key={request._id}>
                <td>{++index}</td>
                <td>{request?.title}</td>
                <td>{request?.userName || "anonymous"}</td>
                <td>{request?.requestEmail}</td>
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
                <td>
                  <PrimayBtn
                    onClick={() => handleServe(request._id)}
                    title={"serve"}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ServeMeal;
