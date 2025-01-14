import React from "react";
import Banner from "../../../components/Banner/Banner";
import MealsTab from "../MealsTab/MealsTab";
import MembershipCards from "../MembershipCards/MembershipCards";

function Home() {
  return (
    <div>
      <Banner />
      <MealsTab />
      <MembershipCards />
    </div>
  );
}

export default Home;
