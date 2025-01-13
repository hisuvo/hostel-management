import React from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const links = (
    <>
      <li>
        <Link>Home</Link>
      </li>
      <li>
        <Link>Meals</Link>
      </li>
      <li>
        <Link>Upcoming Meals</Link>
      </li>
    </>
  );
  return (
    <div className="navbar backdrop-blur-sm bg-green-500/30  py-4 border-b-2 border-green-500 ">
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Hostel M.</a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="navbar-end">
        {!true ? (
          <a className="btn">Join Us</a>
        ) : (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn m-1">
              Click
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              <li className="disabled flex-grow border-b-2 flex justify-center items-center">
                <a>Item 1</a>
              </li>
              <li>
                <a>Item 2</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
