import { FaDiamondTurnRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
function PlanCard({ plan }) {
  return (
    <div className="text-gray-950 dark:text-gray-50">
      <div
        className={`card 
          ${
            plan.name === "Silver Plan" ? "bg-gray-300 dark:bg-gray-300/10" : ""
          }
          ${
            plan.name === "Gold Plan"
              ? "bg-yellow-300 dark:bg-yellow-300/10"
              : ""
          }
          ${
            plan.name === "Platinum Plan" ? "bg-sky-300 dark:bg-sky-300/10" : ""
          }
            shadow-lg p-6 rounded-lg`}
      >
        <h3 className="text-2xl font-bold text-center mb-4">{plan.name}</h3>
        <p className="text-xl font-semibold text-center mb-4">
          ${plan.price}/month
        </p>
        <ul className="mb-6 space-y-2">
          {plan.benefits.map((benefit, i) => (
            <li key={i} className="flex items-center gap-2">
              <FaDiamondTurnRight /> {benefit}
            </li>
          ))}
        </ul>
        {/* checkput button */}
        <Link to={`/checkout/${plan.name}`}>
          <button className="btn bg-blue-700 outline-none border-none hover:bg-blue-800 text-white w-full">
            Select {plan.name}
          </button>
        </Link>
      </div>
    </div>
  );
}

export default PlanCard;
