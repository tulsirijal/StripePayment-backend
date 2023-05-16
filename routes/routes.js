const express = require("express");
const router = express.Router();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
router.post("/stripe-checkout", async (req, res) => {
  const cartItems = req.body.cartItems;
  console.log(cartItems);

  const session = await stripe.checkout.sessions.create({
    success_url: "http://localhost:5173/success",
    cancel_url: "http://localhost:5173/cancel",
    line_items: cartItems.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title,
          },
          unit_amount: item.price * 100,
        },
        quantity: 1,
      };
    }),
    mode: "payment",
  });
  res.json(session);
});

module.exports = router