import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home/Home";
import Meals from "../Pages/Meals/Meals/Meals";
import UpcomingMeals from "../Pages/UpcomingMeals/UpcomingMeals/UpcomingMeals";
import Login from "../Pages/Login/Login";
import SingUP from "../Pages/SingUp/SingUP";
import MealDetails from "../Pages/MealDetails/MealDetails";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
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
]);

export default router;
