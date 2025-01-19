import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymentHistory = () => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch payment history of the logged-in user (simulate API call)
    const fetchPaymentHistory = async () => {
      setLoading(true);
      try {
        // Simulating a fetch request to an API
        const response = await fetch("/api/payment-history");
        const data = await response.json();

        if (data.length > 0) {
          setPaymentHistory(data);
        } else {
          setPaymentHistory(null);
        }
      } catch (error) {
        console.error("Error fetching payment history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentHistory();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <button className="btn btn-loading">Loading...</button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Payment History</h2>

      {paymentHistory === null ? (
        <div className="alert alert-warning">
          <div>
            <span>No payment history found</span>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full table-zebra">
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.id}</td>
                  <td>{payment.amount}</td>
                  <td>{new Date(payment.date).toLocaleDateString()}</td>
                  <td>
                    <span
                      className={`badge ${
                        payment.status === "Success"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {payment.status}
                    </span>
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
