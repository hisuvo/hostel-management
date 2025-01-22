import { useForm } from "react-hook-form";
import SectionTitle from "../../../shared/SectionTitle";
import DatePicker from "react-datepicker";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Auth/AuthProvider/AuthProvider";
import PrimayBtn from "../../../shared/Buttons/PrimayBtn";
import useAxiosPublice from "../../../Hooks/useAxiosPublice";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`;

const UpdateMeal = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublice();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();

  const { register, handleSubmit } = useForm();

  let adminName = user?.displayName;
  let adminEmail = user?.email;

  // get specifice data from server
  const { data: meal, refetch } = useQuery({
    queryKey: ["meal-update"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/meals/${id}`);
      return res.data;
    },
  });

  const onSubmit = async (data) => {
    // Upload image to ImageBB
    const imageFile = { image: data.image[0] };

    // sent server add meal info
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      const mealData = {
        title: data.title,
        category: data.category,
        image: res.data.data?.display_url,
        ingredients: data.ingredients.split(","),
        description: data.description,
        price: parseFloat(data.price),
        postTime: selectedDate,
      };

      //  post mealItem in server
      await axiosSecure.patch(`/meals/${id}`, mealData).then((res) => {
        if (res.data.acknowledged) {
          // show a success popup
          Swal.fire({
            title: "Recipe menu updated successfull",
            icon: "success",
          });
        }
      });
    }
  };

  return (
    <div>
      <SectionTitle heading={"Add Meal Details"} />
      <div className="max-w-2xl mx-auto mb-16 bg-white border-2 border-blue-400 rounded-md">
        <form onSubmit={handleSubmit(onSubmit)} className="p-8">
          {/* Title & Category */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block font-medium mb-1">Meal Title</label>
              <input
                type="text"
                defaultValue={meal?.title}
                {...register("title")}
                className="input input-bordered w-full"
                placeholder="Enter meal title"
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-1">Category</label>

              {meal?.category && (
                <select
                  {...register("category")}
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
                {...register("ingredients")}
                className="input input-bordered w-full"
                placeholder="Comma-separated ingredients"
                defaultValue={meal?.ingredients.map((item) => item)}
              />
            </div>
          </div>

          {/* Post Time & Price*/}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="mb-4 flex-grow">
              <label className="block font-medium mb-1">Post Time</label>
              <div className="grid col-span-12">
                <DatePicker
                  selected={selectedDate}
                  showTimeSelect
                  dateFormat="Pp"
                  onChange={(data) => setSelectedDate(data)}
                  className="w-full p-4 border rounded-md focus:ring focus:ring-opacity-75 focus:dark:ring-gray-600 dark:border-gray-300"
                />
              </div>
            </div>

            <div className="mb-4 gap-4">
              <label className="block font-medium mb-1">Price</label>
              <input
                type="number"
                step="0.01"
                {...register("price")}
                className="input input-bordered w-full"
                placeholder="Enter price"
                defaultValue={meal?.price}
              />
            </div>
          </div>

          {/* Description */}
          <div className="mb-4 gap-4">
            <label className="block font-medium mb-1">Description</label>
            <textarea
              {...register("description")}
              className="textarea textarea-bordered w-full"
              placeholder="Enter meal description"
              defaultValue={meal?.description}
            ></textarea>
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
  );
};

export default UpdateMeal;
