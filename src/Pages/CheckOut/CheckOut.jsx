import React from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import useAxiosPublice from "../../Hooks/useAxiosPublice";
import { useQuery } from "@tanstack/react-query";
import Lodder from "../../components/Lodder/Lodder";
import PaymentCard from "../../components/PaymentCard/PaymentCard";

function CheckOut() {
  const { planName } = useParams();
  const axiosPublice = useAxiosPublice();
  const navigate = useNavigate();

  //  plans data
  const { data: plans = [], isLoading } = useQuery({
    queryKey: ["plansName"],
    queryFn: async () => {
      const res = await axiosPublice.get(`/plans/${planName}`);
      return res.data;
    },
  });

  if (isLoading) return <Lodder />;

  const plan = plans[0];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-900 to-indigo-300 p-6 text-white">
          <h1 className="text-3xl font-bold">{plan.name}</h1>
          <p className="text-lg mt-2">
            Price: <span className="font-semibold">${plan.price}</span>
          </p>
        </div>
        <div className="p-6">
          <div className="grid md:grid-cols-2 md:gap-4">
            {/* plans details */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Package Benefits
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                {plan.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>

            {/* payment */}
            <div className="">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Check Out here
              </h2>
              <PaymentCard price={plan.price} planName={plan.name} />
            </div>
          </div>
          <div className="mt-6 flex justify-start">
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
