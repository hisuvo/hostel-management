import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../../shared/CheckOutForm/CheckOutForm";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GETWAY_PK);
const PaymentCard = ({ price, planName }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckOutForm price={price} planName={planName} />
    </Elements>
  );
};

export default PaymentCard;
