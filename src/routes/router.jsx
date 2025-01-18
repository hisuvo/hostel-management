import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home/Home";
import Meals from "../Pages/Meals/Meals/Meals";
import UpcomingMeals from "../Pages/UpcomingMeals/UpcomingMeals/UpcomingMeals";
import Login from "../Pages/Login/Login";
import SingUP from "../Pages/SingUp/SingUP";
import MealDetails from "../Pages/MealDetails/MealDetails";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layouts/DashboardLayout";
import UserProfile from "../Pages/Dashboard/NormalUser/UserProfile";
import RequestedMeals from "../Pages/Dashboard/NormalUser/RequestedMeals";
import UserReviews from "../Pages/Dashboard/NormalUser/UserReviews";
import PaymentHistory from "../Pages/Dashboard/NormalUser/PaymentHistory";
import AddMealForm from "../Pages/Dashboard/Admin/AddMeal";
import AdminProfile from "../Pages/Dashboard/Admin/AdminProfile";
import ManageUser from "../Pages/Dashboard/Admin/ManageUser";
import AllMealTable from "../Pages/Dashboard/Admin/AllMealTable";
import AllReview from "../Pages/Dashboard/Admin/AllReview";
import ServeMeal from "../Pages/Dashboard/Admin/ServeMeal";
import UpcammingMeal from "../Pages/Dashboard/Admin/UpcammingMeal";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import CheckOut from "../Pages/CheckOut/CheckOut";
import AdminRoute from "./AdminRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/meals",
        element: (
          <PrivateRoute>
            <Meals />
          </PrivateRoute>
        ),
      },
      {
        path: "/meal-details/:id",
        element: (
          <PrivateRoute>
            <MealDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/upcoming-meals",
        element: <UpcomingMeals />,
      },
      {
        path: `/checkout/:planName`,
        element: (
          <PrivateRoute>
            <CheckOut />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "user/login",
    element: <Login />,
  },
  {
    path: "user/singUp",
    element: <SingUP />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      // normal user
      {
        path: "user-profile",
        element: <UserProfile />,
      },
      {
        path: "requested-meals",
        element: <RequestedMeals />,
      },
      {
        path: "user-review",
        element: <UserReviews />,
      },
      {
        path: "user-payment-history",
        element: <PaymentHistory />,
      },
      // admin infor
      {
        path: "admin-profile",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AdminProfile />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-users",

        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUser />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "add-meal",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AddMealForm />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "all-meal-table",
        element: <AllMealTable />,
      },
      {
        path: "all-review",
        element: <AllReview />,
      },
      {
        path: "serve-meals",
        element: <ServeMeal />,
      },
      {
        path: "upcoming-meals",
        element: <UpcammingMeal />,
      },
    ],
  },
]);

export default router;
