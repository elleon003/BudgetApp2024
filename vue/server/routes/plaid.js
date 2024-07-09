const express = require('express');
const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');

const router = express.Router();

const configuration = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
    },
  },
});

const plaidClient = new PlaidApi(configuration);

router.post('/exchange-token', async (req, res) => {
  try {
    const exchangeResponse = await plaidClient.itemPublicTokenExchange({
      public_token: req.body.public_token,
    });

    const accessToken = exchangeResponse.data.access_token;
    const itemId = exchangeResponse.data.item_id;

    res.json({ access_token: accessToken, item_id: itemId });
  } catch (error) {
    console.error('Error exchanging token:', error);
    res.status(500).json({ error: 'Failed to exchange token' });
  }
});

module.exports = router;
