const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./db');
const superAdminRoutes = require('./routes/superAdminRoutes');
const organizationRoutes = require('./routes/organizationRoutes');
const authRoutes = require('./routes/authRoutes');
const featureRoutes = require('./routes/featureRoutes');

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.use('/api/features', featureRoutes);

app.use('/api/super-admin', superAdminRoutes);

app.use('/api/organizations', organizationRoutes);

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});