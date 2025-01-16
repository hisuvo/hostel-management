import React from "react";
import { Link } from "react-router-dom";
import PrimayBtn from "../../shared/Buttons/PrimayBtn";

const ErrorPage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-red-500">404</h1>
        <p className="text-2xl font-semibold text-gray-700 mt-4">
          Oops! Page not found.
        </p>
        <p className="text-lg text-gray-500 mt-2">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link to="/">
            <PrimayBtn title={"Go Back Home"} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
