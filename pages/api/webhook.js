import { buffer } from 'micro';

import stripe from '../../stripe';

const endpointSecret = 'whsec_FuHEXD4lQqL7WOfbn6Gne3V19kTJ7fxv';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async (req, res) => {
    const payload = await buffer(req);
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
    
        // Fulfill the purchase...
        console.log(session);
    }

    res.status(200).end();
};