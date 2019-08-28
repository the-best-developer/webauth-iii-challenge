const express = require('express');
const router = express.Router();

router.get('/register', async (req, res) => {
    res.send("Route up")
});

module.exports = router;