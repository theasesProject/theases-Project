const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = {
  create: async (req, res) => {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
      });
      res.status(201).json({ paymentIntent: paymentIntent.client_secret });
    } catch (err) {
      // res.status(500).json(err);
      throw err;
    }
  },
};
