import { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useRequest from "../../../Hooks/useRequest";
import PrimayBtn from "../../../shared/Buttons/PrimayBtn";
import Swal from "sweetalert2";
import Lodder2 from "../../../components/Lodder/Lodder2";
import SectionTitle from "../../../shared/SectionTitle";

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

  const handleSearch = () => {
    axiosSecure
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
      <SectionTitle heading={`Requested user (${requests.length})`} />

      {/* Search Bar */}
      <div className="p-6 bg-blue-50 dark:bg-gray-800  rounded-md">
        <div className="form-control  max-w-md ">
          <div className="input-group flex gap-2 ">
            <input
              type="text"
              placeholder="Search by username or email"
              className="input input-bordered border-2 border-blue-300 bg-transparent w-full"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <PrimayBtn onClick={handleSearch} title={"Search"} />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* Table Header */}
          <thead className="text-gray-900 text-xl dark:text-gray-50">
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
          {displayedRequest.length > 0 ? (
            <tbody className="text-gray-900 dark:text-gray-50">
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
          ) : (
            <tbody>
              <Lodder2 />
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}

export default ServeMeal;
