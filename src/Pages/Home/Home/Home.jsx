import React from "react";
import Banner from "../../../components/Banner/Banner";
import MealsTab from "../MealsTab/MealsTab";
import MembershipCards from "../MembershipCards/MembershipCards";
import CurremtReview from "../../../components/CurremtReview/CurremtReview";
import NewsMeal from "../../../components/NewsMeal/NewsMeal";

function Home() {
  return (
    <div>
      <Banner />
      <NewsMeal />
      <MealsTab />
      <MembershipCards />
      <CurremtReview />
    </div>
  );
}

export default Home;
