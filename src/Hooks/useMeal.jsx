import { useQuery } from "@tanstack/react-query";
import useAxiosPublice from "./useAxiosPublice";

function useMeal() {
  const axioxPublice = useAxiosPublice();
  const { data: meals = [], refetch } = useQuery({
    queryKey: ["meals"],
    queryFn: async () => {
      const res = await axioxPublice.get("/meals");
      return res.data;
    },
  });
  return [meals, refetch];
}

export default useMeal;
