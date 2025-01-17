import { useContext } from "react";
import { AuthContext } from "../../Auth/AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import useAxiosPublice from "../../Hooks/useAxiosPublice";

function GoogleLogin() {
  const { googleSign } = useContext(AuthContext);
  const axiosPublic = useAxiosPublice();
  const location = useLocation();
  const navigate = useNavigate();
  const currentLocation = location.state?.from?.pathname || "/";

  const handleGoogleSign = () => {
    googleSign()
      .then((res) => {
        const userInfo = {
          name: res.user?.displayName,
          email: res.user?.email,
          img: res.user?.photoURL,
          badge: "bronze",
        };

        axiosPublic.post("/users", userInfo).then(() => {
          //   console.log("social info send in server--->", res.data);
          //   Swal.fire(`${res.data?.message}`);
          navigate(currentLocation);
        });
      })
      .catch((error) => {
        Swal.fire(error.message);
      });
  };
  return (
    <div>
      <button
        onClick={handleGoogleSign}
        type="button"
        className="w-full  text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex justify-center gap-2  items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2"
      >
        <FcGoogle className="text-xl" />
        Sign in with google
      </button>
    </div>
  );
}

export default GoogleLogin;
