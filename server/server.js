require('dotenv').config();
const productRoutes = require('./routes/product');
const authRoutes = require('./routes/auth');
const express = require('express');
const sequelize = require('./db');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/pages')));
app.use('/styles', express.static(path.join(__dirname, '../client/styles')));
app.use('/js', express.static(path.join(__dirname, '../client/js')));

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

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
