import { Link } from "react-router-dom";
import useReview from "../../../Hooks/useReview";
import PrimayBtn from "../../../shared/Buttons/PrimayBtn";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AllReview = () => {
  const [reviews, refetch] = useReview();
  const axiosSecure = useAxiosSecure();

  const hanldeDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete review",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/admin-delete-review/${id}`).then((res) => {
          if (res.data.acknowledged) {
            Swal.fire({
              text: "Your review has been deleted.",
              icon: "success",
            });
          }
          refetch();
        });
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Review</h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* Table Header */}
          <thead>
            <tr>
              <th></th>
              <th>Meal Title</th>
              <th>Likes</th>
              <th>Reviews Count</th>
              <th>Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {reviews.map((review, index) => (
              <tr key={review._id}>
                <td>{++index}</td>
                <td>{review?.title}</td>
                <td>{review?.likes}</td>
                <td>{review?.reviews_count}</td>

                <td className="flex gap-2">
                  <Link to={`/meal-details/${review?.mealId}`}>
                    <PrimayBtn title={"view meal"} />
                  </Link>
                  {/* delete review button  */}
                  <PrimayBtn
                    onClick={() => hanldeDelete(review._id)}
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

export default AllReview;
