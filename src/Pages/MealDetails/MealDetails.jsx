import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import useMeal from "../../Hooks/useMeal";
import Container from "../../shared/Container/Container";
import { Rating } from "@smastrom/react-rating";
import { AuthContext } from "../../Auth/AuthProvider/AuthProvider";
import Lodder from "../../components/Lodder/Lodder";

function MealDetails() {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [meals] = useMeal();

  if (!user) {
    return <Lodder />;
  }

  const meal = meals.filter((item) => item._id === id)[0];
  const { title, rating, image, price, description, ingredients } = meal;

  if (!meal) return <div>Loading...</div>;

  return (
    <Container>
      <div>
        <div className="flex gap-4">
          <figure className="w-1/2">
            <img src="" alt={title} />
          </figure>
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold">{title}</h3>
            <p className="text-lg">
              <span className="font-semibold">Description</span>: {description}
            </p>
            <Rating style={{ maxWidth: 120 }} value={Math.floor(rating)} />
            <p className="text-xl font-semibold">${price}</p>
            <div className="space-x-2">
              <button className="btn">Like</button>
              <button className="btn">Mile Request</button>
            </div>
          </div>
        </div>

        {/* review */}
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Reviews</h2>
          <form action="" className="mt-4">
            <textarea
              name=""
              placeholder="Write your review here...."
              className="rounded w-full p-2 border"
              rows={"3"}
            ></textarea>
            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Submit Review
            </button>
          </form>
          {/* TODO: Review text and user name here */}
        </div>
      </div>
    </Container>
  );
}

export default MealDetails;
