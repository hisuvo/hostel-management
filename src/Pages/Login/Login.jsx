import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../Auth/AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import GoogleLogin from "../../components/SocialLogin/GoogleLogin";

export default function Login() {
  const [showPassword, setShowPassword] = useState(true);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const { logIn } = useContext(AuthContext);
  const location = useLocation();

  const currentLocation = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    logIn(data.email, data.password)
      .then(() => {
        Swal.fire({
          position: "bottom-end",
          icon: "success",
          title: "login success",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(currentLocation);
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
    <div className="max-w-[25rem] mx-auto p-4 my-4 md:my-12 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 ">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">
          Sign in to our platform
        </h5>
        <div>
          <label
            // for="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            {...register("email")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="name@company.com"
            required
          />
        </div>
        <div>
          <label
            // for="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>

          <input
            type={showPassword ? "password" : "text"}
            name="password"
            id="password"
            placeholder="••••••••"
            {...register("password")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login to your account
        </button>

        <div className="text-sm text-center font-medium text-gray-500 dark:text-gray-300">
          Not registered?{" "}
          <Link
            to={"/user/singUp"}
            className="text-blue-700 hover:underline dark:text-blue-500"
          >
            Create account
          </Link>
        </div>
      </form>
      {/* show password btn */}
      <div className="relative">
        <button
          onClick={() => setShowPassword((view) => !view)}
          className="btn btn-xs absolute right-1 -mt-[8.8rem]"
        >
          {showPassword ? <FaEye /> : <FaEyeSlash />}
        </button>
      </div>
      <div className="divider"></div>

      <GoogleLogin />
    </div>
  );
}
