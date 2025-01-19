import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublice from "../../Hooks/useAxiosPublice";
import { AuthContext } from "../../Auth/AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import GoogleLogin from "../../components/SocialLogin/GoogleLogin";

const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`;

export default function SingUP() {
  const [showPassword, setShowPassword] = useState(true);
  const axiosPublic = useAxiosPublice();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const imageFile = { image: data.image[0] };

      // Post image and get the image URL
      const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      const imgUrl = res.data?.data?.display_url;

      const userData = {
        name: data.name,
        email: data.email,
        img: imgUrl,
        badge: "bronze",
      };

      // Create user
      await createUser(data.email, data.password);
      console.log("create User --");

      // Update user profile
      await updateUserProfile(data.name, imgUrl);

      console.log("update user --");

      // Collect user data in DB
      await axiosPublic.post("/users", userData);
      console.log("posrt user info in db");

      // Show success message
      Swal.fire({
        position: "bottom-end",
        icon: "success",
        title: "Sign-up successful!",
        showConfirmButton: false,
        timer: 1500,
      });

      // Navigate to another page after success
      navigate("/");
    } catch (error) {
      // Handle errors and show error messages
      Swal.fire({
        position: "bottom-end",
        icon: "error",
        title: error.message || "Sign-up failed!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
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
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 20,
                pattern:
                  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
              })}
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            />
            {errors.password?.type === "required" && (
              <span className="text-red-500">Password field is required</span>
            )}
            {errors.password?.type === "minLength" && (
              <span className="text-red-500">Password must be 6 character</span>
            )}
            {errors.password?.type === "maxLength" && (
              <span className="text-red-500">
                Password must be less than 10 character
              </span>
            )}
            {errors.password?.type === "pattern" && (
              <span className="text-red-500">
                Password must be on uppercase one lowercase and one special
                character
              </span>
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
              to={"/login"}
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
        <GoogleLogin />
      </div>
    </div>
  );
}
