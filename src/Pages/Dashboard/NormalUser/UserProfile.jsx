import { useContext } from "react";
import { AuthContext } from "../../../Auth/AuthProvider/AuthProvider";
import useAxiosPublice from "../../../Hooks/useAxiosPublice";
import { useQuery } from "@tanstack/react-query";
import { GiPoliceBadge } from "react-icons/gi";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const axiosPublice = useAxiosPublice();

  const { data: userBadge = [] } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const res = await axiosPublice.get(`/general/users/${user.email}`);
      return res.data[0];
    },
    enabled: true,
  });

  console.log(userBadge);

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
        <h1 className="mx-3 text-white font-semibold text-lg">User Profile</h1>
      </div>
      <div className="flex flex-col-reverse md:flex-row md:justify-between items-center">
        <div className="flex items-center px-6 py-4">
          <img
            className="h-32 w-32 rounded-full object-cover border-2 border-blue-900"
            src={user?.photoURL}
            alt={user?.displayName}
          />
          <div className="mx-4">
            <h2 className="text-gray-800 font-semibold text-xl">
              {user?.displayName}
            </h2>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>
        <div className="px-6 py-4">
          <h3 className="text-gray-800 font-semibold text-lg mb-2">
            Badge Stats
          </h3>
          <p className="text-gray-600 text-8xl">
            {userBadge?.badge === "Silver Plan" && (
              <h2 title={`${userBadge?.badge}`} className="text-slate-300">
                <GiPoliceBadge />
              </h2>
            )}
            {userBadge?.badge === "Gold Plan" && (
              <h2 title={`${userBadge?.badge}`} className="text-yellow-500">
                <GiPoliceBadge />
              </h2>
            )}
            {userBadge?.badge === "Platinum Plan" && (
              <h2 title={`${userBadge?.badge}`} className="text-blue-900">
                <GiPoliceBadge />
              </h2>
            )}
            {userBadge?.badge === "bronze" && (
              <h2 title={`${userBadge?.badge}`}>
                <GiPoliceBadge />
              </h2>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
