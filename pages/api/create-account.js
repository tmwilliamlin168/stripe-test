import stripe from '../../stripe';

export default async (req, res) => {
    const account = await stripe.accounts.create({
        type: 'standard',
    });
    const accountLinks = await stripe.accountLinks.create({
        account: account.id,
        refresh_url: 'http://localhost:3000/reauth',
        return_url: 'http://localhost:3000/success',
        type: 'account_onboarding',
    });
    console.log(account.id);
    res.status(200).json({url: accountLinks.url});
};