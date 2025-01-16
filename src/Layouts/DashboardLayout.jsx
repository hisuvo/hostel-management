import { FaAlignLeft } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";

// TODO: it user for test. End of the test delete isAdim variable
const isAdmin = false;

const DashboardLayout = () => {
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

          <div className="flex flex-col bg-blue-100 text-blue-950 min-h-full w-[17rem] p-4">
            <div className="mb-4 lg:mb-8">
              <h2 className="text-2xl lg:text-3xl uppercase font-bold text-center">
                Hostel M.
              </h2>
            </div>

            {/* menu section */}
            <div className="flex-grow">
              <div className="menu">
                {isAdmin === true ? (
                  <ul>
                    {/* Admin content here */}
                    <li>
                      <NavLink to={"admin-profile"}>Admin-profile</NavLink>
                    </li>
                    <li>
                      <NavLink to={"manage-users"}>Manage Users</NavLink>
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
                      <NavLink to={"upcoming-meals"}>Upcoming Meals</NavLink>
                    </li>
                  </ul>
                ) : (
                  <ul className="space-y-2">
                    {/* User content here */}
                    <li>
                      <NavLink to={"user-profile"}>My Profile</NavLink>
                    </li>
                    <li>
                      <NavLink to={"requested-meals"}>Requested Meals</NavLink>
                    </li>
                    <li>
                      <NavLink to={"user-review"}>My Reviews</NavLink>
                    </li>
                    <li>
                      <NavLink to={"user-payment-history"}>
                        Payment History
                      </NavLink>
                    </li>
                  </ul>
                )}
                <div className="divider"></div>
                <ul>
                  {/* Sidebar content here */}
                  <li>
                    <NavLink to={"/"}>Home</NavLink>
                  </li>
                  <li>
                    <NavLink to={"meala"}>Meals</NavLink>
                  </li>
                  <li>
                    <NavLink to={"upcomming-meal"}>Upcomming Meals</NavLink>
                  </li>
                </ul>
              </div>
            </div>

            {/* setting section */}
            <div className="menu">
              <ul>
                <li>
                  <NavLink to={"setting"}>Setting</NavLink>
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
