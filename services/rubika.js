const express = require("express");
const router = express.Router();

router.post("/webhook", async (req, res) => {

    console.log("===== RUBIKA UPDATE =====");
    console.log(JSON.stringify(req.body, null, 2));

    res.json({
        success: true
    });

});

module.exports = router;
