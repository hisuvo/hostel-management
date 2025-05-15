import { FaAlignLeft } from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";

const DashboardLayout = () => {
  const [isAdmin] = useAdmin();

  const handleDrawerClose = () => {
    const drawerCheckbox = document.getElementById("my-drawer-2");
    if (drawerCheckbox) drawerCheckbox.checked = false;
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        {/* drawer content section */}
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="btn drawer-button bg-gray-50 dark:bg-transparent dark:text-gray-50 text-gray-900 border-none lg:hidden"
          >
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
                        <NavLink
                          to={"/dashboard/admin-profile"}
                          onClick={handleDrawerClose}
                        >
                          Admin Home
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to={"manage-users"}
                          onClick={handleDrawerClose}
                        >
                          All Users (manage)
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to={"add-meal"} onClick={handleDrawerClose}>
                          Add Meal
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to={"all-meal-table"}
                          onClick={handleDrawerClose}
                        >
                          all Meals
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to={"all-review"} onClick={handleDrawerClose}>
                          All Reviews
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to={"serve-meals"} onClick={handleDrawerClose}>
                          Serve Meals
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to={"all-upcoming-meals"}
                          onClick={handleDrawerClose}
                        >
                          All Upcoming Meals
                        </NavLink>
                      </li>
                    </>
                  ) : (
                    <>
                      {/* User content here */}
                      <li>
                        <NavLink
                          to={"user-profile"}
                          onClick={handleDrawerClose}
                        >
                          My Profile
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to={"requested-meals"}
                          onClick={handleDrawerClose}
                        >
                          Requested Meals
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to={"user-review"} onClick={handleDrawerClose}>
                          My Reviews
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to={"user-payment-history"}
                          onClick={handleDrawerClose}
                        >
                          Payment History
                        </NavLink>
                      </li>
                    </>
                  )}
                </ul>
                <div className="divider"></div>
                <ul>
                  <li>
                    <NavLink to={"/"} onClick={handleDrawerClose}>
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/meals"} onClick={handleDrawerClose}>
                      Meals
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/upcoming-meals"} onClick={handleDrawerClose}>
                      Upcomming Meals
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>

            {/* About me section */}
            <div className="menu">
              <ul>
                <li>
                  <NavLink to={"about-me"} onClick={handleDrawerClose}>
                    About Me
                  </NavLink>
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
