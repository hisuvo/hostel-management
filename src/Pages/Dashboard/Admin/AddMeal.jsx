import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAxiosPublice from "../../../Hooks/useAxiosPublice";
import { AuthContext } from "../../../Auth/AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import PrimayBtn from "../../../shared/Buttons/PrimayBtn";
import SectionTitle from "../../../shared/SectionTitle";
import DatePicker from "react-datepicker";

const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`;

const AddMealForm = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublice();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  // Admin info
  let adminName = user?.displayName;
  let adminEmail = user?.email;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Upload image to ImageBB
      const formData = new FormData();
      formData.append("image", data.image[0]);

      // sent server add meal info
      const imageResponse = await axiosPublic.post(image_hosting_api, formData);
      const imageUrl = imageResponse.data.data.display_url;

      // Prepare the final data
      const mealData = {
        title: data.title,
        category: data.category,
        image: imageUrl,
        ingredients: data.ingredients.split(","),
        description: data.description,
        price: parseFloat(data.price),
        postTime: selectedDate,
        distributorName: adminName,
        distributorEmail: adminEmail,
        rating: 0,
        likes: 0,
        reviews_count: 0,
      };

      //Submit meal data to the server
      Swal.fire({
        title: "Are sure add meal?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, add it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          //Submit meal data to the server

          await axiosSecure.post("/meals", mealData).then((res) => {
            console.log(res.data);

            Swal.fire({
              title: "Add Successfully",
              icon: "success",
            });

            // navigate to all meals page
            navigate("/meals");
          });
        }
      });
    } catch (error) {
      console.error("Error uploading meal:", error);
      Swal.fire("Failed to upload meal. Please try again.");
    }
  };

  return (
    <div>
      <SectionTitle heading={"Add Meal Details"} />
      <div className="max-w-4xl mx-auto mb-16 bg-blue-50 dark:bg-gray-800 rounded-md">
        <form onSubmit={handleSubmit(onSubmit)} className="p-8">
          {/* Title & Category */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-900 dark:text-gray-50 font-medium mb-1">
                Meal Title
              </label>
              <input
                type="text"
                {...register("title", { required: "Title is required" })}
                className="input bg-gray-50 dark:bg-transparent border border-blue-800 dark:border-gray-300 input-bordered w-full"
                placeholder="Enter meal title"
              />
              {errors.title && (
                <p className="text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-900 dark:text-gray-50 font-medium mb-1">
                Category
              </label>
              <select
                {...register("category", { required: "Category is required" })}
                className="input bg-gray-50 dark:bg-transparent border border-blue-800 dark:border-gray-300 input-bordered w-full"
                defaultValue=""
              >
                <option value="" disabled>
                  Select category
                </option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
              </select>
              {errors.category && (
                <p className="text-red-500">{errors.category.message}</p>
              )}
            </div>
          </div>

          {/* Image & Ingredients */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="mb-4 ">
              <label className="block text-gray-900 dark:text-gray-50 font-medium mb-1">
                Meal Image
              </label>
              <input
                type="file"
                {...register("image", { required: "Image is required" })}
                className="file-input bg-gray-50 dark:bg-transparent border border-blue-800 dark:border-gray-300 file-input-bordered w-full"
              />
              {errors.image && (
                <p className="text-red-500">{errors.image.message}</p>
              )}
            </div>

            <div className="mb-4 ">
              <label className="block text-gray-900 dark:text-gray-50 font-medium mb-1">
                Ingredients
              </label>
              <input
                type="text"
                {...register("ingredients", {
                  required: "Ingredients are required",
                })}
                className="input bg-gray-50 dark:bg-transparent border border-blue-800 dark:border-gray-300 input-bordered w-full"
                placeholder="Comma-separated ingredients"
              />
              {errors.ingredients && (
                <p className="text-red-500">{errors.ingredients.message}</p>
              )}
            </div>
          </div>

          {/* Post Time & Price*/}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="mb-4 flex-grow">
              <label className="block text-gray-900 dark:text-gray-50 font-medium mb-1">
                Post Time
              </label>
              <div className="grid col-span-12">
                <DatePicker
                  selected={selectedDate}
                  showTimeSelect
                  dateFormat="Pp"
                  onChange={(data) => setSelectedDate(data)}
                  className="w-full p-3 bg-gray-50 dark:bg-transparent border border-blue-800 rounded-md focus:ring focus:ring-opacity-75 focus:dark:ring-gray-600 dark:border-gray-300"
                />
              </div>
            </div>

            <div className="mb-4 gap-4">
              <label className="block text-gray-900 dark:text-gray-50 font-medium mb-1">
                Price
              </label>
              <input
                type="number"
                step="0.01"
                {...register("price", { required: "Price is required" })}
                className="input bg-gray-50 dark:bg-transparent border border-blue-800 dark:border-gray-300 input-bordered w-full"
                placeholder="Enter price"
              />
              {errors.price && (
                <p className="text-red-500">{errors.price.message}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mb-4 gap-4">
            <label className="block text-gray-900 dark:text-gray-50 font-medium mb-1">
              Description
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              className="textarea bg-gray-50 dark:bg-transparent border border-blue-800 dark:border-gray-300 textarea-bordered w-full"
              placeholder="Enter meal description"
            ></textarea>
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>

          {/* Distributor Name & Email */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="mb-4 flex-grow">
              <label className="block text-gray-900 dark:text-gray-50 font-medium mb-1">
                Distributor Name
              </label>
              <input
                type="text"
                defaultValue={adminName}
                readOnly
                className="input bg-gray-50 dark:bg-transparent border border-blue-800 dark:border-gray-300 input-bordered w-full "
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-900 dark:text-gray-50 font-medium mb-1">
                Distributor Email
              </label>
              <input
                type="email"
                defaultValue={adminEmail}
                readOnly
                className="input bg-gray-50 dark:bg-transparent border border-blue-800 dark:border-gray-300 input-bordered w-full"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <PrimayBtn title={"Add Meal"} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMealForm;
