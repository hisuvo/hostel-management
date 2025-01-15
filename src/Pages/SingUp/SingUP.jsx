import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublice from "../../Hooks/useAxiosPublice";
import { AuthContext } from "../../Auth/AuthProvider/AuthProvider";
import Swal from "sweetalert2";

const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`;

export default function SingUP() {
  const [showPassword, setShowPassword] = useState(true);
  const axiosPublic = useAxiosPublice();
  const { createUser, updateUserProfile, googleSign } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };

    // post image and get image url
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    const imgUrl = res.data?.data?.display_url;

    // signUp
    createUser(data.email, data.password)
      .then(() => {
        updateUserProfile(data.name, imgUrl)
          .then(() => {
            navigate("/");
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Created accout successfully",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((error) => {
            console.log("update error -->", error.code);
          });
      })
      .catch((error) => {
        if (error.code) {
          console.log("sing up error --->", error.code);
        }
      });

    const userData = {
      name: data.name,
      image: imgUrl,
      email: data.email,
      password: data.password,
    };
  };

  const handleGoogleSign = () => {
    // googleSignIn
    googleSign()
      .then((result) => {
        Swal.fire("Google Login Done");
        navigate("/");
      })
      .catch((error) => {
        Swal.fire(error.message);
      });
  };

  return (
    <div className="flex justify-center items-center py-2">
      {/* login form */}

      <div className="relative w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            Sign Up to our platform
          </h5>
          {/* user Name */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your Name*
            </label>
            <input
              type="text"
              name="name"
              id="name"
              {...register("name", { required: true })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Type your name here"
            />
            {errors.name?.type === "required" && (
              <p role="alert" className="text-xs text-red-600">
                Name is required
              </p>
            )}
          </div>

          {/* photo */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your Photo*
            </label>
            <input
              type="file"
              name="image"
              id="image"
              {...register("image", { required: true })}
              placeholder="chose file "
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            />
            {errors.image?.type === "required" && (
              <p role="alert" className="text-xs text-red-600">
                Photo is required
              </p>
            )}
          </div>

          {/* email */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your email*
            </label>
            <input
              type="email"
              name="email"
              id="email"
              {...register("email", { required: true })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="name@company.com"
            />
            {errors.email?.type === "required" && (
              <p role="alert" className="text-xs text-red-600">
                Email is required
              </p>
            )}
          </div>

          {/* password */}
          <div>
            <label
              // for="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password*
            </label>
            <input
              type={showPassword ? "password" : "text"}
              name="password"
              id="password"
              {...register("password", { required: true })}
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            />
            {errors.password?.type === "required" && (
              <p role="alert" className="text-xs text-red-600">
                Name is required
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login to your account
          </button>

          <div className="text-sm text-center font-medium text-gray-500 dark:text-gray-300">
            Already have an Acount?{" "}
            <Link
              to={"/user/login"}
              className="text-blue-700 hover:underline dark:text-blue-500"
            >
              SingIn
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
        {/* social login */}
        <button
          onClick={handleGoogleSign}
          type="button"
          className="w-full  text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex justify-center gap-4  items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="25"
            height="25"
            viewBox="0 0 48 48"
          >
            <path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
            <path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            ></path>
            <path
              fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            ></path>
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
          </svg>
          Sign in with google
        </button>
      </div>
    </div>
  );
}
