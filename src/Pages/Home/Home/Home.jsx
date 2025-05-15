import React from "react";
import Banner from "../../../components/Banner/Banner";
import MealsTab from "../MealsTab/MealsTab";
import MembershipCards from "../MembershipCards/MembershipCards";
import CurremtReview from "../../../components/CurremtReview/CurremtReview";
import NewsMeal from "../../../components/NewsMeal/NewsMeal";
import Newsletter from "../../../components/NewsLetter/NewsLetter";
import UpcomingMeals from "../../UpcomingMeals/UpcomingMeals/UpcomingMeals";
import Accordion from "../../../components/Accordion/Accordion";

function Home() {
  return (
    <div>
      <Banner />
      <NewsMeal />
      <MealsTab />
      <CurremtReview />
      <MembershipCards />
      <UpcomingMeals />
      <Newsletter />
      <Accordion />
    </div>
  );
}

export default Home;
