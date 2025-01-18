import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Auth/AuthProvider/AuthProvider";
import Swal from "sweetalert2";

const CheckOutForm = ({ price, planName }) => {
  const [error, setError] = useState(" ");
  const [clientSecret, setClientSecret] = useState("");
  const [transctionId, setTransctionId] = useState("");
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();

  const amount = parseInt(price);

  useEffect(() => {
    axiosSecure
      .post(`/create-payment-intent`, { price: amount })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      })
      .catch((error) => {
        console.log("check out error --->", error);
      });
  }, [axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    }

    if (paymentMethod) {
      //   console.log(paymentMethod);
      setError(" ");
    }

    // confirm card payment
    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "anonymous",
          },
        },
      });
    if (intentError) {
      console.log(intentError);
      Swal.fire({
        icon: "error",
        text: `${intentError.message}`,
      });
    } else {
      if (paymentIntent.status === "succeeded") {
        setTransctionId(paymentIntent?.id);

        const paymentsInfo = {
          userEmail: user?.email,
          planName: planName,
          transctionId: paymentIntent?.id,
        };

        // store payments infon in database
        await axiosSecure.post("/payments", paymentsInfo).then((res) => {
          // console.log("payment infor store in database", res.data);

          if (res.data.acknowledged) {
            Swal.fire({
              icon: "success",
              title: `${user.displayName}`,
              text: "You payment is done",
            });
          }
        });

        await axiosSecure
          .patch(`/users/${user.email}`, { badge: planName })
          .then((res) => {
            console.log(res.data);
          });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* card number and cvc number */}
      <div className="p-4 border rounded-lg shadow-sm bg-white focus-within:border-blue-500 hover:border-blue-400 transition">
        {/* paymet card all element */}
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>
      <p className="text-red-500 text-xs">{error}</p>

      {/* pay button */}
      <div className="flex justify-end mt-2 md:mt-4">
        <button
          type="submit"
          className="px-4 py-2 transition scale-95 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={!stripe || !elements}
        >
          Pay
        </button>
      </div>
    </form>
  );
};

export default CheckOutForm;
