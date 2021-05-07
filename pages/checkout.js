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
        </>
    );
};