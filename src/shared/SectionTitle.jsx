import React from "react";

function SectionTitle({ heading }) {
  return (
    <div className="flex flex-col justify-center items-center my-10 text-gray-950 dark:text-gray-50">
      <h2 className="text-2xl uppercase font-semibold">{heading}</h2>
      <p className="w-12 h-1 mt-2 bg-blue-600"></p>
    </div>
  );
}

export default SectionTitle;
