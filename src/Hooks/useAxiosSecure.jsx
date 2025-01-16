import axios from "axios";
const axiosSecure = axios.create({
  baseURL: "http://localhost:7000",
});
function useAxiosSecure() {
  return axiosSecure;
}

export default useAxiosSecure;
