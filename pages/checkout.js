import stripePromise from '../stripePromise';

export default function Checkout() {
    return (
        <>
            <div className="product">
                <img src="https://i.imgur.com/EHyR2nP.png" alt="The cover of Stubborn Attachments" />
                <div className="description">
                    <h3>Stubborn Attachments</h3>
                    <h5>$20.00</h5>
                </div>
            </div>
            <button
                onClick={async () => {
                    const stripe = await stripePromise;
                    const response = await fetch("/api/create-checkout-session", {
                        method: "POST",
                    });
                    const session = await response.json();
                    // When the customer clicks on the button, redirect them to Checkout.
                    const result = await stripe.redirectToCheckout({
                        sessionId: session.id,
                    });
                    if (result.error) {
                        // If `redirectToCheckout` fails due to a browser or network
                        // error, display the localized error message to your customer
                        // using `result.error.message`.
                        alert(result.error.message);
                    }
                }}
            >
                Checkout
            </button>
            <br />
            <h1>Subscriptions</h1>
            <button
                onClick={async () => {
                    const stripe = await stripePromise;
                    const response = await fetch("/api/create-checkout-session2", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            priceId: 'price_1IonmnCXeo1F5iZhl7Olj93v'
                        }),
                    });
                    const session = await response.json();
                    // When the customer clicks on the button, redirect them to Checkout.
                    const result = await stripe.redirectToCheckout({
                        sessionId: session.id,
                    });
                    if (result.error) {
                        // If `redirectToCheckout` fails due to a browser or network
                        // error, display the localized error message to your customer
                        // using `result.error.message`.
                        alert(result.error.message);
                    }
                }}
            >
                Premium
            </button>
            <button
                onClick={async () => {
                    const stripe = await stripePromise;
                    const response = await fetch("/api/create-checkout-session2", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            priceId: 'price_1IonnHCXeo1F5iZhQzw3qtHb'
                        }),
                    });
                    const session = await response.json();
                    // When the customer clicks on the button, redirect them to Checkout.
                    const result = await stripe.redirectToCheckout({
                        sessionId: session.id,
                    });
                    if (result.error) {
                        // If `redirectToCheckout` fails due to a browser or network
                        // error, display the localized error message to your customer
                        // using `result.error.message`.
                        alert(result.error.message);
                    }
                }}
            >
                Basic
            </button>
        </>
    );
};