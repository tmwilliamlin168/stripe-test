import Head from 'next/head';

export default function Checkout() {
    return (
        <>
            <Head>
                <script src="https://js.stripe.com/v3/"></script>
            </Head>
            <div className="product">
                <img src="https://i.imgur.com/EHyR2nP.png" alt="The cover of Stubborn Attachments" />
                <div className="description">
                    <h3>Stubborn Attachments</h3>
                    <h5>$20.00</h5>
                </div>
            </div>
            <button
                onClick={() => {
                    const stripe = Stripe("pk_test_51IoUnVCXeo1F5iZheFRAOMs2wrkrGtSdpI6yHSarTrwt5U7SiLU6Cyx84d1ySnaw9ui1tRdQFPckXeag3y0U3E3Y00YcDgHm1p");
                    fetch("/api/create-checkout-session", {
                        method: "POST",
                    }).then(res => {
                        return res.json();
                    }).then(session => {
                        return stripe.redirectToCheckout({ sessionId: session.id });
                    }).then(res => {
                        // If redirectToCheckout fails due to a browser or network
                        // error, you should display the localized error message to your
                        // customer using error.message.
                        if (res.error)
                            alert(res.error.message);
                    }).catch(function (error) {
                        console.error("Error:", error);
                    });
                }}
            >
                Checkout
            </button>
        </>
    );
};