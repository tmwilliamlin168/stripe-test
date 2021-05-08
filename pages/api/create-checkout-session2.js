// For subscriptions

import stripe from '../../stripe';

export default async (req, res) => {
    const { priceId } = req.body;
    const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
            {
                price: priceId,
                quantity: 1,
            },
        ],
        success_url: 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: 'http://localhost:3000/cancel',
    });

    res.json({ id: session.id });
};