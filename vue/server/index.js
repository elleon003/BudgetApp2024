const express = require('express');
const plaidRoutes = require('./routes/plaid');

const app = express();

app.use(express.json());
app.use('/api/plaid', plaidRoutes);

// Other middleware and routes...

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
