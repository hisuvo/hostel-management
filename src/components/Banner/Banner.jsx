import React from "react";

function Banner() {
  return (
    <div className="bg-green-50 py-32">
      <div className="max-w-[55rem] mx-auto space-y-4">
        <h2 className="text-4xl text-center font-semibold ">
          "Effortless Meal Management for University Hostels"
        </h2>
        <p className="text-center">
          "Plan, track, and enjoy nutritious meals with ease. Our hostel meal
          management system ensures timely updates, transparent billing, and a
          delightful dining experience for students. Your comfort is our
          priority!"
        </p>
        {/* TODO: here input search bar create Search for hostel menus, meal schedules, or preferences... */}
        <h2 className="text-center">
          <button className="btn">Get Start</button>
        </h2>
      </div>
    </div>
  );
}

export default Banner;
