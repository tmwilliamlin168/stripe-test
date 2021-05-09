import {CardElement, Elements, useElements, useStripe} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {useEffect, useState} from 'react';

const stripePromise = loadStripe("pk_test_51IoUnVCXeo1F5iZheFRAOMs2wrkrGtSdpI6yHSarTrwt5U7SiLU6Cyx84d1ySnaw9ui1tRdQFPckXeag3y0U3E3Y00YcDgHm1p", {
    stripeAccount: 'acct_1Ip4MLFhTzDNCPuP'
});

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            color: "#32325d",
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
                color: "#aab7c4",
            },
        },
        invalid: {
            color: "#fa755a",
            iconColor: "#fa755a",
        },
    },
};

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const [secret, setSecret] = useState();

    useEffect(() => {
        (async () => {
            setSecret((await (await fetch('/api/create-payment-intent?acct=acct_1Ip4MLFhTzDNCPuP')).json()).secret);
        })();
    }, []);

    const handleSubmit = async (event) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();
    
        if (!stripe || !elements || !secret) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }
    
        const result = await stripe.confirmCardPayment(secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: 'Jenny Rosen',
                },
            }
        });
    
        if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
            alert(result.error.message);
        } else {
            // The payment has been processed!
            if (result.paymentIntent.status === 'succeeded') {
                // Show a success message to your customer
                // There's a risk of the customer closing the window before callback
                // execution. Set up a webhook or plugin to listen for the
                // payment_intent.succeeded event that handles any business critical
                // post-payment actions.
                alert('succeeded');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Card details
                <CardElement options={CARD_ELEMENT_OPTIONS} />
            </label>
            <button disabled={!stripe}>Confirm order</button>
        </form>
    );
};

export default function Checkout() {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
};