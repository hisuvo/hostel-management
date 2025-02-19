import React, { useEffect, useState } from "react";
import SectionTitle from "../../../shared/SectionTitle";
import useAxiosPublice from "../../../Hooks/useAxiosPublice";
import PlanCard from "../../../components/PlanCard/PlanCard";
import { useQuery } from "@tanstack/react-query";

function MembershipCards() {
  const axiosPublice = useAxiosPublice();

  // memberShip plans data
  const { data: plans = [] } = useQuery({
    queryKey: ["plans"],
    queryFn: async () => {
      const res = await axiosPublice.get("/plans");
      return res.data;
    },
  });

  return (
    <div>
      {/* all card */}
      <div className="py-10 px-4 bg-blue-100 dark:bg-gray-950/20">
        <SectionTitle heading={"Choose Your Meal Plan"} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans?.map((plan) => (
            <PlanCard key={plan._id} plan={plan} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MembershipCards;
