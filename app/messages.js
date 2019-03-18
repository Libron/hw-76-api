const express = require('express');
const nanoid = require('nanoid');
const db = require('../dbController');
const router = express.Router();

router.get('/', (req, res) => {
    const messages = db.getItems();

    if (req.query.datetime) {
        const date = new Date(req.query.datetime);
        if (isNaN(date.getDate())) {
            res.status(400).send({"error": "Wrong datetime provided"});
        } else {
            res.send(messages.filter(msg => msg.datetime > req.query.datetime));
        }
    } else {
        res.send(messages);
    }
});

router.post('/', (req, res) => {
    const data = {...req.body};
    if (data.message && data.author) {
        data.datetime = new Date().toISOString();
        data.id = nanoid(10);
        db.addItem(data);
        res.status(201).send(data);
    } else {
        res.status(400).send({"error": "Author and message must be present in the request"})
    }
});

module.exports = router;