import React from "react";
import Banner from "../../../components/Banner/Banner";
import MealsTab from "../MealsTab/MealsTab";
import MembershipCards from "../MembershipCards/MembershipCards";
import CurremtReview from "../../../components/CurremtReview/CurremtReview";
import NewsMeal from "../../../components/NewsMeal/NewsMeal";
// import Newsletter from "../../../components/NewsLetter/NewsLetter";
import UpcomingMeals from "../../UpcomingMeals/UpcomingMeals/UpcomingMeals";

function Home() {
  return (
    <div>
      <Banner />
      <NewsMeal />
      <MealsTab />
      <MembershipCards />
      <CurremtReview />
      <UpcomingMeals />
      {/* <Newsletter /> */}
    </div>
  );
}

export default Home;
