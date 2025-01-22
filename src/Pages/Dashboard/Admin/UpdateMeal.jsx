import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import SectionTitle from "../../../shared/SectionTitle";
import useAxiosPublice from "../../../Hooks/useAxiosPublice";
import { AuthContext } from "../../../Auth/AuthProvider/AuthProvider";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import PrimayBtn from "../../../shared/Buttons/PrimayBtn";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";

const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`;

const UpdateMeal = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublice();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  console.log("first ---", id);

  // Admin info
  let adminName = user?.displayName;
  let adminEmail = user?.email;

  // specifice meal find for server
  const { data: meal } = useQuery({
    queryKey: ["update-meal"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/meal/${id}`);
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // udpage submit form
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
    <>
      <SectionTitle heading={"Update Meals"} />
      <div className="bg-blue-50 md:mx-8 md:py-16">
        <div className="max-w-2xl mx-auto  border-2 border-blue-400 rounded-md">
          <form onSubmit={handleSubmit(onSubmit)} className="p-8">
            {/* Title & Category */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block font-medium mb-1">Meal Title</label>
                <input
                  type="text"
                  defaultValue={meal?.title}
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
                {meal?.category && (
                  <select
                    {...register("category", {
                      required: "Category is required",
                    })}
                    className="input input-bordered w-full"
                    defaultValue={meal?.category}
                  >
                    <option value="" disabled>
                      Select category
                    </option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                  </select>
                )}

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
                  {...register("image")}
                  className="file-input file-input-bordered w-full"
                />
              </div>

              <div className="mb-4 ">
                <label className="block font-medium mb-1">Ingredients</label>
                <input
                  type="text"
                  defaultValue={meal?.ingredients}
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
                  defaultValue={meal?.postTime}
                  {...register("postTime", {
                    required: "Post time is required",
                  })}
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
                  defaultValue={meal?.price}
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
                defaultValue={new Date(meal?.description).toLocaleDateString()}
              ></textarea>
              {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
            </div>

            {/* Distributor Name & Email */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="mb-4 flex-grow">
                <label className="block font-medium mb-1">
                  Distributor Name
                </label>
                <input
                  type="text"
                  defaultValue={adminName}
                  readOnly
                  className="input input-bordered w-full bg-gray-200"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-1">
                  Distributor Email
                </label>
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
              <PrimayBtn title={"Add Meal"} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateMeal;
