import React from "react";
import CheckoutStripe from "react-stripe-checkout";
import { API } from "../api/backendRequests";
import { packPurchase } from "../actions/packs";
import { useDispatch } from "react-redux";

function SubscriptionPack({ pack, user, activePack }) {
  const dispatch = useDispatch();

  const makePayment = (token) => {
    const body = {
      token,
      pack,
    };
    return API.post("/api/payment", body)
      .then((response) => {
        const paymentResult = {
          id: response.data.id,
          amount: response.data.amount / 100,
          status: response.data.status,
          email: response.data.receipt_email,
        };

        if (paymentResult.status === "succeeded") {
          dispatch(packPurchase(user?.result?.id, pack._id, paymentResult));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      className={
        activePack === pack._id
          ? "subscription__pack subscription__pack__active"
          : "subscription__pack"
      }
    >
      <h3 className="pack__name">CineTrailer {pack.title}</h3>

      <ul>
        <li>{pack.descriptions}</li>
      </ul>
      <p className="pack__price">
        <span>₹{pack.price}</span>/Month
      </p>
      {activePack === pack._id ? (
        <button className="packActiveted__button">Activated</button>
      ) : (
        <CheckoutStripe
          stripeKey={process.env.REACT_APP_STRIPE_KEY}
          token={makePayment}
          amount={pack?.price * 100}
          name="CineTrailer"
          email={user?.result?.email}
          currency="INR"
        >
          <button className="packActive__button">Active Now</button>
        </CheckoutStripe>
      )}
    </div>
  );
}

export default SubscriptionPack;
