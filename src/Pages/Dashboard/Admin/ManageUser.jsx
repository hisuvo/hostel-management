import { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ManageUser = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["user", searchQuery],
    queryFn: async () => {
      if (searchQuery) {
        const res = await axiosSecure.get(
          `/users?name=${searchQuery}&email=${searchQuery}`
        );
        return res.data;
      } else {
        const res = await axiosSecure.get(`/users`);
        return res.data;
      }
    },
    enabled: true,
  });

  // handle make admin
  const handleMakeAdmine = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `${user.name} is Admin Now!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Admin him",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
          if (res.data?.modifiedCount > 0) {
            refetch();
            Swal.fire({
              title: "Admin",
              text: `${user.name} has been Admin.`,
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleSearch = () => {
    refetch();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Users {users.length}</h2>

      {/* Search Bar */}
      <div className="bg-blue-100 p-4 rounded-md">
        <div className="form-control  max-w-md">
          <div className="input-group flex gap-2">
            <input
              type="text"
              placeholder="Search by username or email"
              className="input input-bordered w-full"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="btn bg-blue-700 hover:bg-blue-800 text-white"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* Table Header */}
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Email</th>
              <th>Subscription</th>
              <th>Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{++index}</td>
                <td className="uppercase">{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span
                    className={`badge ${
                      user.badge === "silver plan" ? "bg-gray-300" : ""
                    } 
                    ${user.badge === "golden plan" ? "bg-yellow-400" : ""}
                    ${user.badge === "platinum plan" ? "bg-blue-400" : ""}
                    `}
                  >
                    {user.badge}
                  </span>
                </td>
                <td>
                  {/*if user role is admin then 
                    show admin other wise show make admine button */}
                  {user.role === "admin" ? (
                    <span className="badge badge-success text-white">
                      Admin
                    </span>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmine(user)}
                      className="btn btn-primary btn-xs"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
