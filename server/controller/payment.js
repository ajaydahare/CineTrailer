import uuid from "uuid";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.STRIPE_SECRET;

const stripe = new Stripe(secret);

// stripe checkout
export const makePayment = (req, res) => {
  const { token, pack } = req.body;
  const idempotencyKey = uuid();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges
        .create(
          {
            amount: pack.price * 100,
            currency: "INR",
            customer: customer.id,
            description: "cineTrailer",
            receipt_email: token.email,
            shipping: {
              name: token.card.name,
              address: {
                line1: token.card.address_line1,
                line2: token.card.address_line2,
                city: token.card.address_city,
                country: token.card.address_country,
                postal_code: token.card.address_zip,
              },
            },
          },
          { idempotencyKey }
        )
        .then((result) => res.status(200).json(result))
        .catch((error) => console.log(error));
    });
};
