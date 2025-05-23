import React, { useContext } from "react";
import PrimayBtn from "../../../shared/Buttons/PrimayBtn";
import useReview from "../../../Hooks/useReview";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import EditReview from "../../../components/EditReview/EditReview";
import SectionTitle from "../../../shared/SectionTitle";

const UserReviews = () => {
  const axiosSecure = useAxiosSecure();
  const [reviews, refetch] = useReview();

  const handleDelete = async (id) => {
    await axiosSecure.delete(`/review-delete/${id}`).then((res) => {
      if (res.data.acknowledged) {
        refetch();
        Swal.fire("Review delete successfull!");
      }
    });
  };

  return (
    <div className="p-6">
      <SectionTitle heading={"My Reviews"} />
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* Table Header */}
          <thead className="text-gray-900 dark:text-gray-50">
            <tr>
              <th></th>
              <th>Meal Title</th>
              <th>Likes</th>
              <th>Reviews</th>
              <th>Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="text-gray-900 dark:text-gray-50">
            {/* Example Row 3 */}
            {reviews.map((review, index) => (
              <tr key={review._id}>
                <td>{++index}</td>
                <td>{review?.title}</td>
                <td>{review.likes}</td>
                <td>{review.review.slice(0, 20)}...</td>
                <td className="flex gap-2">
                  {/* view meals */}
                  <Link to={`/meal-details/${review?.mealId}`}>
                    <PrimayBtn title={"view"} />
                  </Link>

                  {/* TODO: parse here updat info  */}
                  {/* <PrimayBtn title={"Edit"} /> */}
                  <EditReview review={review} refetch={refetch} />
                  {/* delete review button */}
                  <PrimayBtn
                    onClick={() => handleDelete(review?._id)}
                    title={"Delete"}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserReviews;
