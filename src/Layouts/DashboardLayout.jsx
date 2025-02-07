import { FaAlignLeft } from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";

const DashboardLayout = () => {
  const [isAdmin] = useAdmin();

  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        {/* drawer content section */}
        <div className="drawer-content">
          {/* Page content here */}
          <label htmlFor="my-drawer-2" className="btn drawer-button lg:hidden">
            <FaAlignLeft />
          </label>
          {/* test for text user  */}
          <div className="container mx-auto">
            <Outlet />
          </div>
        </div>

        {/* drawer admin and users menu section */}
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <div className="flex flex-col bg-blue-900 text-white min-h-full w-[17rem] p-4">
            <div className="mb-4 lg:mb-8">
              <Link to={"/"}>
                <h2 className="text-2xl lg:text-3xl uppercase font-bold text-center">
                  Hostel M.
                </h2>
              </Link>
            </div>

            {/* menu section */}
            <div className="flex-grow">
              <div className="menu">
                <ul>
                  {isAdmin ? (
                    <>
                      {/* Admin content here */}
                      <li>
                        <NavLink to={"/dashboard/admin-profile"}>
                          Admin Home
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to={"manage-users"}>
                          All Users (manage)
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to={"add-meal"}>Add Meal</NavLink>
                      </li>
                      <li>
                        <NavLink to={"all-meal-table"}>all Meals</NavLink>
                      </li>
                      <li>
                        <NavLink to={"all-review"}>All Reviews</NavLink>
                      </li>
                      <li>
                        <NavLink to={"serve-meals"}>Serve Meals</NavLink>
                      </li>
                      <li>
                        <NavLink to={"all-upcoming-meals"}>
                          All Upcoming Meals
                        </NavLink>
                      </li>
                    </>
                  ) : (
                    <>
                      {/* User content here */}
                      <li>
                        <NavLink to={"user-profile"}>My Profile</NavLink>
                      </li>
                      <li>
                        <NavLink to={"requested-meals"}>
                          Requested Meals
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to={"user-review"}>My Reviews</NavLink>
                      </li>
                      <li>
                        <NavLink to={"user-payment-history"}>
                          Payment History
                        </NavLink>
                      </li>
                    </>
                  )}
                </ul>
                <div className="divider"></div>
                <ul>
                  <li>
                    <NavLink to={"/"}>Home</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/meals"}>Meals</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/upcoming-meals"}>Upcomming Meals</NavLink>
                  </li>
                </ul>
              </div>
            </div>

            {/* About me section */}
            <div className="menu">
              <ul>
                <li>
                  <NavLink to={"about-me"}>About Me</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
