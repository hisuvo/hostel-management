import React from "react";
import { useParams } from "react-router-dom";

function CheckOut() {
  const { planName } = useParams();
  console.log("TODO: checkout page show this plan --->", planName);

  return <div>CheckOut</div>;
}

export default CheckOut;
