const express = require('express');
const app = express();
const itemsRoutes = require('./routes/items');
const ExpressError = require('./expressError');

app.use(express.json());
app.use('/items', itemsRoutes);

// 404 handler
app.use((req, res, next) => {
    return new ExpressError('Not Found', 404);
});

// General error handler
app.use((error, req, res, next) => {
    let status = error.status || 500;
    let message = error.message;
    return res.status(status).json({
        error: { message, status}
    });
});


module.exports = app;