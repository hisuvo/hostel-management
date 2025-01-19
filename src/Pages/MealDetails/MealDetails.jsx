import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import useMeal from "../../Hooks/useMeal";
import Container from "../../shared/Container/Container";
import { Rating } from "@smastrom/react-rating";
import { AuthContext } from "../../Auth/AuthProvider/AuthProvider";
import PrimayBtn from "../../shared/Buttons/PrimayBtn";
import { SlLike } from "react-icons/sl";
import useUser from "../../Hooks/useUser";
import useAxiosPublice from "../../Hooks/useAxiosPublice";
import Swal from "sweetalert2";

function MealDetails() {
  const [error, setError] = useState(" ");
  const { user } = useContext(AuthContext);
  const axiosPublive = useAxiosPublice();
  const { id } = useParams();
  const [meals] = useMeal();
  const [users] = useUser();

  // fiter current meal
  const meal = meals.filter((item) => item._id === id)[0];

  // fiter current user
  const userBadge = users.filter((badge) => badge?.email === user?.email)[0];

  // send like in server
  const handleLike = () => {
    console.log("hanlde like of meal");
  };

  // meal request info send in database
  const handleRequest = () => {
    // check user package subscription
    if (userBadge.badge === "bronze") {
      setError({ badge: "requires a package subscriptio" });
    } else {
      const requestMeal = {
        mealId: meal?._id,
        requestUser: user?.email,
        status: "pending",
      };

      // send requested meal in database request collection
      axiosPublive
        .post("/meal/request", requestMeal)
        .then((res) => {
          // console.log("request meal conform data status --->", res.data);
          if (res.data.acknowledged) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your meal request done!",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((error) => Swal.filre(error.message));
    }
  };

  return (
    <Container>
      <div className="grid grid-cols-12 gap-4 p-8 bg-blue-50">
        <figure className="col-span-full md:col-span-5 lg:col-span-4 flex justify-center items-center gap-4">
          <img className="w-full" src={meal?.image} alt={meal?.title} />
        </figure>
        <div className="col-span-full md:col-span-7 lg:col-span-8 space-y-2">
          {/* meal title */}
          <h3 className="text-2xl font-semibold">{meal?.title}</h3>

          {/* meal description */}
          <p className="text-base">
            <span className="font-semibold text-lg">Description</span>:{" "}
            {meal?.description}
          </p>

          {/* meal ingredinets */}
          <p className="text-base">
            <span className="font-semibold text-lg">Ingredients</span>:{" "}
            {meal?.ingredients}
          </p>

          {/* meal post time */}
          <p className="text-base">
            <span className="font-semibold text-lg">Post Time</span>:{" "}
            {new Date(meal?.postTime).toLocaleString()}
          </p>

          {/* meal destributor name */}
          <p className="text-base">
            Distributor is{" "}
            <span className="font-semibold text-lg">
              {meal?.distributorName}
            </span>{" "}
          </p>

          {/* meal reating */}
          <Rating style={{ maxWidth: 120 }} value={Math.floor(meal?.rating)} />

          {/* meal price  */}
          <p className="text-xl font-semibold">
            {" "}
            <span className="font-semibold">Price:</span> ${meal?.price}
          </p>

          <p className="text-red-500">{error.badge}</p>
          <div className="space-x-2">
            <PrimayBtn onClick={handleLike} title={<SlLike />} />
            <PrimayBtn title={"Meal Request"} onClick={handleRequest} />
          </div>
        </div>
      </div>

      {/* meal review */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Reviews</h2>
        <form action="" className="mt-4">
          <textarea
            name=""
            placeholder="Write your review here...."
            className="rounded w-full p-2 border"
            rows={"3"}
          ></textarea>
          <PrimayBtn title={"Submit Review"} />
        </form>
        {/* TODO: Review text and user name here */}
      </div>
    </Container>
  );
}

export default MealDetails;
