require('dotenv').config();
const productRoutes = require('./routes/product');
const authRoutes = require('./routes/auth');
const express = require('express');
const sequelize = require('./db');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use(express.static(path.join(__dirname, '../client')));

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
    } catch (e) {
        console.error(e);
    }
};

start();
