import React from "react";
import SectionTitle from "../../../shared/SectionTitle";
import Container from "../../../shared/Container/Container";

function MembershipCards() {
  const plans = [
    {
      name: "Silver Plan",
      price: "$50/month",
      benefits: [
        "Breakfast only",
        "Basic meal options",
        "Limited menu rotation",
      ],
      color: "bg-gray-200 text-gray-800",
    },
    {
      name: "Gold Plan",
      price: "$100/month",
      benefits: [
        "Breakfast and Lunch",
        "Diverse meal options",
        "Weekly menu updates",
      ],
      color: "bg-yellow-300 text-yellow-900",
    },
    {
      name: "Platinum Plan",
      price: "$150/month",
      benefits: [
        "All meals (Breakfast, Lunch, Dinner)",
        "Premium dining options",
        "Daily chef specials",
      ],
      color: "bg-blue-400 text-white",
    },
  ];

  return (
    <div>
      {/* all card */}
      <div className="py-10 px-4 bg-gray-100">
        <SectionTitle heading={"Choose Your Meal Plan"} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`card ${plan.color} shadow-lg p-6 rounded-lg`}
            >
              <h3 className="text-2xl font-bold text-center mb-4">
                {plan.name}
              </h3>
              <p className="text-xl font-semibold text-center mb-4">
                {plan.price}
              </p>
              <ul className="mb-6 space-y-2">
                {plan.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-green-500">✔</span> {benefit}
                  </li>
                ))}
              </ul>
              <button className="btn btn-primary w-full">
                Select {plan.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MembershipCards;
