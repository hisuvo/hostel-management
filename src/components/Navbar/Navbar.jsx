import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Auth/AuthProvider/AuthProvider";
import Swal from "sweetalert2";

function Navbar() {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/meals"}>Meals</NavLink>
      </li>
      <li>
        <NavLink to={"/upcoming-meals"}>Upcoming Meals</NavLink>
      </li>
    </>
  );

  // LogOut
  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "bottom-end",
          icon: "success",
          title: "Logout successfuly done",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/user/login");
      })
      .catch((error) => {
        if (error.code) {
          Swal.fire({
            position: "bottom-end",
            icon: "error",
            title: `${error.message}`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  return (
    <div className="backdrop-blur-sm bg-green-200/30  py-2 border-b-2 border-green-500 ">
      <div className="navbar container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm text-center dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link className="btn btn-ghost text-xl">Hostel M.</Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>

        <div className="navbar-end">
          {!user ? (
            <Link
              to={"/user/login"}
              className="btn bg-green-900 hover:bg-green-800 text-white"
            >
              Join Us
            </Link>
          ) : (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button">
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img referrerPolicy="no-referrer" src={user?.photoURL} />
                  </div>
                </div>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
              >
                <li className="disabled  active:bg-white border-b-2">
                  <button className="btn bg-transparent hover:bg-transparent shadow-none border-none text-lg font-semibold disabled">
                    {user?.displayName}
                  </button>
                </li>
                <li>
                  <Link>Dashboard</Link>
                </li>
                <li onClick={handleLogOut}>
                  <Link>LogOut</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
