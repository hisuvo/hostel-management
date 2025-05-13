import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth/AuthProvider/AuthProvider";
const axiosSecure = axios.create({
  // baseURL: "https://hostel-management-server-weld.vercel.app",
  baseURL: "http://localhost:7000/",
});

function useAxiosSecure() {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  // add request intercepter to add authorization
  //  header for every secure call api before load data
  axiosSecure.interceptors.request.use(
    function (config) {
      // get accees token from local store
      const token = localStorage.getItem("access-token");
      // send token into the config headers object
      config.headers.authorization = `Beared ${token}`;
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  return axiosSecure;
}

export default useAxiosSecure;
