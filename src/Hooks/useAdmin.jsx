import { useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useAdmin = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  console.log(user?.email);

  const { data: isAdmin } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/admin/${user?.email}`);
      console.log(res.data);
      return res.data?.admin;
    },
  });
  console.log(isAdmin);
  return [isAdmin];
};

export default useAdmin;
