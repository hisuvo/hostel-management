import React, { useEffect, useState } from "react";
import SectionTitle from "../../../shared/SectionTitle";
import useAxiosPublice from "../../../Hooks/useAxiosPublice";
import PlanCard from "../../../components/PlanCard/PlanCard";

function MembershipCards() {
  const axiosPublice = useAxiosPublice();
  const [plans, setPlans] = useState();

  useEffect(() => {
    axiosPublice.get("/plans").then((res) => {
      setPlans(res.data);
    });
  }, [axiosPublice]);

  return (
    <div>
      {/* all card */}
      <div className="py-10 px-4 bg-gray-100">
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
