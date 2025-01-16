import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAxiosPublice from "../../../Hooks/useAxiosPublice";
import { AuthContext } from "../../../Auth/AuthProvider/AuthProvider";
import Swal from "sweetalert2";

const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`;

const AddMealForm = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublice();
  const { user } = useContext(AuthContext);

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
        postTime: new Date(data.postTime).toISOString(),
        distributorName: adminName,
        distributorEmail: adminEmail,
        rating: 0,
        likes: 0,
        reviews_count: 0,
      };

      console.log("add meal data form addmealForm --->", mealData);

      //TODO: Submit meal data to your server
      //   await axios.post("/api/meals", mealData);

      Swal.fire({
        icon: "success",
        title: "Meal added successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/meals");
    } catch (error) {
      console.error("Error uploading meal:", error);
      Swal.fire("Failed to upload meal. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-md">
      <h2 className="text-xl font-bold mb-4 text-center">Add Meal Details</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Title & Category */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block font-medium mb-1">Meal Title</label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className="input input-bordered w-full"
              placeholder="Enter meal title"
            />
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Category</label>
            <select
              {...register("category", { required: "Category is required" })}
              className="input input-bordered w-full"
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
            <label className="block font-medium mb-1">Meal Image</label>
            <input
              type="file"
              {...register("image", { required: "Image is required" })}
              className="file-input file-input-bordered w-full"
            />
            {errors.image && (
              <p className="text-red-500">{errors.image.message}</p>
            )}
          </div>

          <div className="mb-4 ">
            <label className="block font-medium mb-1">Ingredients</label>
            <input
              type="text"
              {...register("ingredients", {
                required: "Ingredients are required",
              })}
              className="input input-bordered w-full"
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
            <label className="block font-medium mb-1">Post Time</label>
            <input
              type="datetime-local"
              {...register("postTime", { required: "Post time is required" })}
              className="input input-bordered w-full"
            />
            {errors.postTime && (
              <p className="text-red-500">{errors.postTime.message}</p>
            )}
          </div>

          <div className="mb-4 gap-4">
            <label className="block font-medium mb-1">Price</label>
            <input
              type="number"
              step="0.01"
              {...register("price", { required: "Price is required" })}
              className="input input-bordered w-full"
              placeholder="Enter price"
            />
            {errors.price && (
              <p className="text-red-500">{errors.price.message}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="mb-4 gap-4">
          <label className="block font-medium mb-1">Description</label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="textarea textarea-bordered w-full"
            placeholder="Enter meal description"
          ></textarea>
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>

        {/* Distributor Name & Email */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="mb-4 flex-grow">
            <label className="block font-medium mb-1">Distributor Name</label>
            <input
              type="text"
              defaultValue={adminName}
              readOnly
              className="input input-bordered w-full bg-gray-200"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Distributor Email</label>
            <input
              type="email"
              defaultValue={adminEmail}
              readOnly
              className="input input-bordered w-full bg-gray-200"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Add Meal
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMealForm;
