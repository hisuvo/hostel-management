import React from "react";

function SectionTitle({ heading }) {
  return (
    <div className="flex flex-col justify-center items-center my-10">
      <h2 className="text-2xl uppercase font-semibold">{heading}</h2>
      <p className="w-12 h-1 mt-2 bg-green-600"></p>
    </div>
  );
}

export default SectionTitle;
