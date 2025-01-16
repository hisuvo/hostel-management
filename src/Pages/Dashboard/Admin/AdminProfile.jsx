import React, { useContext } from "react";
import { AuthContext } from "../../../Auth/AuthProvider/AuthProvider";

export default function AdminProfile() {
  const { user } = useContext(AuthContext);
  const admin = {
    name: user?.displayName,
    image: user?.photoURL, // Replace with actual image URL
    email: user?.email,
    mealsAdded: 10,
  };

  return (
    <div className="max-w-2xl mx-auto mt-6 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex items-center px-6 py-3 bg-blue-900">
        <svg
          className="h-6 w-6 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 12c2.28 0 4-1.72 4-4s-1.72-4-4-4-4 1.72-4 4 1.72 4 4 4zm-8 8a4 4 0 01-4-4v-1a4 4 0 018 0v1a4 4 0 01-4 4zm9-4a4 4 0 014-4h1a4 4 0 010 8h-1a4 4 0 01-4-4z"
          />
        </svg>
        <h1 className="mx-3 text-white font-semibold text-lg">Admin Profile</h1>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center px-6 py-4">
          <img
            className="h-16 w-16 rounded-full object-cover border-2 border-green-900"
            src={admin.image}
            alt={admin.name}
          />
          <div className="mx-4">
            <h2 className="text-gray-800 font-semibold text-xl">
              {admin.name}
            </h2>
            <p className="text-gray-600">{admin.email}</p>
          </div>
        </div>
        <div className="px-6 py-4">
          <h3 className="text-gray-800 font-semibold text-lg mb-2">Stats</h3>
          <p className="text-gray-600">
            <span className="font-bold">{admin.mealsAdded}</span> meals added
          </p>
        </div>
      </div>
    </div>
  );
}
