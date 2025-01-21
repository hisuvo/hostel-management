import React from "react";
import Banner from "../../../components/Banner/Banner";
import MealsTab from "../MealsTab/MealsTab";
import MembershipCards from "../MembershipCards/MembershipCards";
import CurremtReview from "../../../components/CurremtReview/CurremtReview";

function Home() {
  return (
    <div>
      <Banner />
      <MealsTab />
      <MembershipCards />
      <CurremtReview />
    </div>
  );
}

export default Home;
