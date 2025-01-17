import { FaSearch } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import PrimayBtn from "../../../shared/Buttons/PrimayBtn";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ManageUser = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // console.log(users);
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
          console.log(res.data);
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

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Users {users.length}</h2>

      {/* Search Bar */}
      <div className="form-control mb-6 max-w-md">
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="by username and email"
          />
          <FaSearch />
        </label>
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
