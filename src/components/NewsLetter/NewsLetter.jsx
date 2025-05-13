import React from "react";
import PrimayBtn from "../../shared/Buttons/PrimayBtn";

const Newsletter = () => {
  return (
    <div className="bg-gray-200 dark:bg-gray-800 py-16 px-4 text-center transition-colors duration-300">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 uppercase mb-2">
        Newsletter
      </h3>
      <div className="w-16 h-1 bg-blue-600 mx-auto mb-6 rounded"></div>

      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Join Our Hostel Community
      </h2>

      <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8">
        Stay informed about our hostel’s food services, weekly menus, meal
        schedules, and special updates. Get tips on nutrition, hygiene, and how
        we reduce food waste. Your feedback matters—help us improve your dining
        experience!
      </p>

      <div className="flex justify-center items-center gap-2 max-w-md mx-auto">
        <input
          type="email"
          placeholder="Enter your email"
          className="input input-bordered w-full dark:input-bordered dark:bg-gray-900 dark:text-white"
        />
        <PrimayBtn title={"Subscribe"} />
      </div>
    </div>
  );
};

export default Newsletter;
