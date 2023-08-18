const express = require('express');
const router = new express.Router();
const ExpressError = require('../expressError');
const items = require('../fakeDb.js');

router.get('/', (req, res) => {
    res.json({items});
});

router.post('/', (req, res, next) => {
    try {
        if (!req.body.name) {
            throw new ExpressError('Name and Price required', 400);
        }
        const newItem = { name: req.body.name, price: req.body.price };
        items.push(newItem);
        return res.status(201).json({ added: newItem });
    } catch(e) {
        return next(e);
    }
});


module.exports = router;