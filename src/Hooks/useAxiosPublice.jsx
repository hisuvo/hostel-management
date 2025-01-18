import axios from "axios";
const axiosPublice = axios.create({
  baseURL: "https://hotsel-management-server.vercel.app",
});

function useAxiosPublice() {
  return axiosPublice;
}

export default useAxiosPublice;
