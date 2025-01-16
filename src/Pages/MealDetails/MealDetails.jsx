import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import useMeal from "../../Hooks/useMeal";
import Container from "../../shared/Container/Container";
import { Rating } from "@smastrom/react-rating";
import { AuthContext } from "../../Auth/AuthProvider/AuthProvider";
import Lodder from "../../components/Lodder/Lodder";
import PrimayBtn from "../../shared/Buttons/PrimayBtn";
import { SlLike } from "react-icons/sl";

function MealDetails() {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [meals] = useMeal();

  if (!user) {
    return <Lodder />;
  }

  const meal = meals.filter((item) => item._id === id)[0];

  return (
    <Container>
      <div>
        <div className="flex gap-4">
          <figure className="w-1/2">
            <img src="" alt={meal?.title} />
          </figure>
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold">{meal?.title}</h3>
            <p className="text-lg">
              <span className="font-semibold">Description</span>:{" "}
              {meal?.description}
            </p>
            <Rating
              style={{ maxWidth: 120 }}
              value={Math.floor(meal?.rating)}
            />
            <p className="text-xl font-semibold">${meal?.price}</p>
            <div className="space-x-2">
              <PrimayBtn title={<SlLike />} />
              <PrimayBtn title={"Mile Request"} />
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
            <button type="submit">
              <PrimayBtn title={"Submit Review"} />
            </button>
          </form>
          {/* TODO: Review text and user name here */}
        </div>
      </div>
    </Container>
  );
}

export default MealDetails;
