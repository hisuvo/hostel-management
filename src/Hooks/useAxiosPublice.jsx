import axios from "axios";
const axiosPublice = axios.create({
  baseURL: "https://hostel-management-server-weld.vercel.app",
  // baseURL: "http://localhost:7000",
});

function useAxiosPublice() {
  return axiosPublice;
}

export default useAxiosPublice;
