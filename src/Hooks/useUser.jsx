import useAxiosPublice from "./useAxiosPublice";
import { useQuery } from "@tanstack/react-query";

export default function useUser() {
  const axioxPublice = useAxiosPublice();
  const { data: users = [] } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axioxPublice.get("/users");
      return res.data;
    },
  });
  return [users];
}
