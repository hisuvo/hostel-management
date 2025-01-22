import React, { useEffect, useState } from "react";
import useMeal from "../../../Hooks/useMeal";
import Container from "../../../shared/Container/Container";
import PrimayBtn from "../../../shared/Buttons/PrimayBtn";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const UpcomingMealTable = () => {
  const [meals, refetch] = useMeal();
  const axiosSecure = useAxiosSecure();
  const [sortByLikes, setSortByLikes] = useState(false);

  // filter gatherthan time from current time;
  const filterUpcomingMeals = (meals) => {
    const currentDate = new Date();
    return meals.filter((meal) => new Date(meal.postTime) > currentDate);
  };

  // meal publish button
  // when click on publish button then mealCollection postTime use we curremt time
  const onPublish = async (id) => {
    await axiosSecure
      .patch(`/meal-publish/${id}`)
      .then((res) => {
        Swal.fire("Publish done");
      })
      .catch((error) => {
        console.log("meal publish ---> done", error.message);
      });

    refetch();
  };

  // Toggle sorting by likes
  const handleSortByLikes = () => {
    setSortByLikes(!sortByLikes);
  };

  // Processed meals
  const processedMeals = sortByLikes
    ? filterUpcomingMeals(meals).sort((a, b) => b.likes - a.likes)
    : filterUpcomingMeals(meals).sort((a, b) => a.likes - b.likes);

  return (
    <Container>
      {/* Search Bar */}
      <div className="bg-blue-100 p-4 rounded-md mb-4 ">
        {/* <PrimayBtn title={"Sort By Like"} /> */}
        <PrimayBtn
          onClick={handleSortByLikes}
          title={
            sortByLikes ? "Descending Sorting Likes" : "Ascending Sorting Likes"
          }
        />
      </div>
      <div className="overflow-x-auto w-full">
        <table className="table table-zebra w-full border rounded-lg shadow-lg">
          <thead>
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Likes</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {processedMeals.length > 0 ? (
              processedMeals.map((meal) => (
                <tr key={meal._id} className="hover:bg-blue-100">
                  <td className="py-3 px-4">{meal?.title}</td>
                  <td className="py-3 px-4">{meal?.likes}</td>
                  <td className="py-3 px-4">
                    <PrimayBtn
                      onClick={() => onPublish(`${meal?._id}`)}
                      title={"Publish"}
                    ></PrimayBtn>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="py-4 px-4 text-center text-gray-500 italic"
                >
                  No upcoming meals found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default UpcomingMealTable;
