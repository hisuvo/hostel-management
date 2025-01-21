import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useRequest = () => {
  const axiosSecure = useAxiosSecure();
  const { data: requests = [], refetch } = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/meal/request");
      return res.data;
    },
  });
  return [requests, refetch];
};

export default useRequest;
