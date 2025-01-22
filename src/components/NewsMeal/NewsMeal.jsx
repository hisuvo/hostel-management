import { Link } from "react-router-dom";
import PrimayBtn from "../../shared/Buttons/PrimayBtn";
import Container from "../../shared/Container/Container";

const NewsMeal = () => {
  const today = new Date();

  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const formattedDate = tomorrow.toISOString().split("T")[0];

  return (
    <Container>
      <div className="grid gird-cols-1 md:grid-cols-2 gap-4 my-4 md:my-0">
        <figure>
          <img
            className="w-xs object-cover rounded-xl"
            src="https://media.istockphoto.com/id/2004635695/photo/chef-preparing-food-in-restaurant-kitchen.webp?a=1&b=1&s=612x612&w=0&k=20&c=xzqPwTzk6Wq9Ys_N7AsFnsgnHfrm2f0p79ABEsN2efQ="
            alt=""
          />
        </figure>
        <div className="flex flex-col justify-end gap-4">
          <h2 className="text-2xl font-mono font-semibold">
            What's Cooking Next?
          </h2>
          <h2 className="">
            <span className="text-xl font-semibold">Date: </span>
            {formattedDate}
          </h2>
          <p>
            "Stay ahead with a sneak peek at the meals lined up for the week.
            From hearty breakfasts to satisfying dinners, explore the curated
            menu designed to delight your taste buds. Don’t forget to share your
            thoughts and make your dining experience even more enjoyable!"
          </p>
          <Link to={"/upcoming-meals"}>
            <PrimayBtn title={"Show Upcommitn Meals"} />
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default NewsMeal;
