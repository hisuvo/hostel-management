import { useQuery } from "@tanstack/react-query";
import useAxiosPublice from "./useAxiosPublice";

function useMeal() {
  const axioxPublice = useAxiosPublice();
  const { data: meals = [] } = useQuery({
    queryKey: ["meals"],
    queryFn: async () => {
      const res = await axioxPublice.get("/meals");
      return res.data;
    },
  });
  return [meals];
}

export default useMeal;
