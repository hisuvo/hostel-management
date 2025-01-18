import { useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useAdmin = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: isAdmin, isPending: adminLoading } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/admin/${user.email}`);
      return res.data?.admin;
    },
  });

  return [isAdmin, adminLoading];
};

export default useAdmin;

const x = {
  _id: "6789c139a438e4f4a3e7501a",
  name: "suvo datta",
  email: "dattasuvo7@gmail.com",
  img: "https://lh3.googleusercontent.com/a/ACg8ocKuAxKtK-_zVuAd-SePGpydIGmqg9…",
  badge: "bronze",
};
