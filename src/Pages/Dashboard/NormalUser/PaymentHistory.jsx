import { useContext } from "react";
import useAxiosPublice from "../../../Hooks/useAxiosPublice";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../Auth/AuthProvider/AuthProvider";
import SectionTitle from "../../../shared/SectionTitle";

const PaymentHistory = () => {
  const axiosPublice = useAxiosPublice();
  const { user } = useContext(AuthContext);

  // user payment histroy get from server
  const { data: paymentHistory = [], isLoading } = useQuery({
    queryKey: ["payment-history"],
    queryFn: async () => {
      const res = await axiosPublice.get(`/payment-hostory/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <button className="btn btn-loading">Loading...</button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <SectionTitle heading={"Payment History"} />

      {paymentHistory.length === 0 ? (
        <div className="alert alert-warning">
          <div>
            <span>No payment history found</span>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="text-gray-900 text-xl dark:text-gray-50">
              <tr>
                <th>Payment ID</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-900 dark:text-gray-50">
              {paymentHistory.map((payment) => (
                <tr key={payment._id}>
                  <td>{payment.transctionId}</td>
                  <td>{payment.amount / 1000}</td>
                  <td>{new Date(payment?.date).toLocaleDateString()}</td>
                  <td>
                    <span className={`badge`}>{payment?.planName}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
