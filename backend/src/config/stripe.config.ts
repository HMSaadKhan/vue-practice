export default () => ({
    stripe: {
        STRIPE_API_KEY: process.env.STRIPE_API_KEY,
        STRIPE_CURRENCY: process.env.STRIPE_CURRENCY|| 'eur'
    },
  });