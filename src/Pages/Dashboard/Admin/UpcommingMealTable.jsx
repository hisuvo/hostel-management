import React, { useEffect, useState } from "react";
import useMeal from "../../../Hooks/useMeal";
import Container from "../../../shared/Container/Container";
import PrimayBtn from "../../../shared/Buttons/PrimayBtn";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../shared/SectionTitle";

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
      <SectionTitle heading={"All Upcomming Meals"} />
      {/* Search Bar */}
      <div className="p-6 bg-blue-50 dark:bg-gray-800 rounded-md mb-4 ">
        {/* <PrimayBtn title={"Sort By Like"} /> */}
        <PrimayBtn
          onClick={handleSortByLikes}
          title={
            sortByLikes ? "Descending Sorting Likes" : "Ascending Sorting Likes"
          }
        />
      </div>
      <div className="overflow-x-auto w-full">
        <table className="table w-full border rounded-lg shadow-lg">
          <thead className="text-gray-900 text-xl dark:text-gray-50">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Likes</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-900 dark:text-gray-50">
            {processedMeals.length > 0 ? (
              processedMeals.map((meal) => (
                <tr key={meal._id} className="hover:bg-blue-100">
                  <td className="py-3 px-4">{meal?.title}</td>
                  <td className="py-3 px-4">{meal?.likes}</td>
                  <td className="py-3 px-4">
                    {meal?.likes > 9 ? (
                      <PrimayBtn
                        onClick={() => onPublish(`${meal?._id}`)}
                        title={"Publish"}
                      ></PrimayBtn>
                    ) : (
                      <button className="btn border border-blue-300">
                        Publish
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="py-4 px-4 text-2xl text-center text-gray-950 dark:text-gray-50 italic"
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
