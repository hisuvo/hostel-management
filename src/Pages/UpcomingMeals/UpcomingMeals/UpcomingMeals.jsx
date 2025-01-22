import React, { useContext, useEffect, useState } from "react";
import useMeal from "../../../Hooks/useMeal";
import Container from "../../../shared/Container/Container";
import useAxiosPublice from "../../../Hooks/useAxiosPublice";
import SectionTitle from "../../../shared/SectionTitle";
import PrimayBtn from "../../../shared/Buttons/PrimayBtn";
import useUser from "../../../Hooks/useUser";
import { AuthContext } from "../../../Auth/AuthProvider/AuthProvider";
import Swal from "sweetalert2";

const UpcomingMeals = () => {
  const axiosPublice = useAxiosPublice();
  const { user } = useContext(AuthContext);
  const [meals, refetch] = useMeal();
  const [users, react] = useUser();

  // filter gatherthan time from current time;
  const filterUpcomingMeals = (meals) => {
    const currentDate = new Date();
    return meals.filter((meal) => new Date(meal.postTime) > currentDate);
  };

  // current user bage filter;
  const userBadge = users.filter((badge) => badge?.email === user?.email)[0];

  const likeMeal = async (id) => {
    axiosPublice
      .patch(`/meal-like/${id}`)
      .then(() => {
        refetch();
        Swal.fire({
          position: "top-end",
          text: "Thanks for like",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.error(error);
      });
    refetch();
  };

  return (
    <Container>
      <SectionTitle heading={"Upoming Meals"} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {filterUpcomingMeals(meals).map((meal) => (
          <div
            key={meal?._id}
            className="border bg-blue-50 flex justify-start items-center gap-4 rounded-lg p-4 shadow-md"
          >
            <div>
              <figure>
                <img
                  className="w-24 rounded-md object-cover border-2"
                  src={meal?.image}
                  alt=""
                />
              </figure>
            </div>
            <div>
              <h2 className="text-xl font-bold">{meal?.title}</h2>
              <p>{meal?.description.slice(0, 80)}...</p>
              <p className="text-gray-500">
                Publishing on: {new Date(meal?.postTime).toLocaleDateString()}
              </p>
              <p className="text-xs text-blue-500 font-mono ">{meal?.like}</p>
              {userBadge?.badge !== "bronze" ? (
                <PrimayBtn
                  title={"Like"}
                  onClick={() => likeMeal(meal?._id)}
                ></PrimayBtn>
              ) : (
                " "
              )}
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default UpcomingMeals;
