import stripe from '../../stripe';

export default async (req, res) => {
    const paymentIntent = await stripe.paymentIntents.create({
        payment_method_types: ['card'],
        amount: 1000,
        currency: 'usd',
        application_fee_amount: 123,
      }, {
        stripeAccount: req.query.acct,
    });
    console.log(paymentIntent);
    res.status(200).json({secret: paymentIntent.client_secret});
};